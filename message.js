$(document).ready(() => {
  // Check if there's messages in localstorage and show it on the screen
  if (localStorage.getItem("messages")) {
    // Get messages from localstorage and parse it to js array
    const databaseMessages = JSON.parse(localStorage.getItem("messages"));

    // loop the messages and check the side then show it on the screen
    databaseMessages.forEach((e) => {
      if (localStorage.getItem("user_name") == e.username) {
        $("#chat_box").append(`
          <div id="sender_col" class="col-12 mt-2">
              <div
                style="height: auto; width: 50%"
                class="bg-primary rounded p-3 text-white"
              >
                <h6>${e.username}</h6>
                <p>
                  ${e.message}
                </p>
                <h6 class="text-end">${e.time}</h6>
              </div>
            </div>
          `);
      } else {
        $("#chat_box").append(`
          <div id="receiver_col" class="d-flex col-12 justify-content-end mt-2">
              <div
                style="height: auto; width: 50%"
                class="bg-secondary rounded p-3 text-white"
              >
                <h6>${e.username}</h6>
                <p>
                  ${e.message}
                </p>
                <h6 class="text-end">${e.time}</h6>
              </div>
            </div>
          `);
      }
    });
  }
  // Append username to the screen
  $("#user_message_name").append(
    `<h2>Welcome <span class="text-primary">${localStorage.getItem(
      "user_name"
    )}</span></h2>`
  );

  // Connect to socket
  const socket = new WebSocket("ws://localhost:8080");

  // Socket connected
  socket.onopen = () => {
    console.log("Client connected to the socket");
  };

  // Send message to the server
  $("#message_form").submit((e) => {
    e.preventDefault();
    socket.send(
      JSON.stringify({
        username: localStorage.getItem("user_name"),
        message: $("#message_input").val(),
      })
    );
    $("#message_input").val("");
    $("#message_input").focus();
  });

  // Message event
  socket.addEventListener("message", (e) => {
    // Get Current Time
    const dateTimeString = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "medium",
      hour12: true,
    });
    const reader = new FileReader();
    reader.onload = () => {
      let message = JSON.parse(reader.result);
      message.time = dateTimeString;

      // Put messages in localstorage
      if (localStorage.getItem("messages")) {
        const localMessages = JSON.parse(localStorage.getItem("messages"));
        localMessages.push(message);
        localStorage.setItem("messages", JSON.stringify(localMessages));
      } else {
        const messages = [];
        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
      }

      // Check the message side
      if (localStorage.getItem("user_name") == message.username) {
        $("#chat_box").append(`
          <div id="sender_col" class="col-12 mt-2">
              <div
                style="height: auto; width: 50%"
                class="bg-primary rounded p-3 text-white"
              >
                <h6>${message.username}</h6>
                <p>
                  ${message.message}
                </p>
                <h6 class="text-end">${message.time}</h6>
              </div>
            </div>
          `);
      } else {
        $("#chat_box").append(`
          <div id="receiver_col" class="d-flex col-12 justify-content-end mt-2">
              <div
                style="height: auto; width: 50%"
                class="bg-secondary rounded p-3 text-white"
              >
                <h6>${message.username}</h6>
                <p>
                  ${message.message}
                </p>
                <h6 class="text-end">${message.time}</h6>
              </div>
            </div>
          `);
      }
    };
    reader.readAsText(e.data);
  });
});
