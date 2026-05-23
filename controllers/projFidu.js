const {initModels}=require('../models/init-models')
const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const { init } = require('express/lib/application')
const PROJ_FIDU=initModels(sequelize).project_bittiy

const uuid=require('./uuidcode')
const u= require('uuid')

exports.projFiduForm=(req,res)=>{
    const project_id=req.params.id
    res.render('yojana/add/projFidu',{
        project_id
   })
}

exports.addProjFidu= async(req,res)=>{
    const {project_id, peskiamt, runningbill, lastkista }=req.body
        const tb_data=await sequelize.query(`
        select tb_id from tbproj where _id= "${project_id}"
        `,{type:Sequelize.QueryTypes.SELECT})
    PROJ_FIDU.create({
        _id: uuid(u.v4()),project_id, peskiamt, runningbill, lastkista
    }).then(s=>{
        res.redirect(`/projectIndex/${project_id}`)
    }).catch(err=>{
        res.send(err)
    })
}

exports.getProjFidu=(req,res)=>{
    const project_id=req.params.id
    sequelize.query(`select * from project_bittiy where project_id="${project_id}"`,{
        type:Sequelize.QueryTypes.SELECT
    }).then(s=>{
        res.render('yojana/list/projFidu',{
          projFidu:s,
          project_id
        })
    })
}

exports.editProjFidu=(req,res)=>{
const _id=req.params.id
}
exports.deleteProjFidu=(req,res)=>{
const{ project_id, id} =req.params
PROJ_FIDU.destroy({where:{_id:id}}).then(s=>{
res.redirect(`/getProjFidu/${project_id}`)
}).catch(er=>{
    res.send("error deleting records..")
})
}
