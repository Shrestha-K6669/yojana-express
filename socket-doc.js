const express=require("express")
const app=express()

//socket 
const server=require("http").createServer(app)
const io=require("socket.io")(server,{
    cors:{
        origin:"*"
    }
})

const socketRouter=require("/router/socketRouter")(io);

/*
note react-toastify for notification::alert success, failured

Socket Router
*/
//const express=require("express")
function SocketRouter(io){
    const router=express.router()
    router.get("/forecast",(req,res)=>{

    })
}