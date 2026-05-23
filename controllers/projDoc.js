const {initModels}=require('../models/init-models')
const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const { init } = require('express/lib/application')
const PROJECT_DOCS=initModels(sequelize).project_docs
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

exports.projDocForm=(req,res)=>{
    const project_id=req.params.id 
    res.render('yojana/add/projectDocument',{
        project_id
    })
}

exports.addProjDocs=(req,res)=>{
    const d= checkFile(req)
    const { documentname, project_id }=req.body
  //console.log(req.body)
  let doc=null
  if(d.doc!==undefined){
    doc=d.doc[0].filename
    doc.replaceAll("\"","");
    doc.trim()
  }
  
 PROJECT_DOCS.create({
    _id: uuid(u.v4()), project_id, documentname, doc
 }).then(s=>{
    res.redirect(`/projectDocs/${project_id}`)  
 })
}

exports.getProjectDocs=(req,res)=>{
const project_id=req.params.id
sequelize.query(` select * from project_docs where project_id="${project_id}" `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
    res.render('yojana/list/projDocs',{
        documents:s,
        project_id
    })
})    
}


exports.deleteProjDocs= async(req,res)=>{
    const _id=req.params.id
   await PROJECT_DOCS.findAll({where:{_id}}).then(rs=>{
            if(rs.length>0){
              const pathName1=path.resolve(`${_baseDir}/public/ProjectDocs/${rs[0].doc}`)
               if(fs.existsSync(pathName1)){
                  fs.unlink(pathName1,function (err) {
                      if (err) throw err;
                      // if no error, file has been deleted successfully
                      console.log('pdf File deleted successfully !');
                  }) }

                  PROJECT_DOCS.destroy({where:{_id}}).then(async s=>{
                    //console.log(s)
                   res.redirect(`/projectDocs/${rs[0].project_id}`)          
                }).catch(er=>{console.log(er)})
            } else{
                res.send("no such records found.")
            }
        }).catch(er=>{
            res.send("error."+er)
        })
  }
  

