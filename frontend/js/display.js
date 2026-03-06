const socket = io("http://localhost:3000");

socket.on("tokenUpdate",(token)=>{

document.getElementById("displayToken").innerHTML =
"Token " + token;

});