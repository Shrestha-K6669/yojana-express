const {initModels}=require('../models/init-models')
const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const { init } = require('express/lib/application')
const tolebikasmember=initModels(sequelize).tolebikasmember
var fs = require('fs');
const uuid=require('./uuidcode')
const u= require('uuid')


//file finder helper function
var path =require('path')

const read_budget=require('xlsx')

exports.readTBMember=(req,res)=>{
  console.log("inside tbm import")
  const uploadedFile = req.file && req.file.path ? req.file.path : null
  const pathName1 = uploadedFile
      ? path.resolve(`${_baseDir}/${uploadedFile}`)
      : path.resolve(`${_baseDir}/public/excel/tbm.xlsx`)

  console.log(pathName1)
  const file = read_budget.readFile(pathName1)
  const temp = read_budget.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])

  tolebikasmember.bulkCreate(temp).then(s=>{
    console.log(temp)
    res.send(s)
  }).catch(err=>{
    res.send(err)
  })
}

exports.downloadTBMemberTemplate=(req,res)=>{
  const wb = read_budget.utils.book_new()
  const ws = read_budget.utils.json_to_sheet([
    { name: 'Sample Member Name', designation: 'सदस्य', address: 'Sample Address', ctz: '12345', email: 'sample@example.com', contact: '9800000000', tolebikas_id: 'sample-id', seq: 1 },
    { name: 'Second Member Name', designation: 'अध्यक्ष', address: 'Second Address', ctz: '54321', email: 'sample2@example.com', contact: '9800000001', tolebikas_id: 'sample-id', seq: 2 }
  ])
  read_budget.utils.book_append_sheet(wb, ws, 'Members')

  const buffer = read_budget.write(wb, { type: 'buffer', bookType: 'xlsx' })
  res.setHeader('Content-Disposition', 'attachment; filename="tb-member-template.xlsx"')
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.send(buffer)
}

function checkFile(req){
    if(typeof req.files!=='undefined'){
        return req.files;
    }
}
global.indexRec={
  message:'',
  tbmembers:[],
  tbinfo:[],
  }
exports.getTBaddindex= async(req,res)=>{
  const tolebikas_id=req.params.id
  const tbinfo= await sequelize.query(`
  select * from tolebikas where _id= "${tolebikas_id}"
  `,{type:Sequelize.QueryTypes.SELECT})
  res.render('yojana/add/addTBindex',{
    tolebikas_id,
    data:tbinfo[0]
  })
}
exports.getTBMForm=async(req,res)=>{
  const tolebikas_id=req.params.id
 const tbmember=await sequelize.query(`select * from tolebikasmember where tolebikas_id="${tolebikas_id}" `,{type:Sequelize.QueryTypes.SELECT})
  sequelize.query(`
  select * from tolebikas where _id= "${tolebikas_id}"
  `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
    //console.log("getTB Member route test")
    //console.log(s)
    res.render('yojana/add/tb_member',{
      data:s[0],
      members:tbmember
    })
  }).catch(err=>{
    res.send("error occurred, Please redo your operation correctly...")
  })
  
}
/*
field info:
 contact, photo, email, ctz, address, 
 designation, name, tolebikas_id, ctz_front, ctz_back

*/

exports.addToleBikasMember=(req,res)=>{
  const {
tolebikas_id, name, designation,address, ctz, email, contact,seq
  }=req.body 
  const pic= checkFile(req)
  //console.log(req.body)
  let photo,ctz_front,ctz_back=null
  if(pic.photo!==undefined){
    photo=pic.photo[0].filename
  }
  if(pic.ctz_front!==undefined){
ctz_front=pic.ctz_front[0].filename
  }
  if(pic.ctz_back!==undefined){
    ctz_back=pic.ctz_back[0].filename
  }
  tolebikasmember.create({_id:uuid(u.v4()),
    name,tolebikas_id,designation,address,ctz, email, contact, photo, ctz_front, ctz_back,seq 
}).then(s=>{
    res.redirect(`/addMemberForm/${tolebikas_id}`)
}).catch(err=>{
    console.log(err)
})

}


exports.getTBM=(req,res)=>{
  const tolebikas_id=req.params.id
   sequelize.query(`
  select * from tolebikasmember where tolebikas_id="${tolebikas_id}"
  `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
      //console.log(s)
       res.render('yojana/list/tbm',{
          data:s, tolebikas_id
           })
  }).catch(e=>{
      console.log(e)
  })
  
}

exports.getTBMEditForm=(req,res)=>{
  const _id=req.params.id
  sequelize.query(`select * from tolebikasmember where _id=:id`,{
      replacements:{id:_id},type:Sequelize.QueryTypes.SELECT
  }).then(r=>{
     // console.log(r)
      res.render('yojana/update/tb_member',{
          data:r[0],
          })
  }).catch(err=>{
      console.log("found no records")
  })
    
  }
exports.updateTBM=(req,res)=>{
  const _id=req.body.id
  const tolebikas_id=req.body.tolebikas_id
  const {
    name, designation,address, ctz, email, contact
      }=req.body 
      tolebikasmember.update({name, designation,address, ctz, email, contact},{
        where:{_id}
      }).then(s=>{
        res.redirect(`/tbm/${tolebikas_id}`)
      }).catch(err=>{
        res.send("error occurred updating docs.")
      })
}

exports.getTBMDocsEditForm=(req,res)=>{
  const _id=req.params.id
  sequelize.query(`select * from tolebikasmember where _id=:id`,{
      replacements:{id:_id},type:Sequelize.QueryTypes.SELECT
  }).then(r=>{
     // console.log(r)
      res.render('yojana/update/tbm_docs',{
          data:r[0],
          })
  }).catch(err=>{
      console.log("found no records")
  })
    
  }
  exports.updateMemberDocs= async(req,res)=>{
    const _id=req.body.id
    const tolebikas_id=req.body.tolebikas_id
      const pic= checkFile(req)
        //console.log(req.body)
        let photo,ctz_front,ctz_back=null
        if(pic.photo!==undefined){
          photo=pic.photo[0].filename
        }
        if(pic.ctz_front!==undefined){
      ctz_front=pic.ctz_front[0].filename
        }
        if(pic.ctz_back!==undefined){
          ctz_back=pic.ctz_back[0].filename
        }
    console.log("user hit on update member route .."+_id)
       await tolebikasmember.findAll({attributes:['photo','ctz_front','ctz_back'],where:{_id}}).then(rs=>{
            if(rs.length>0){
                const pathName1=path.resolve(`${_baseDir}/public/uploadTBmember/${rs[0].photo}`)
                const pathName2=path.resolve(`${_baseDir}/public/uploadTBmember/${rs[0].ctz_front}`)
                const pathName3=path.resolve(`${_baseDir}/public/uploadTBmember/${rs[0].ctz_back}`)
                if(fs.existsSync(pathName1)){
                    fs.unlink(pathName1,function (err) {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        console.log('pdf File deleted successfully !');
                    }) }
                    if(fs.existsSync(pathName2)){
                        fs.unlink(pathName2,function (err) {
                            if (err) throw err;
                            // if no error, file has been deleted successfully
                            console.log('word File deleted successfully !');
                        }) }
                        if(fs.existsSync(pathName3)){
                          fs.unlink(pathName3,function (err) {
                              if (err) throw err;
                              // if no error, file has been deleted successfully
                              console.log('word File deleted successfully !');
                          }) }
                          //update
                          tolebikasmember.update({photo,ctz_front, ctz_back},{where:{_id}}).then(s=>{
                            res.redirect(`/tbm/${tolebikas_id}`)
                          }).catch(error=>{
                            res.send("error 404.")
                          })
                      } else{
                res.send("no such records found.")
                }
                
        }).catch(er=>{
            res.send("error."+er)
        })
}

//delTBM
exports.deleteTBM= async(req,res)=>{
  const _id=req.params.id
 await tolebikasmember.findAll({attributes:['tolebikas_id','photo','ctz_front','ctz_back'],where:{_id}}).then(rs=>{
          if(rs.length>0){
            const pathName1=path.resolve(`${_baseDir}/public/uploadTBmember/${rs[0].photo}`)
            const pathName2=path.resolve(`${_baseDir}/public/uploadTBmember/${rs[0].ctz_front}`)
            const pathName3=path.resolve(`${_baseDir}/public/uploadTBmember/${rs[0].ctz_back}`)
            if(fs.existsSync(pathName1)){
                fs.unlink(pathName1,function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('pdf File deleted successfully !');
                }) }
                if(fs.existsSync(pathName2)){
                    fs.unlink(pathName2,function (err) {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        console.log('word File deleted successfully !');
                    }) }
                    if(fs.existsSync(pathName3)){
                      fs.unlink(pathName3,function (err) {
                          if (err) throw err;
                          // if no error, file has been deleted successfully
                          console.log('word File deleted successfully !');
                      }) }
                 tolebikasmember.destroy({where:{_id}}).then(async s=>{
                  console.log(s)
                 res.redirect(`/tbm/${rs[0].tolebikas_id}`)          
              }).catch(er=>{console.log(er)})
          } else{
              res.send("no such records found.")
          }
      }).catch(er=>{
          res.send("error."+er)
      })
}
