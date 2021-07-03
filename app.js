//Importing Node Packages for the API
const express=require('express');
const cors = require('cors');
const helmet = require("helmet");
const request = require('request');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const {v4:uuidv4}=require('uuid')

//Initial Startup
const app=express();

app.use(cors());
app.use(helmet());

//Logger
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended:false
}));

//CORS HANDLER
app.use((req,res,next)=>{
    res.header(
        "Access-Control-Allow-Origin","*")//You can set your own links, 
        //i just set it to * so that it accepts all just for testing
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
    var device_id=uuidv4(); //The device id will be generated in this variable

    request(`http://ip-api.com/json/${req.headers['x-forwarded-for']}`, { json: true }, (err, response, body) => {
  if (err) { return console.log(err); }
  res.status(200).json({
    Device_Id:device_id,
    Device_Brand:r.family,
    Device_Name:r.device.family,
    Device_OS:r.os.family,
    Device_OS_Version:r.os.major,
    Device_connectionType:req.query.ct,
    Device_Language:req.headers['accept-language'],
    IPAdress:req.headers['x-forwarded-for'],
    Country:body['country'],
    City:body['city'],
    State:body['regionName'],
    TimeZone:body['timezone'],
    timeStamp:timeStamp.getMonth()+"/"+timeStamp.getDay()+"/"+timeStamp.getFullYear()+":"+timeStamp.getHours()+":"+timeStamp.getMinutes()+":"+timeStamp.getSeconds(),  
    cookiesEnabled:req.query.ck,
    siteDomain:req.headers.origin,
    userAgent_Header:r.userAgent

    
})
});

   
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