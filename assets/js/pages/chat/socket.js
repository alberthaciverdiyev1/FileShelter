document.addEventListener('DOMContentLoaded', function (e) {
  const socket = io();
  const receiverId = document.getElementById('user').getAttribute('user-id');


  document.getElementById('send').addEventListener('click', (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    if (receiverId && message) {
      console.log({ receiverId, message });
      socket.emit('chat message', { receiverId, message });
      document.getElementById('message').value = '';
    }
  });

  socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = `${msg.receiverId}: ${msg.message}`;
    document.getElementById('messages').appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

  fetch(`/messages/${receiverId}`)
    .then(response => response.json())
    .then(messages => {
      const messagesList = document.getElementById('messages');
      messages.forEach(msg => {
        const item = document.createElement('li');
        item.textContent = `${msg.username}: ${msg.message}`;
        messagesList.appendChild(item);
      });
    });


    const toggleButton = document.querySelector('.dark-light');
const colors = document.querySelectorAll('.color');

colors.forEach(color => {
  color.addEventListener('click', (e) => {
    colors.forEach(c => c.classList.remove('selected'));
    const theme = color.getAttribute('data-color');
    document.body.setAttribute('data-theme', theme);
    color.classList.add('selected');
  });
});

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

});

