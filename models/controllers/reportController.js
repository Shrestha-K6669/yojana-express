const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')

exports.agreement= async(req,res)=>{
const tolebikas_id=req.params.id
console.log("inside agreement..")
const tb_info=await sequelize.query(`select * from tolebikas
where _id="${tolebikas_id}" `,{type:Sequelize.QueryTypes.SELECT})
const tb_member=await sequelize.query(`select * from tolebikasmember
where tolebikas_id="${tolebikas_id}" `,{type:Sequelize.QueryTypes.SELECT})
const anugamansamiti=await sequelize.query(`select * from anugaman_samiti
where tolebks_id="${tolebikas_id}" `,{type:Sequelize.QueryTypes.SELECT})
const projects=await sequelize.query(`select * from tbproj
where tb_id="${tolebikas_id}" `,{type:Sequelize.QueryTypes.SELECT})
let sche=[]
projects.forEach(async el => {
let sch= await sequelize.query(`select * from project_schedule
 where project_id="${el._id}" `,{type:Sequelize.QueryTypes.SELECT})
sche.push(sch)
console.log(sche)
   });

try {
   res.render('reports/samjhauta',{
    tolebikas:tb_info,
    members:tb_member,
    anugamansamiti,
    projects
})
/*
res.render('yojana/report/samjhauta',{
    tolebikas:tb_info,
    members:tb_member,
    anugamansamiti,
    projects
}

)*/
} catch (error) {
    res.send(error)
}

}



exports.exportexcel=(req,res)=>{

}
