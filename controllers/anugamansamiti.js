const {initModels}=require('../models/init-models')
const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const { init } = require('express/lib/application')
const anugaman_samiti=initModels(sequelize).anugaman_samiti
var fs = require('fs');
const uuid=require('./uuidcode')
const u= require('uuid')



//file finder helper function
var path =require('path')
function checkFile(req){
    if(typeof req.files!=='undefined'){
        return req.files;
    }
}
global.indexRec={
  
  }

exports.getTBECForm=async(req,res)=>{
  const tolebks_id=req.params.id
 const member=await sequelize.query(`select * from anugaman_samiti
  where tolebks_id="${tolebks_id}" `,{type:Sequelize.QueryTypes.SELECT})
  sequelize.query(`
  select * from tolebikas where _id= "${tolebks_id}"
  `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
    //console.log("getTB Member route test")
    console.log(s)
    res.render('yojana/add/anugaman_samiti',{
      data:s[0],
      members:member
    })
  }).catch(err=>{
    res.send("error occurred, Please redo your operation correctly...")
  })
  
}
/*
field info:
 name, designation, contact, email, ctz, tolebks_id

*/

exports.addanugaman_samiti=(req,res)=>{
  
  const {
tolebks_id, name, designation,ctz, email, contact
  }=req.body 
  
  anugaman_samiti.create({_id:uuid(u.v4()),
 tolebks_id, name, designation,ctz, email, contact 
}).then(s=>{
    res.redirect(`/addTBECmemberForm/${tolebks_id}`)
}).catch(err=>{
    console.log(err)
})

}

exports.getTBECM=async(req,res)=>{
  const tolebks_id=req.params.id
  const data=await sequelize.query(`
  select * from tolebikas where _id= "${tolebks_id}"
  `,{type:Sequelize.QueryTypes.SELECT})
   sequelize.query(`
  select * from anugaman_samiti where tolebks_id="${tolebks_id}"
  `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
      //console.log(s)
      console.log(data)
  res.render('yojana/list/tbec',{ members:s,data:data[0] })
  }).catch(e=>{
      console.log(e)
  })
}

exports.getTBECEditForm=(req,res)=>{
  const _id=req.params.id
  sequelize.query(`select * from anugaman_samiti where _id=:id`,{
     replacements:{id:_id},type:Sequelize.QueryTypes.SELECT
  }).then(r=>{
     // console.log(r)
      res.render('yojana/update/anugaman_samiti',{
          data:r[0],
          })
  }).catch(err=>{
      console.log("found no records")
  })
  }
exports.updateTBEC=(req,res)=>{
  const _id=req.body.id
  const tolebks_id=req.body.tolebks_id
  const {
    name, designation,address, ctz, email, contact
      }=req.body 
      anugaman_samiti.update({name, designation,address, ctz, email, contact},{
        where:{_id}
      }).then(s=>{
        res.redirect(`/tbec/${tolebks_id}`)
      }).catch(err=>{
        res.send("error occurred updating docs.")
      })
}


//delTBM
exports.deleteTBECM= async(req,res)=>{
  const _id=req.body.id
  const tolebks_id=req.body.tolebks_id
  anugaman_samiti.destroy({where:{_id}}).then(async s=>{
  res.redirect(`/tbec/${tolebks_id}`)          
}).catch(er=>{console.log(er)})
}
