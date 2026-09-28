const {initModels}=require('../models/init-models')
const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const { init } = require('express/lib/application')
const tbproj=initModels(sequelize).tbproj
const budget_project=initModels(sequelize).budget_project
const proj_beneficiary=initModels(sequelize).proj_beneficiary
const project_bittiy=initModels(sequelize).project_bittiy
const project_docs=initModels(sequelize).project_docs
const project_schedule=initModels(sequelize).project_schedule
const uuid=require('./uuidcode')
const u= require('uuid')

/*
Fields::
tbproj=> project_address: string(180)
    beneficiary_contrib: double, allocated_budget: double, 
    project_name:string, project_level: string,
    tb_id, _id
    */
  exports.projectIndex= async(req,res)=>{
    const project_id=req.params.id
    const tb_data=await sequelize.query(`
        select * from tbproj where _id= "${project_id}"
        `,{type:Sequelize.QueryTypes.SELECT})

    res.render('yojana/project_index',{
      tb_id:tb_data[0].tb_id, project_id,
      project:tb_data[0]
    })
  }

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
          //console.log(s)
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
        }).then(s=>{
          res.redirect(`/addTBRec/${tb_id}`)
        }).catch(err=>{
          res.send(err)
        })
          
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
            //console.log(s)
            res.render('yojana/list/projects',{ projects:s,data:data[0] })
          }).catch(e=>{
              console.log(e)
          })
        }     
        exports.deleteProject= async(req,res)=>{
          try {
            const {id, tb_id} = req.params;
            await sequelize.transaction(async (transaction)=>{
              await budget_project.destroy({where:{proj_id:id}, transaction})
              await proj_beneficiary.destroy({where:{proj_id:id}, transaction})
              await project_bittiy.destroy({where:{project_id:id}, transaction})
              await project_docs.destroy({where:{project_id:id}, transaction})
              await project_schedule.destroy({where:{project_id:id}, transaction})
              await tbproj.destroy({where:{_id:id}, transaction})
            })
            res.redirect(`/projects/${tb_id}`)
          } catch (error) {
            res.send(error)
          }
        }     

      
      
      


    
  exports.getProjEditForm=(req,res)=>{
    const { tb_id,id}=req.params
    sequelize.query(`select * from tbproj where _id=:id`,{
       replacements:{id},type:Sequelize.QueryTypes.SELECT }).then(r=>{
       // console.log(r)
        res.render('yojana/update/tb_project',{
            data:r[0], tb_id
            })
    }).catch(err=>{
        console.log("found no records")
    })
    }

  exports.updateProject=(req,res)=>{
        const { _id,tb_id,project_name, allocated_budget,beneficiary_contrib,
         project_address, project_level,bk_id,aim,start_date, end_date,agreement_date
        }=req.body 
        tbproj.update({project_name, allocated_budget,beneficiary_contrib,
         project_address, project_level,bk_id,aim,start_date, end_date,agreement_date},{
          where:{_id}
        }).then(s=>{
          res.redirect(`/projects/${tb_id}`)
        }).catch(err=>{
          res.send("error occurred updating docs.")
        })
  }
  
  
  //delTBM
  
  
