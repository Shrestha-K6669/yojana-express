const {initModels}=require('../models/init-models')
const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const { init } = require('express/lib/application')
const PROJ_BENEF=initModels(sequelize).proj_beneficiary

const uuid=require('./uuidcode')
const u= require('uuid')

exports.beneficiaryForm=(req,res)=>{
    const proj_id=req.params.id
    res.render('yojana/add/proj_beneficiary',{
    proj_id
   })
}

exports.addProjBeneficiary= async(req,res)=>{
    const {proj_id, male, female, houses,house_j, house_d, house_o, janajati_m, janajati_f, 
        dalit_m, dalit_f, other_m, other_f }=req.body
        const tb_data=await sequelize.query(`
        select tb_id from tbproj where _id= "${proj_id}"
        `,{type:Sequelize.QueryTypes.SELECT})
    PROJ_BENEF.create({
        _id: uuid(u.v4()), proj_id, male, female, houses,house_j, house_d, house_o,
         janajati_m, janajati_f, 
        dalit_m, dalit_f, other_m, other_f 
    }).then(s=>{
        res.redirect(`/projects/${tb_data[0].tb_id}`)
    }).catch(err=>{
        res.send(err)
    })
}

exports.deleteProjBeneficiary= async(req,res)=>{
 const proj_id=req.params.id
 const tb_data=await sequelize.query(`
        select tb_id from tbproj where _id= "${proj_id}"
        `,{type:Sequelize.QueryTypes.SELECT})
 PROJ_BENEF.destroy({where:{proj_id}}).then(s=>{
    res.redirect(`/projects/${tb_data[0].tb_id}`)
 }).catch(err=>{
    res.send(err)
 })  
}
