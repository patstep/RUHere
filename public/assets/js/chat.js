// socket.io front-end connection
const socket  =  io.connect('http://localhost:8080');

// query dom
const   message = document.getElementById('message'),
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

// emit the event 
btn.addEventListener('click', () => {
	socket.emit('chat', {
		message: message.value,
		handle: handle.value,
	});
});

message.addEventListener('keypress', () =>{
	socket.emit('typing', handle.value);
})
// listen for events
socket.on('chat', (data) => {
	feedback.innerHTML = '';
	output.innerHTML += `<p><strong>${data.handle} : </strong> ${data.message} </p>`;
});

socket.on('typing', (data) =>{
	feedback.innerHTML = `<p><em>${data} is typing a message . . .</em></p>`;
});