// // NEXT TOKEN

// function nextToken(){

// fetch("http://localhost:3000/api/token/next",{
//     method:"POST"
// })

// .then(res => res.json())

// .then(data => {

// document.getElementById("currentToken").innerHTML =
// "Current Token: " + data.currentToken;

// })

// }



// // SHOW QUEUE LENGTH

// function loadQueue(){

// fetch("http://localhost:3000/api/token/queue")

// .then(res => res.json())

// .then(data => {

// document.getElementById("queueLength").innerHTML =
// "Queue Length: " + data.queue.length;

// })

// }

// setInterval(loadQueue,2000);



// // PAUSE QUEUE

// let paused = false;

// function pauseQueue(){

// paused = true;

// alert("Queue Paused");

// }



// // RESUME QUEUE

// function resumeQueue(){

// paused = false;

// alert("Queue Resumed");

// }



// // CHECK ACCOUNTS OFFICE TIME

// function checkOfficeTime(){

// let now = new Date();

// let hour = now.getHours();

// let minute = now.getMinutes();


// // LUNCH BREAK

// if((hour === 12 && minute >= 50) || (hour === 13 && minute < 30)){

// alert("Accounts Office Lunch Break (12:50 - 1:30)");

// }


// // OFFICE CLOSED

// if(hour > 16 || (hour === 16 && minute >= 30)){

// alert("Accounts Office Closed for Today");

// }

// }

// checkOfficeTime();

const socket = io("http://localhost:3000");

async function loadQueue(){

const res = await fetch("/api/queue/status");

const data = await res.json();

document.getElementById("queueLength").innerText =
"Queue Length: " + data.length;

if(data.length > 0){

document.getElementById("currentToken").innerText =
"Current Token: " + data[0].tokenNumber;

}

}

async function nextToken(){

const res = await fetch("/api/queue/next",{

method:"POST"

});

const data = await res.json();

alert("Calling Token " + data.tokenNumber);

loadQueue();

}

async function pauseQueue(){

await fetch("/api/queue/pause",{
method:"POST"
});

alert("Queue Paused");

}

async function resumeQueue(){

await fetch("/api/queue/resume",{
method:"POST"
});

alert("Queue Resumed");

}

socket.on("queueUpdate",loadQueue);

loadQueue();