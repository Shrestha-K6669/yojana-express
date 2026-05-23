
const {initModels}=require('../models/init-models')
const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const { init } = require('express/lib/application')
const kanun_type=initModels(sequelize).kanun_type
const kanun=initModels(sequelize).kanuninfo
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
//reln entry

//globals for mixed server.
global.indexRec={
    message:'',
    law_types:[],
    laws:[],
    prevPage:1
    }

//add kanun info
exports.addKanunType=(req,res)=>{
    const name=req.body.name

    kanun_type.create({
        _id:uuid(u.v4()),
        name
    }).then(
        s=>{
            //console.log(s)
            res.redirect('/lawTypes')
        }
    ).catch(e=>{
        console.log(e)
    })
}
exports.getLawTypeForm=(req,res)=>{
    res.render('law/lawTypeForm')
}
exports.getLawForm=(req,res)=>{
    //console.log("directed to law form route....")
sequelize.query(`
select * from kanun_type
`,{type:Sequelize.QueryTypes.SELECT}).then(t=>{
    res.render('law/lawForm',{
        law_types:t 
    })

}).catch(err=>{
    console.log("error")
})
    
    }
exports.index=(req,res)=>{
    res.render('index')
}
exports.indexHome=(req,res)=>{
const law_type=sequelize.query(`
select * from kanun_type
`,{type:Sequelize.QueryTypes.SELECT})
const law=sequelize.query(`
select * from kanuninfo
`,{type:Sequelize.QueryTypes.SELECT})
Promise.all([law_type,law]).then(s=>{
   indexRec={
    message:'',
    law_types:s[0],
    laws:s[1],
    prevPage:1
     }
    res.render('index',{
       message:'',
    law_types:s[0],
    laws:s[1]
   })
}).catch(e=>{
    console.log("error getting records")
})
}


//adding law types::
exports.addLaw=(req,res)=>{
    const name=req.body.name
    const kanun_type=req.body.kanun_type
    const docs= checkFile(req)
    //console.log(req)
    //console.log(name+"and"+kanun_type)
    let k_f_p=null
    let k_f_w=null
  if(docs.k_file_pdf!==undefined){
    k_f_p=docs.k_file_pdf[0].filename
  }

  if(docs.k_file_word!==undefined){
    k_f_w=docs.k_file_word[0].filename
  }
  
    kanun.create({
        _id:uuid(u.v4()),name,kanun_type, k_file_pdf:k_f_p,k_file_word:k_f_w
    }).then(s=>{
        {
            //console.log(s)
            res.redirect('/lawForm')                  
        }
    }).catch(e=>{
        console.log(e)
    })
    }
//get Law records
//get Reln get page info,
exports.getLaws=(req,res)=>{
    let page=1
    if(req.body.page!==undefined){
        page=parseInt(req.body.page)
    }
    //console.log(req.body.page +""+"is page no:")
    const offset=20*(page-1)
    sequelize.query(`
    select distinct k._id, t.name as kanun_type, k.name as kanun,
    k.k_file_pdf, k.k_file_word from kanuninfo k
    left join kanun_type t on k.kanun_type=t._id limit 20 offset ${offset}
    `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
        //console.log(s)
        indexRec.prevPage=page
        res.render('law/lawList',{
            data:s,
            message: "getting records of Laws.",
            law_types:indexRec.law_types,
            laws:indexRec.laws
        })
    }).catch(e=>{
        console.log(e)
    })
}

exports.getPageLaws=(req,res)=>{
    const page=req.body.page
   // console.log("Page is"+req.body.page)
     const offset=20*(page-1)
     sequelize.query(`
    select distinct k._id, t.name as kanun_type, k.name as kanun,
    k.k_file_pdf, k.k_file_word from kanuninfo k
    left join kanun_type t on k.kanun_type=t._id limit 20 offset ${offset}
    `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
        //console.log(s)
        indexRec.prevPage=page
        res.render('law/lawList',{
            data:s,
            message: "getting records of Laws.",
            law_types:indexRec.law_types,
            laws:indexRec.laws
        })
    }).catch(e=>{
        console.log(e)
    })
    
}
//get kanun type
exports.getLawTypes=(req,res)=>{
    sequelize.query(`select * from kanun_type`,{type:Sequelize.QueryTypes.SELECT}).then(
        s=>{
                res.render('law/lawTypeList',{
                data:s,
                message: "getting records of Law Types.",
                 })
        }
    )
}

//view file

exports.viewFile=(req,res)=>{
    const pdf=req.body.f
   // console.log("pdf file"+pdf)
    res.render('law/iframe',{
        k_file_pdf:pdf,
        message: "displaying iframe.",
        law_types:indexRec.law_types,
        laws:indexRec.laws
    })
}

//update record files
//function to be tested.. and currently unused
exports.updateDocs=async(req,res)=>{
    var fs=require('fs')
    const docs= checkFile(req)
    const _id=req.params.id
    let k_f_p=null
    let k_f_w=null
  if(docs.k_file_pdf!==undefined){
    k_f_p=docs.k_file_pdf[0].filename
  }

  if(docs.k_file_word!==undefined){
    k_f_w=docs.k_file_word[0].filename
  }
  //get image from req body.
const prevDocPDF=req.body.prevDocPDF
const prevDocWORD=req.body.prevDocWORD
const path1=path.resolve(`${_baseDir}/public/uploads/${prevDocPDF}`)
const path2=path.resolve(`${_baseDir}/public/uploads/${prevDocWORD}`)
try {
    if(fs.existsSync(path1)){
        fs.unlink(path1,function(err){
            if(err) throw err;
            console.log("pdf file  has been deleted")
        })
    }
    if(fs.existsSync(path2)){
       fs.unlink(path2,function(err){
            if(err) throw err;
            console.log("word file has been deleted")
        })
    } 
} catch (error) {
    res.send("error deleting files")    
}
//update kanun files
kanun.update({
    k_file_pdf:k_f_p,
    k_file_word:k_f_w
},{
    where:_id
}).then(s=>{
    {
        //console.log(s)
        res.render('index',{
            message: "Law has been created.",
            law_types:indexRec.law_types,
            laws:indexRec.laws
             })
    }
}).catch(e=>{
    console.log(e)
})
}
exports.getLawEditForm=(req,res)=>{
    const _id=req.params.id
    sequelize.query(`select * from kanuninfo where _id=:id`,{
        replacements:{id:_id},type:Sequelize.QueryTypes.SELECT
    }).then(r=>{
       // console.log(r)
        res.render('law/lawEditForm',{
            data:r[0],
            law_types:indexRec.law_types 
        })
    }).catch(err=>{
        console.log("found no records")
    })
      
    }
exports.updateLawName=(req,res)=>{
    const name=req.body.name
    const _id =req.body.id
    const type=req.body.kanun_type
    //console.log(_id)
    kanun.update({
        name,kanun_type:type
    },{
        where:{_id}
    }).then(s=>{
        {
            //console.log(s)
            res.redirect('/laws')
        }
    }).catch(e=>{
        console.log(e)
    })
       
}
//delete laws record
exports.deleteLaw= async(req,res)=>{
    const _id=req.body.id
    console.log("heated delete .."+_id)
       await kanun.findAll({attributes:['k_file_pdf','k_file_word'],where:{_id}}).then(rs=>{
            if(rs.length>0){
                const pathName1=path.resolve(`${_baseDir}/public/uploads/${rs[0].k_file_pdf}`)
                const pathName2=path.resolve(`${_baseDir}/public/uploads/${rs[0].k_file_word}`)
                console.log(pathName1)
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
                    kanun.destroy({where:{_id}}).then(async s=>{
             
                        res.redirect('/laws')          
                }).catch(er=>{console.log(er)})
            } else{
                res.send("no such records found.")
            }
        }).catch(er=>{
            res.send("error."+er)
        })
}
/* delete law type */

exports.deleteLawType=(req,res)=>{
    const _id=req.params.id
    kanun_type.destroy({where:{_id}}).then(s=>{
  res.redirect('/lawTypes')
    }).catch(err=>{
        console.log("error deleting law type")
    })
}
/*
for General Access
*/
exports.getGeneralLaws=(req,res)=>{
    let page=1
    if(req.body.page!==undefined){
        page=parseInt(req.body.page)
    }
    //console.log(req.body.page +""+"is page no:")
    const offset=20*(page-1)
    sequelize.query(`
    select distinct k._id, t.name as kanun_type, k.name as kanun,
    k.k_file_pdf, k.k_file_word from kanuninfo k
    left join kanun_type t on k.kanun_type=t._id ORDER BY k.name asc limit 20 offset ${offset}
    `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
        //console.log(s)
        indexRec.prevPage=page
        res.render('userView/lawList',{
            data:s,
            message: "getting records of Laws.",
            law_types:indexRec.law_types,
            laws:indexRec.laws
        })
    }).catch(e=>{
        console.log(e)
    })
}

exports.getGeneralPageLaws=(req,res)=>{
    const page=req.body.page
    console.log("Page is"+req.body.page)
     const offset=20*(page-1)
     sequelize.query(`
    select distinct k._id, t.name as kanun_type, k.name as kanun,
    k.k_file_pdf, k.k_file_word from kanuninfo k
    left join kanun_type t on k.kanun_type=t._id ORDER BY k.name asc limit 20 offset ${offset}
    `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
        //console.log(s)
        indexRec.prevPage=page
        res.render('userView/lawList',{
            data:s,
            message: "getting records of Laws.",
            law_types:indexRec.law_types,
            laws:indexRec.laws
        })
    }).catch(e=>{
        console.log(e)
    })
    
}
/*
//get Reln 
exports.getRelations=(req,res)=>{
    sequelize.query(`
    select * from reln
    `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
        res.render('profile/relnList',{
            data:s,
            message:indexRec.message,f
    house_num:indexRec.house_num,
    relation:indexRec.relation,
    tole:indexRec.tole
        })
    }).catch(e=>{
        console.log(e)
    })
}

exports.deleteReln=(req,res)=>{
    const _id=req.params.id
    reln.destroy({
        where:{_id}
    }).then(s=>{
        sequelize.query(`
    select * from reln
    `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
        res.render('profile/relnList',{
            data:s,
            message:indexRec.message,
    house_num:indexRec.house_num,
    relation:indexRec.relation,
    tole:indexRec.tole
        })
    }).catch(e=>{
        console.log(e)
    })
    }).catch(e=>{
        console.log(e)
    })
}

exports.addHouse=(req,res)=>{
const ward_no=req.body.ward_no
const house_no=req.body.house_no
const house_desc=req.body.house_desc
housenum.create({
    _id:uuid(u.v4()),
    ward_no,
    house_no,
    house_desc
}).then(s=>{
    {
        //console.log(s)
        res.render('index',{
            message: "house num created.",
            house_num:indexRec.house_num,
    relation:indexRec.relation,
    tole:indexRec.tole
        })
    }
}).catch(e=>{
    console.log(e)
})
}

// get houses for listing

exports.getHouses=(req,res)=>{
    sequelize.query(`
    select * from housenum
    `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
        res.render('profile/houseList',{
            data:s,
            message:indexRec.message,
    house_num:indexRec.house_num,
    relation:indexRec.relation,
    tole:indexRec.tole
        })
    }).catch(e=>{
        console.log(e)
    })
}


exports.deleteHouse=(req,res)=>{
    const _id=req.params.id
    housenum.destroy({
        where:{_id}
    }).then(s=>{
        sequelize.query(`
    select * from housenum
    `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
        res.render('profile/houseList',{
            data:s,
            message:indexRec.message,
    house_num:indexRec.house_num,
    relation:indexRec.relation,
    tole:indexRec.tole
        })
    }).catch(e=>{
        console.log(e)
    })
    }).catch(e=>{
        console.log(e)
    })
}

//tole
exports.addTole=(req,res)=>{
    const ward_no=req.body.ward_no
    const tole_name=req.body.tole_name
    const tole_desc=req.body.tole_desc
    tole.create({
        _id:uuid(u.v4()),
        ward_no,
        tole_name,
        tole_desc
    }).then(s=>{
        {
            //console.log(s)
            res.render('index',{
                message: "tole added successfully.",
                house_num:indexRec.house_num,
    relation:indexRec.relation,
    tole:indexRec.tole
            })
        }
    }).catch(e=>{
        console.log(e)
    })
    }
//get tole info
exports.getTole=(req,res)=>{
    sequelize.query(`
    select * from tole
    `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
        res.render('profile/toleList',{
            data:s,
            message:indexRec.message,
    house_num:indexRec.house_num,
    relation:indexRec.relation,
    tole:indexRec.tole
        })
    }).catch(e=>{
        console.log(e)
    })
}
//delete Tole info
exports.deleteTole=(req,res)=>{
    const _id=req.params.id
    tole.destroy({
        where:{_id}
    }).then(s=>{
        sequelize.query(`
    select * from tole
    `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
        res.render('profile/toleList',{
            data:s,
            message:indexRec.message,
    house_num:indexRec.house_num,
    relation:indexRec.relation,
    tole:indexRec.tole
        })
    }).catch(e=>{
        console.log(e)
    })
    }).catch(e=>{
        console.log(e)
    })
}
//profile entry
exports.profileEntry=(req,res)=>{    
    const r_id=req.body.reln
    const h_id=req.body.house_num
    const t_id=req.body.tole
    const name_eng=req.body.name_eng
    const name_nep=req.body.name_nep
    const gender=req.body.gender
    const dob=req.body.dob
    const ctz_no=req.body.ctz_no
    const created_by="admin"
   
    var promises=[]
    promises.push(sequelize.query(`
    select * from housenum where _id=:h_id
    `,{replacements:{
        h_id
    },type:Sequelize.QueryTypes.SELECT}))
    promises.push(sequelize.query(`
    select * from tole where _id=:t_id
    `,{replacements:{
        t_id
    },type:Sequelize.QueryTypes.SELECT}))
    Promise.all(promises).then(r=>{
         const family_code=r[1][0].ward_no+r[1][0].tole_name+r[0][0].house_no
              
        familyinfo.create({_id:uuid(u.v4()),r_id,h_id,t_id,name_eng,
            name_nep,gender,dob,ctz_no,family_code,created_by}).then(s=>{
            //console.log(s._id)
            res.send(s)
            
            }).catch(e=>{
                console.log(e)
            }) 
            
    })
    
      
    
}



//insert file documents of family...
exports.insertOtherInfo=(req,res)=>{
const {f_id,age,profession,documents,status}=req.body
}

// get all mails:

global.profileData=[];

exports.getProfiles=(req,res)=>{
    sequelize.query(`
    select * from familyinfo
    `,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
        profileData=s
        res.render('profile/profileList',{
            data:s,
            message:indexRec.message,
    house_num:indexRec.house_num,
    relation:indexRec.relation,
    tole:indexRec.tole
        })
    }).catch(e=>{
        console.log(e)
    })
}

exports.getProfileByID=(req,res)=>{

}

exports.documentForm=(req,res)=>{
    const id=req.body.id
    console.log(id)
    res.render("profile/otherInfoForm",{
        id,
        message:indexRec.message,
    house_num:indexRec.house_num,
    relation:indexRec.relation,
    tole:indexRec.tole
    })
    
}
exports.documentEntry=(req,res)=>{
    
    const fl=checkFile(req)
    let ctz=null
    let cert=null
    let land=null
    let company=null
    let others=null
      if(fl.ctz!==undefined){
          ctz=fl.ctz
      }
      if(fl.cert!==undefined){
          cert=fl.cert
      }
      if(fl.land!==undefined){
          land=fl.land
      }
      if(fl.company!==undefined){
          company=fl.company
      }
      if(fl.others!==undefined){
          others=fl.others
      }

    const {age,profession,status}=req.body
    const f_id= req.body.f_id
    console.log(f_id)
        
    otherinfo.create({_id:uuid(u.v4()),f_id,age,profession,status,
    documents:{ctz,cert,land,company,others}}).then(s=>{
    res.render('profile/profileList',{
            data:profileData,
            message:indexRec.message,
            house_num:indexRec.house_num,
            relation:indexRec.relation,
            tole:indexRec.tole
        })    
    }).catch(e=>{
        console.log(e)
    })    
    //res.send("default hello.")
}
/*

*/


/*
exports.profileEntry=(req,res)=>{
    const fl=checkFile(req)
    let file1=null
      if(fl.file1!==undefined){
          file1=fl.file1
      }
    const from_to=req.body.from_to
    const subject=req.body.subject
    const d_time=req.body.d_time
    const misc=req.body.misc
    emails.create({_id:uuid(u.v4()),from_to}).then(s=>{
    //console.log(s._id)
    inbox.create({
        _id:uuid(u.v4()),mail_id:s._id,
        subject,file:file1,d_time,misc
    }).then(s1=>{
        res.render('index',{
            message: "content saved successfully on inbox."
        })
    }).catch(e1=>{

    })
    }).catch(e=>{
        console.log(e)
    })    
}
*/

/* suggested file upload with formdata:
var formData = new FormData();
var imagefile = document.querySelector('#file');
formData.append("image", imagefile.files[0]);
axios.post('upload_file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})

*/

/*
got mime-type problem rendering while getting value from href, so used form method="post"

*/

/*
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js" integrity="sha512-ElRFoEQdI5Ht6kZvyzXhYG9NqjtkmlkfYk0wr6wHxU9JEHakS7UJZNeml5ALk+8IKlU6jDgMabC3vkumRokgJA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
chart.js integration for dashboard..
*/

/*
sequelize.query(`
select h.ward_no, h.house_no,t.tole_name from housenum h
inner join familyinfo f on f.h_id=h._id
inner join tole t on f.t_id=t._id
where f.h_id=:h_id and f.t_id=:t_id
`,{replacements:{h_id,t_id},type:Sequelize.QueryTypes.SELECT}).then(r=>{
    console.log("join query output is::")
    console.log(r[0])
    const family_code=r[0].ward_no+r[0].tole_name+r[0].house_no
    familyinfo.create({_id:uuid(u.v4()),r_id,h_id,t_id,name_eng,
        name_nep,gender,dob,ctz_no,family_code}).then(s=>{
        //console.log(s._id)
        res.send(s)
        
        }).catch(e=>{
            console.log(e)
        }) 
}).catch(err=>{
    console.log(err)
})
*/

