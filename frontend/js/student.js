// const socket = io("http://localhost:3000");

// socket.on("tokenUpdate",(token)=>{

// alert("Token " + token + " is now being served");

// });
// function loadQueue(){

// fetch("http://localhost:3000/api/token/queue")

// .then(res => res.json())

// .then(data => {

// document.getElementById("queue").innerHTML =
// "People in Queue: " + data.queue.length;

// })

// }

// setInterval(loadQueue,2000);

function generateToken(){

let service = document.getElementById("service").value

if(service === ""){
alert("Please select a service")
return
}

let tokens = JSON.parse(localStorage.getItem(service)) || []

let tokenNumber = tokens.length + 1

tokens.push(tokenNumber)

localStorage.setItem(service, JSON.stringify(tokens))

document.getElementById("tokenResult").innerHTML =
"Your Token for " + service + " is: <b>" + tokenNumber + "</b>"
}

async function bookToken(service){

const res = await fetch("/api/queue/generate-token",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
service:service
})

});

const data = await res.json();

document.getElementById("tokenResult").innerText =
"Your Token for " + data.service + " is " + data.token;

}