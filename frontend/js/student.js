const socket = io("http://localhost:3000");

socket.on("tokenUpdate",(token)=>{

alert("Token " + token + " is now being served");

});
function loadQueue(){

fetch("http://localhost:3000/api/token/queue")

.then(res => res.json())

.then(data => {

document.getElementById("queue").innerHTML =
"People in Queue: " + data.queue.length;

})

}

setInterval(loadQueue,2000);