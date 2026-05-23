const {initModels}=require('../models/init-models')
const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const { init } = require('express/lib/application')

const housemember=initModels(sequelize).housemember
const project_bittiy=initModels(sequelize).project_bittiy
const project_docs =initModels(sequelize).budget_project
const project_schedule=initModels(sequelize).project_schedule
const tolebikas=initModels(sequelize).tolebikas
const tolehouse=initModels(sequelize).tolehouse
var fs = require('fs');
const uuid=require('./uuidcode')
const u= require('uuid')


const read_tb=require('xlsx')
const path=require('path')
/*
co_ordinate:{x:co_ord_x, y:co_ord_y} 
*/
exports.readTB=(req,res)=>{
  const pathName1=path.resolve(`${_baseDir}/public/excel/tolebikas.xlsx`)
  const file = read_tb.readFile(pathName1)
  const temp = read_tb.utils.sheet_to_json(
    file.Sheets[file.SheetNames[0]])
    temp.forEach(el => {
     const {_id,name,ward_num,tole,boundary_east, boundary_west, boundary_north, boundary_south,
        office_address, account_num, pan_num, reg_num}=el
      tolebikas.create({
        _id, name,ward_num,tole,boundary_east, boundary_west, boundary_north, boundary_south,
        office_address,co_ordinate:{x:el.co_ord_x, y:el.co_ord_y} ,account_num, pan_num, reg_num})
          });
          res.redirect('/tolebikas')
    //tolebikas.bulkCreate(temp).then(s=>{
      //res.send(s)
    //})
    //console.log(temp)
    
}

//file finder helper function

function checkFile(req){
    if(typeof req.files!=='undefined'){
        return req.files;
    }
}
//route to yojana index


exports.getYpage=(req,res)=>{
  res.render('yojana/y_index')
}

exports.getTBForm=(req,res)=>{
  res.render('yojana/add/tolebikas_form')
}
/*
 anugaman_samiti, budget_karykram, budget_project,
   housemember,  project_bittiy,   project_docs, project_schedule,   
tbproj, tolebikas,  tolebikasmember,tolehouse,  user,
*/
/*  client_docs,  response, officials,  server_office, client_info, client_query, tax_heading, email, query_status, */

exports.addToleBikas=(req,res)=>{
  const {
name,ward_num,tole,boundary_east, boundary_west, boundary_north, boundary_south,
office_address, co_ord_x, co_ord_y, account_num, pan_num, reg_num
  } =req.body 
  const pic= checkFile(req)
  //console.log(req.body)
  let profilepic=null
  if(pic.profilepic!==undefined){
    profilepic=pic.profilepic[0].filename
  }
tolebikas.create({_id:uuid(u.v4()),
    name,ward_num,tole,boundary_east, boundary_west, boundary_north, boundary_south,
    office_address, co_ordinate:{x:co_ord_x, y:co_ord_y} , account_num, pan_num, reg_num,profilepic 
}).then(s=>{
    res.redirect('/y')
}).catch(err=>{
    console.log(err)
})

}



exports.getPageTB=(req,res)=>{
  const page=1
 // console.log("Page is"+req.body.page)
   const offset=20*(page-1)
   sequelize.query(`
  select * from tolebikas limit 20 offset ${offset}
  `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
      //console.log(s)
       res.render('yojana/list/tolebikasList',{
          data:s,
           })
  }).catch(e=>{
      console.log(e)
  })
  
}

exports.postPageTB=(req,res)=>{
  const page=req.body.page
 // console.log("Page is"+req.body.page)
   const offset=20*(page-1)
   sequelize.query(`
  select * from tolebikas limit 20 offset ${offset}
  `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
      //console.log(s)
       res.render('yojana/list/tolebikasList',{
          data:s,
           })
  }).catch(e=>{
      console.log(e)
  })
  
}
//get tolebikas form
exports.getTBEditForm=(req,res)=>{
  const _id=req.params.id
  sequelize.query(`select * from tolebikas where _id=:id`,{
      replacements:{id:_id},type:Sequelize.QueryTypes.SELECT
  }).then(r=>{
     // console.log(r)
      res.render('yojana/update/tolebikas_form',{
          data:r[0],
          })
  }).catch(err=>{
      console.log("found no records")
  })
    
  }

//edit tolebikas record

exports.editTolebikas=(req,res)=>{
  const _id=req.body.id
  const {
    name,ward_num,tole,boundary_east, boundary_west, boundary_north, boundary_south,
    office_address, co_ord_x, co_ord_y, account_num, pan_num, reg_num
      } =req.body 
tolebikas.update({
  name,ward_num,tole,boundary_east, boundary_west, boundary_north, boundary_south,
  office_address, co_ordinate:{x:co_ord_x, y:co_ord_y} , account_num, pan_num, reg_num
},{
  where:{_id}
}).then(s=>{
console.log(s)
res.redirect('/tolebikas')
}).catch(err=>{
  console.log("error while updating lavgrahi record..")
})
}

//delete Lavgrahi info

exports.deleteTB= async(req,res)=>{
  const _id=req.body.id
 await tolebikas.findAll({attributes:['profilepic'],where:{_id}}).then(rs=>{
          if(rs.length>0){
              const pathName=path.resolve(`${_baseDir}/public/uploadY/${rs[0].profilepic}`)
             if(fs.existsSync(pathName)){
                  fs.unlink(pathName,function (err) {
                      if (err) throw err;
                      // if no error, file has been deleted successfully
                      console.log('pdf File deleted successfully !');
                  }) }
                 tolebikas.destroy({where:{_id}}).then(async s=>{
                 res.redirect('/tolebikas')          
              }).catch(er=>{console.log(er)})
          } else{
              res.send("no such records found.")
          }
      }).catch(er=>{
          res.send("error."+er)
      })
}
