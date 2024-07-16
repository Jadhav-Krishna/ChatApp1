const btn = document.getElementById("btn");
const input = document.getElementById("input");
const messages = document.getElementById("message");
const form = document.getElementById("message-form");

// const socket = io();

function addMessage(content, isSentByMe = false) {
    const messageElement = document.createElement("div");
    messageElement.className = isSentByMe ? "flex flex-col items-end justify-end" : "flex flex-col items-start relative";

    const nameElement = document.createElement("h6");
    nameElement.className = "ml-1 text-xs font-bold";
    nameElement.innerText = isSentByMe ? "Me" : content.name;
    messageElement.appendChild(nameElement);

    const bubbleElement = document.createElement("div");
    bubbleElement.className = isSentByMe 
        ? "message-bubble-sent p-2 px-3 rounded-tl-full rounded-br-full rounded-bl-full text-white max-w-xs" 
        : "message-bubble p-2 px-3 rounded-tr-full rounded-br-full rounded-bl-full text-white max-w-xs";
    bubbleElement.innerHTML = `<p>${content.message}</p>`;
    messageElement.appendChild(bubbleElement);

    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}

function addUserJoinedMessage(name) {
    const userJoinedElement = document.createElement("div");
    userJoinedElement.className = "w-full bg-gray-800 rounded-lg p-1 text-center font-semibold";
    userJoinedElement.innerHTML = `<h1>${name} joined the chat</h1>`;
    messages.appendChild(userJoinedElement);
}

function sendmsg(){
    if (input.value.trim()) {
        socket.emit("send", input.value.trim());
        addMessage({ message: input.value.trim() }, true);
        input.value = "";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendmsg();
});

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    sendmsg();
});

let name;
while (!name) {
    const inputName = prompt("Who are you?");
    if (inputName && inputName.trim().length > 0) {
        name = inputName.trim();
        socket.emit("new-user-join", name);
    } else {
        alert("Name is required to join the chat.");
    }
}

socket.on("user-joined", name => {
    addUserJoinedMessage(name);
});

socket.on("receive", data => {
    addMessage(data);
});

socket.on('name-error', message => {
    alert(message);
});
const onlineUser = document.querySelector("#onlineUser")
socket.on('update-user-count', count => {
    onlineUser.innerHTML = `<div class="h-2.5 w-2.5 animate-ping rounded-full bg-green-500"></div><div class="h-2 w-2 left-px absolute rounded-full bg-green-500"></div>${count} Online`;
});