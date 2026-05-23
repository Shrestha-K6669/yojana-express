
var path=require('path')
require('dotenv').config({ path:path.join(__dirname,'..','.env'), override:true })
var Sequelize=require('sequelize')

var sequelize=new Sequelize(
    process.env.DB_NAME || 'revenue',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD,
{
    host:'localhost',
    dialect:'mysql',
    port:3306,
    define:{
        timestamps:false
    }
});

sequelize.authenticate().then(()=>{
    console.log("database server has been established")
}).catch( err=>{
    console.log(err)
})

/* uncomment to create table with model
sequelize.sync().then(() => {
   console.log('Book table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});
*/

module.exports=sequelize

