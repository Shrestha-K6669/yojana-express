const express=require('express')
const path=require('path')
require('dotenv').config({ path: path.join(__dirname, '.env'), override:true })
const app=express()
const bodyParser=require('body-parser')
const sq=require('./db/db_mx')
const cookieParser=require('cookie-parser')
const { optionalAuth }=require('./middleware/auth')
const { initModels }=require('./models/init-models')

//var ejs=require('ejs')
//const expressLayouts=require('express-ejs-layouts')
// view engine
//app.use(expressLayouts)

//app.use('/css', express.static(__dirname+'public/css'))
//use body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())



/*
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  
    
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    
    next();
  }); 
  */
  
  app.set('view engine','ejs')
  app.set('views',path.join(__dirname,'views'))
  
  app.use(express.static(path.join(__dirname,'public')))
  app.use('/files', express.static('F:\\'))
  app.use(optionalAuth)


global._baseDir=__dirname

initModels(sq).y_login.sync({ alter:true }).then(()=>{
  console.log('authentication table is ready')
}).catch(err=>{
  console.log('authentication table setup failed', err)
})


const lawRoute=require('./routes/lawRoute')
const adminRoute=require('./routes/adminRoute')
const yRoute=require('./routes/yRoute')
const reportRoute=require('./routes/reportRoute')
app.use(lawRoute) 
app.use(adminRoute)
app.use(yRoute)
app.use(reportRoute)



//app.use(profileRoute)

app.listen(3000,()=>{
    console.log('Mixed server development version back end server is running on port :: 3000')
})
