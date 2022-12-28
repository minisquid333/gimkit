const sockets = [];
var nativeWebSocket = window.WebSocket;
var lastDataSent = null;
var using = null;

window.WebSocket = function(...args) {
	const socket = new nativeWebSocket(...args);
	const nativeSend = socket.send;
	socket.send = function(data) {
		nativeSend.call(this, data);
		if (data != 2) {
			lastDataSent = data;
		}
	};
	sockets.push(socket);
	return socket;
};
document.onkeydown = (e)=>{
	if (e.key == ";") {
		using = lastDataSent;
		alert("Saved");
	} else if (e.key == "u") {
		sockets[0].send(using);
	};
};
window.onerror = (err)=>{
	alert(err);
};
