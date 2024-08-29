$(document).ready(() => {
  // Middleware to check username
  if (localStorage.getItem("user_name")) {
    if (window.location.pathname != "/index.html") {
      window.location = "/index.html";
    }
  } else {
    if (window.location.pathname == "/index.html") {
      window.location = "/login.html";
    }
  }

  // Submit form
  $("#login_form").submit((e) => {
    e.preventDefault();
    localStorage.setItem("user_name", $("#username").val());
    window.location = "/index.html";
  });

  $("#logout_button").click(function () {
    localStorage.removeItem("user_name");
    window.location = "/login.html";
  });
});

// const socket = new WebSocket("ws://localhost:8080");

// // Socket connected
// socket.onopen = () => {
//   console.log("Client connected to the socket");
// };

// // Set user name
// const username_input = document.getElementById("username_input");
// const username_button = document.getElementById("username_button");
// username_button.addEventListener("click", () => {
//   localStorage.setItem("user_name", username_input.value);
// });

// const message_input = document.getElementById("message_input");
// const send_message = document.getElementById("send_message");
// // Send to the socket
// const sendMessage = () => {
//   socket.send(
//     JSON.stringify({
//       username: localStorage.getItem("user_name"),
//       message: message_input.value,
//     })
//   );
//   message_input.value = "";
// };

// send_message.addEventListener("click", () => sendMessage());

// // Receive the message
// const messages = document.getElementById("messages");

// socket.addEventListener("message", (e) => {
//   const messageBox = document.createElement("div");
//   const message_content = document.createElement("h5");
//   const message_user = document.createElement("span");

//   messageBox.appendChild(message_user);
//   messageBox.appendChild(message_content);

//   const reader = new FileReader();

//   reader.onload = () => {
//     var message = JSON.parse(reader.result);
//     message_content.innerText = message.message;
//     message_user.innerText = message.username;
//     messages.appendChild(messageBox);
//     console.log(message);
//   };
//   reader.readAsText(e.data);
// });
