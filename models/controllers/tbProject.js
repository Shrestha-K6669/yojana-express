const {initModels}=require('../models/init-models')
const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const { init } = require('express/lib/application')
const tbproj=initModels(sequelize).tbproj
const budget_project=initModels(sequelize).budget_project
const uuid=require('./uuidcode')
const u= require('uuid')

/*
Fields::
tbproj=> project_address: string(180)
    beneficiary_contrib: double, allocated_budget: double, 
    project_name:string, project_level: string,
    tb_id, _id
    */
    exports.getProjForm=async(req,res)=>{
        const tb_id=req.params.id
       const projects=await sequelize.query(`select * from tbproj
        where tb_id="${tb_id}" `,{type:Sequelize.QueryTypes.SELECT})
      const budgets=await sequelize.query(`select * from budget_karykram
      `,{type:Sequelize.QueryTypes.SELECT})
        sequelize.query(`
        select * from tolebikas where _id= "${tb_id}"
        `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
          //console.log("getTB Member route test")
          console.log(s)
          res.render('yojana/add/tb_project',{
            data:s[0],
            projects,
            budgets
          })
        }).catch(err=>{
          res.send("error occurred, Please redo your operation correctly...")
        })
        }

exports.addtbproj=async(req,res)=>{
           const {
        tb_id, project_name, allocated_budget,beneficiary_contrib,
         project_address, project_level,bk_id,aim,start_date, end_date,agreement_date
          }=req.body 

          try {
            const proj_id=uuid(u.v4())
         await tbproj.create({_id:proj_id,
            tb_id, project_name, allocated_budget,beneficiary_contrib,
             project_address, project_level,aim,start_date, end_date,agreement_date
        })
       await budget_project.create({ _id:uuid(u.v4()),proj_id,bk_id,misc:project_name})
       res.redirect(`/addProjform/${tb_id}`)
          } catch (error) {
            res.send(error)
          }
                    
        }  

        exports.getprojects=async(req,res)=>{
          const tb_id=req.params.id
          const data=await sequelize.query(`
          select * from tolebikas where _id= "${tb_id}"
          `,{type:Sequelize.QueryTypes.SELECT})
          await sequelize.query(`select * from tbproj
          where tb_id="${tb_id}" `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
            console.log(s)
            res.render('yojana/list/projects',{ projects:s,data:data[0] })
          }).catch(e=>{
              console.log(e)
          })
        }     
        exports.deleteProject= async(req,res)=>{
          try {
          const _id=req.body.id
          const tb_id=req.body.tb_id
          await budget_project.destroy({where:{proj_id:_id}})
          await tbproj.destroy({where:{_id}}).then(async s=>{
          res.redirect(`/projects/${tb_id}`)          
        }).catch(er=>{console.log(er)})
          } catch (error) {
            res.send(error)
          }
        }     

       /*

    
  exports.getTBECEditForm=(req,res)=>{
    const _id=req.params.id
    sequelize.query(`select * from tbproj where _id=:id`,{
       replacements:{id:_id},type:Sequelize.QueryTypes.SELECT
    }).then(r=>{
       // console.log(r)
        res.render('yojana/update/tbproj',{
            data:r[0],
            })
    }).catch(err=>{
        console.log("found no records")
    })
    }
  exports.updateTBEC=(req,res)=>{
    const _id=req.body.id
    const tb_id=req.body.tb_id
    const {
      name, designation,address, ctz, email, contact
        }=req.body 
        tbproj.update({name, designation,address, ctz, email, contact},{
          where:{_id}
        }).then(s=>{
          res.redirect(`/tbec/${tb_id}`)
        }).catch(err=>{
          res.send("error occurred updating docs.")
        })
  }
  
  
  //delTBM
  
  
*/