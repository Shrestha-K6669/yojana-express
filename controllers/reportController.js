const sequelize=require('../db/db_mx')
const Sequelize=require('sequelize')
const tolebikas = require('../models/tolebikas')

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
var promisses1=[]
var promisses2=[]
var promisses3=[]
projects.forEach(async el => {
    promisses2.push(sequelize.query(`select * from project_schedule
    where project_id="${el._id}" order by  start_date asc `,{type:Sequelize.QueryTypes.SELECT}))

    promisses3.push(sequelize.query(`select * from proj_beneficiary
    where proj_id="${el._id}" `,{type:Sequelize.QueryTypes.SELECT}))

   });
 
  //const project1= await Promise.all(promisses1)
  const schedule1=await Promise.all(promisses2)
  const beneficiary1=await Promise.all(promisses3)
let results=[]
for(let i=0; i<projects.length; i++){
    results.push({project:projects[i],schedule:schedule1[i], beneficiary:beneficiary1[i][0]})
}

   if (results[0].schedule.length>0&&beneficiary1.length>0) {
    //console.log("array length::"+results[0].schedule.length)
    try {
    
        res.render('reports/samjhauta',{
            tolebikas:tb_info,
            members:tb_member,
            anugamansamiti,
            projects:results
          
            }) 
     //res send is used for debug purpose only
     //res.send(results)
     } catch (error) {
        res.render('yojana/error/samjhautaerror',{
            tb_id:tolebikas_id
          })
     }
   } else {
    res.render('yojana/error/samjhautaerror',{
        tb_id:tolebikas_id
      })
   }



}
//projectwise agreement report

exports.projectsAgreement=async(req,res)=>{
    const {tb_id, project_id} =req.body
    const tb_info=await sequelize.query(`select * from tolebikas
    where _id="${tb_id}" `,{type:Sequelize.QueryTypes.SELECT})
    const tb_member=await sequelize.query(`select * from tolebikasmember
    where tolebikas_id="${tb_id}" `,{type:Sequelize.QueryTypes.SELECT})
    const anugamansamiti=await sequelize.query(`select * from anugaman_samiti
    where tolebks_id="${tb_id}" `,{type:Sequelize.QueryTypes.SELECT})
    const project=await sequelize.query(`select * from tbproj
    where _id="${project_id}" `,{type:Sequelize.QueryTypes.SELECT})
   const schedule=await sequelize.query(`select * from project_schedule
   where project_id="${project_id}" order by  start_date asc `,{type:Sequelize.QueryTypes.SELECT})
   const proj_beneficiary=await sequelize.query(`select * from proj_beneficiary
   where proj_id="${project_id}" `,{type:Sequelize.QueryTypes.SELECT})
    try {
        if(proj_beneficiary.length>0&&schedule.length>0){
            res.render('reports/agreementProjectwise',{
                tolebikas:tb_info[0],
                members:tb_member,
                anugamansamiti,
                project:project[0],
                schedule,
                proj_beneficiary:proj_beneficiary[0]
            })
        }
        else{
            res.render('yojana/error/samjhautaprojerror',{
                tb_id,project_id
              })
        }
    } catch (error) {
      res.render('yojana/error/samjhautaprojerror',{
        tb_id,project_id
      })
    }

}

//get report of project done

exports.projectsDone=(req,res)=>{
sequelize.query(`select distinct * from tbproj tp 
left join tolebikas t where t._id=tp.tb_id
`,{type:Sequelize.QueryTypes.SELECT}).then(s=>{
res.send(s)
})
}
/* 
sequelize.query(`select * from budget_karykram where _id=:id`,{
       replacements:{id:_id},type:Sequelize.QueryTypes.SELECT
    })
*/
exports.exportexcel=(req,res)=>{

}


/*
exports.report=(req,res)=>{
       let report_sql=`select h_name,h_address,lat,lng,no_of_room,no_of_bed,image from hotel`
       const queryType={ 
        type:sequelize.QueryTypes.SELECT
    }
    
    sequelize.query(report_sql,queryType).then(succ=>{
        /* this line is only needed if you are not adding a script tag reference */
        /*
        if(typeof XLSX == 'undefined') XLSX = require('xlsx');
    
        /* make the worksheet */ /*
        console.log(succ)
        var ws = XLSX.utils.json_to_sheet(succ);
        
        /* add to workbook */ /*
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Hotels");
        
        /* generate an XLSX file */ /*
        XLSX.writeFile(wb, "public/hotels.xlsx");
        res.send('public/hotels.xlsx')
        }).catch(err=>{
            res.send({
                message:"error getting records"+err
            })
        })
       }
*/

exports.tippani_report= async (req,res)=>{
    const {project_id, tb_id }=req.params
    const tb_info=await sequelize.query(`select * from tolebikas
    where _id="${tb_id}" `,{type:Sequelize.QueryTypes.SELECT})
    const project=await sequelize.query(`select * from tbproj
    where _id="${project_id}" `,{type:Sequelize.QueryTypes.SELECT})
       try {
        //console.log(tb_info[0])
        //console.log(project[0])
        res.render('reports/tippani',{
            project_id, tb_id,
            tolebikas:tb_info[0],
            project:project[0],
            
        })
    } catch (error) {
      res.send("error getting tippani report")  
    } 
}

exports.karyades=async(req,res)=>{
    const {project_id, tb_id }=req.params
    const tb_info=await sequelize.query(`select * from tolebikas
    where _id="${tb_id}" `,{type:Sequelize.QueryTypes.SELECT})
    const project=await sequelize.query(`select * from tbproj
    where _id="${project_id}" `,{type:Sequelize.QueryTypes.SELECT})
  try {
    res.render('reports/karyades',{
        project_id, tb_id,
        tolebikas:tb_info[0],
        project:project[0],
        
    })
  } catch (error) {
    res.render('yojana/error/karyadeserror',{
        tb_id,project_id
    })
  }
}
