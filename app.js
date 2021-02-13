const express=require('express');
const cors = require('cors');
const helmet = require("helmet");
const app=express();

app.use(cors());
app.use(helmet());

const request = require('request');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const navigator=require('navigator');


//Logger
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());
 
app.use((req,res,next)=>{
    res.header(
        "Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    
if(req.method==='OPTIONS'){
 res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')   
 return res.status(100).json({

 })
}
next();
})
//Routes

app.use('/',(req,res,next)=>{
    var r = require('ua-parser').parse(req.headers['user-agent']);
    var timeStamp=new Date(Date.now())
    request(`http://ip-api.com/json/${req.headers['x-forwarded-for']}`, { json: true }, (err, response, body) => {
  if (err) { return console.log(err); }
  res.status(200).json({
    responseHeaders:{...res.getHeaders()},  
    requestHeaders:{...req.headers},
    remoteAddress:req.connection.remoteAddress,
    extraheaders:req.cookies,
    locationResponse:{...body},
    deviceParams:{...r},
    IPAdress:req.headers['x-forwarded-for'],
    Country:body['country'],
    City:body['city'],
    State:body['regionName'],
    TimeZone:body['timezone'],
    timeStamp:timeStamp.getMonth()+"/"+timeStamp.getDay()+"/"+timeStamp.getFullYear()+":"+timeStamp.getHours()+":"+timeStamp.getMinutes()+":"+timeStamp.getSeconds(),
    cookies_enabled:navigator.cookieEnabled,
    networkType:window.navigator.language
    
})
});
     
   
    
    console.log({...req.headers,...res.getHeaders()})
    console.log("ip",req.connection.remoteAddress);
    console.log(req.headers['x-forwarded-for']);

   
})
//Error Handler

app.use((req,res,next)=>{
    const error=new Error("Oops! Someting went wrong");
    
    error.status=404
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        message:error.message 
    })
})
module.exports=app;