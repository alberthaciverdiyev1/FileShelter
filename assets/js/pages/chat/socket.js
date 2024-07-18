const socket = io();

document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const message = document.getElementById('message').value;
  if (username && message) {
    socket.emit('chat message', { username, message });
    document.getElementById('message').value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = `${msg.username}: ${msg.message}`;
  document.getElementById('messages').appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

fetch('/api/messages')
  .then(response => response.json())
  .then(messages => {
    const messagesList = document.getElementById('messages');
    messages.forEach(msg => {
      const item = document.createElement('li');
      item.textContent = `${msg.username}: ${msg.message}`;
      messagesList.appendChild(item);
    });
  });
