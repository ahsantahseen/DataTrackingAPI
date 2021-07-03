const http=require('http'); 
const app=require('./app')
const port=process.env.PORT || 3000;//The default PORT is 3000 or 
                                    //if you have your own you can set it in your env file

const server=http.createServer(app);

server.listen(port)