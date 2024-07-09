const btn = document.getElementById('btn');
const input = document.getElementById('input');
const messages = document.getElementById('message');

btn.addEventListener('click', (e) => {
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = ''; 
    }
});

let container = ``;
socket.on('chat message', (msg) => {
    container = `<div class="flex items-end justify-end">
        <div class="message-bubble-sent p-4 rounded-lg text-white max-w-xs">
            <p>${msg}</p>
        </div>
    </div>`;
    messages.innerHTML += container;
    // scroll karne me help karega 
    messages.scrollTop = messages.scrollHeight;
});