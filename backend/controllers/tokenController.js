const Token = require("../models/token");
const nodemailer = require("nodemailer");

let queues = {
  ATM:[],
  Dispensary:[],
  Accounts:[]
};

let currentServing = {
  ATM:null,
  Dispensary:null,
  Accounts:null
};

let paused = false;

const avgTime = {
  ATM:5,
  Dispensary:10,
  Accounts:5
};

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"yourgmail@gmail.com",
    pass:"your_app_password"
  }
});

exports.generateToken = async(req,res)=>{

const {service,email} = req.body;

if(!service){
return res.json({message:"Service required"});
}

let queue = queues[service];

let tokenNumber = queue.length + 1;

queue.push(tokenNumber);

const token = new Token({
tokenNumber,
service,
email
});

await token.save();

let wait = (queue.length-1) * avgTime[service];

if(email){

await transporter.sendMail({
to:email,
subject:"Token Generated",
text:`Your token for ${service} is ${tokenNumber}. Estimated wait ${wait} minutes`
});

}

req.io.emit("queueUpdate",{queues,currentServing});

res.json({
token:tokenNumber,
service,
estimatedWait:wait
});

};

exports.nextToken = async(req,res)=>{

if(paused){
return res.json({message:"Queue paused"});
}

const {service} = req.body;

let queue = queues[service];

if(queue.length===0){
return res.json({message:"No tokens"});
}

let token = queue.shift();

currentServing[service]=token;

req.io.emit("queueUpdate",{queues,currentServing});

if(queue.length===3){

let nextToken = queue[2];

let user = await Token.findOne({tokenNumber:nextToken,service});

if(user && user.email){

await transporter.sendMail({
to:user.email,
subject:"Your turn is near",
text:`Token ${user.tokenNumber} only 3 people left`
});

}

}

res.json({currentToken:token});

};

exports.queueStatus=(req,res)=>{

res.json({
atm:queues.ATM,
dispensary:queues.Dispensary,
accounts:queues.Accounts
});

};

exports.pauseQueue=(req,res)=>{
paused=true;
res.json({message:"Queue paused"});
};

exports.resumeQueue=(req,res)=>{
paused=false;
res.json({message:"Queue resumed"});
};