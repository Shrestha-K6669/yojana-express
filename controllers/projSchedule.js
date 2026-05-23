const {initModels}=require('../models/init-models')
const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const { init } = require('express/lib/application')
const PROJ_SCHEDULE=initModels(sequelize).project_schedule

const uuid=require('./uuidcode')
const u= require('uuid')

exports.projScheduleForm=(req,res)=>{
    const project_id=req.params.id
    res.render('yojana/add/projectschedule',{
        project_id
   })
}

exports.addProjSchedule= async(req,res)=>{
    const {project_id, activities, start_date, end_date, misc }=req.body
        const tb_data=await sequelize.query(`
        select tb_id from tbproj where _id= "${project_id}"
        `,{type:Sequelize.QueryTypes.SELECT})
    PROJ_SCHEDULE.create({
        _id: uuid(u.v4()),activities, project_id, start_date, end_date, misc
    }).then(s=>{
        sequelize.query(`select * from project_schedule where project_id="${project_id}" `,
    {type:Sequelize.QueryTypes.SELECT}).then(s1=>{
        res.render('yojana/list/schedule',{
            schedules:s1,
            project_id, tb_id:tb_data[0].tb_id
        })
    })
    }).catch(err=>{
        res.send(err)
    })
}

exports.getProjectSchedules=async(req,res)=>{
    const project_id=req.params.id
    const tb_data=await sequelize.query(`
        select tb_id from tbproj where _id= "${project_id}"
        `,{type:Sequelize.QueryTypes.SELECT})
    sequelize.query(`select * from project_schedule where project_id="${project_id}" order by  start_date asc `,
    {type:Sequelize.QueryTypes.SELECT}).then(s=>{
        res.render('yojana/list/schedule',{
            schedules:s,
            project_id, tb_id:tb_data[0].tb_id
        })
    })
}

exports.deleteProjSchedule= async(req,res)=>{
 const project_id=req.params.id
 const tb_data=await sequelize.query(`
        select tb_id from tbproj where _id= "${project_id}"
        `,{type:Sequelize.QueryTypes.SELECT})
 PROJ_SCHEDULE.destroy({where:{project_id}}).then(s=>{
    res.render('yojana/list/schedule',{
        schedules:[],
        project_id, tb_id:tb_data[0].tb_id
    })
 }).catch(err=>{
    res.send(err)
 })  
}

exports.deleteScheduleByID=(req,res)=>{
const _id=req.params.id
const project_id=req.params.project_id
 PROJ_SCHEDULE.destroy({where:{_id}}).then(s=>{
    res.redirect(`/projschedules/${project_id}`)
 }).catch(err=>{
    res.send("err")
 }) 
}