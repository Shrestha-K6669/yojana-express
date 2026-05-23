const {initModels}=require('../models/init-models')
const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const { init } = require('express/lib/application')
const budget_karykram=initModels(sequelize).budget_karykram

const uuid=require('./uuidcode')
const u= require('uuid')

const read_budget=require('xlsx')
const path=require('path')
exports.readBudget=(req,res)=>{
  const pathName1=path.resolve(`${_baseDir}/public/excel/budget.xlsx`)
  const file = read_budget.readFile(pathName1)
  const temp = read_budget.utils.sheet_to_json(
    file.Sheets[file.SheetNames[0]])
    budget_karykram.bulkCreate(temp).then(s=>{
      res.send(s)
    })
    //console.log(temp)
    
}
//destroy all records

exports.deleteAllBudgetItem=(req,res)=>{
  sequelize.query(`select _id from budget_karykram `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
    s.forEach(e => {
      budget_karykram.destroy({where:{
        _id:e._id
      }})
    });
  }).then(r=>{
    res.send("deleted...")
  }).catch(err=>{
    res.send(err)
  })
}

/*
Fields::
budget_karykram=> name,amount,description
    */
    exports.getBudgetForm=async(req,res)=>{
      res.render('yojana/add/bk'
        )
        }
    //create new one
        exports.addbudget_karykram=(req,res)=>{
  
          const {
        name, amount,description
          }=req.body 
          
          budget_karykram.create({_id:uuid(u.v4()),
         name,amount,description
        }).then(s=>{
          console.log(s)
            res.redirect(`/budgets`)
        }).catch(err=>{
            console.log(err)
        })
        
        }

        //budget list

        exports.getAllBudget=(req,res)=>{
          sequelize.query(`select * from budget_karykram `,
          {type:Sequelize.QueryTypes.SELECT}).then(s=>{
            res.render('yojana/list/budget',{
              data:s
            })
          }).catch(er=>{
            res.send(er)
          })
        }

        exports.deleteBK= async(req,res)=>{
          const _id=req.params.id
          budget_karykram.destroy({where:{_id}}).then(async s=>{
            res.redirect(`/budgets`)         
        }).catch(er=>{console.log(er)})
        }
/*
  exports.getTBECEditForm=(req,res)=>{
    const _id=req.params.id
    sequelize.query(`select * from budget_karykram where _id=:id`,{
       replacements:{id:_id},type:Sequelize.QueryTypes.SELECT
    }).then(r=>{
       // console.log(r)
        res.render('yojana/update/budget_karykram',{
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
        budget_karykram.update({name, designation,address, ctz, email, contact},{
          where:{_id}
        }).then(s=>{
          res.redirect(`/tbec/${tb_id}`)
        }).catch(err=>{
          res.send("error occurred updating docs.")
        })
  }
  
  
  //delTBM
  exports.deleteTBECM= async(req,res)=>{
    const _id=req.body.id
    const tb_id=req.body.tb_id
    budget_karykram.destroy({where:{_id}}).then(async s=>{
    res.redirect(`/tbec/${tb_id}`)          
  }).catch(er=>{console.log(er)})
  }
  
*/
