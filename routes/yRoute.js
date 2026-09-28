const express = require("express");
const router = express.Router();
//const webpush=require('web-push')
//const app=express()
const upload=require('../controllers/yuploader')
const yController=require("../controllers/yController")
const ECcontroller=require('../controllers/anugamansamiti')
//tolebikasmember
const tbMemberController=require('../controllers/tolebikasmember')
const tbProjController=require('../controllers/tbProject')
const budgetController=require('../controllers/budget')
const projBeneficiaryController=require('../controllers/projBeneficiary')
const projScheduleController=require('../controllers/projSchedule')
const projFiduController=require('../controllers/projFidu')
const projDocController=require('../controllers/projDoc')
const { requireAuth }=require('../middleware/auth')

router.use(requireAuth)

router.get('/y',yController.getYpage)
router.get('/tbForm',yController.getTBForm)

//router.get('/tbindex',yController.getTBaddindex)//prev
router.get('/importTolebikas',yController.readTB)
router.post('/addTolebikas',upload.upload1,yController.addToleBikas)

router.get('/tolebikas',yController.getPageTB)
router.post('/tolebikas',yController.postPageTB)

router.get('/tbEditForm/:id',yController.getTBEditForm)
router.post('/updateTB',yController.editTolebikas)
//delete tb
//chg
router.post('/deleteTB',yController.deleteTB)

//tolebikas info
router.get('/addTBRec/:id',tbMemberController.getTBaddindex)
//req from page: addTBindex::=>tolemember form
router.get('/addMemberForm/:id',tbMemberController.getTBMForm)
router.post('/addTBMember',upload.uploadtbmember,tbMemberController.addToleBikasMember)
router.get('/tbm/:id', tbMemberController.getTBM)
//import members of lavgrahi 
router.get('/importTBM',tbMemberController.readTBMember)
//tbmEditForm
router.get('/tbmEditForm/:id',tbMemberController.getTBMEditForm)
router.post('/updateTBM', tbMemberController.updateTBM)
router.get('/tbmEditDocsForm/:id',tbMemberController.getTBMDocsEditForm)
router.post('/updateTBMDocs',upload.uploadtbmember,tbMemberController.updateMemberDocs)
//delTBM
router.get('/delTBM/:id',tbMemberController.deleteTBM)
//evaluation committee
router.get('/addTBECmemberForm/:id',ECcontroller.getTBECForm)
router.post('/addTBEC',ECcontroller.addanugaman_samiti)
router.get('/tbec/:id', ECcontroller.getTBECM)
router.get('/tbeceditform/:id',ECcontroller.getTBECEditForm)
router.post('/tbecUpdate',ECcontroller.updateTBEC)
//delete
router.post('/delTBEC',ECcontroller.deleteTBECM)
//Project
router.get('/addProjform/:id',tbProjController.getProjForm)
router.post('/addProject',tbProjController.addtbproj)
router.get('/projects/:id',tbProjController.getprojects)
router.get('/delProj/:tb_id/:id',tbProjController.deleteProject)
router.get('/editProject/:tb_id/:id',tbProjController.getProjEditForm)
router.post('/updateProject', tbProjController.updateProject)

//budget
router.get('/import-budget',budgetController.readBudget)
router.get('/deleteAllBudget',budgetController.deleteAllBudgetItem)
router.get('/bk-form',budgetController.getBudgetForm)
router.get('/budgets',budgetController.getAllBudget)
router.post('/addNewBudget',budgetController.addbudget_karykram)
router.get('/delbk/:id',budgetController.deleteBK)

//project beneficiary
router.get('/Projbeneficiaryform/:id',projBeneficiaryController.beneficiaryForm)
router.post('/addProjBenef',projBeneficiaryController.addProjBeneficiary)
router.get('/delprojbeneficiary/:id', projBeneficiaryController.deleteProjBeneficiary)

//project schedules::

router.get('/ProjScheduleForm/:id', projScheduleController.projScheduleForm)
router.post('/addProjSchedule', projScheduleController.addProjSchedule)
router.get('/projschedules/:id', projScheduleController.getProjectSchedules)
router.get('/delProjSchedule/:id', projScheduleController.deleteProjSchedule)
router.get('/delSchedule/:id/:project_id', projScheduleController.deleteScheduleByID)

//project fidu
router.get('/addProjFidu/:id',projFiduController.projFiduForm)
router.post('/addProjFidu', projFiduController.addProjFidu)
router.get('/getProjFidu/:id', projFiduController.getProjFidu)
router.get('/delfidu/:project_id/:id',projFiduController.deleteProjFidu)

//project document

router.get('/projDocForm/:id', projDocController.projDocForm)
router.post('/addProjDoc',upload.uploadProjDoc, projDocController.addProjDocs)
router.get('/projectDocs/:id',projDocController.getProjectDocs)
router.get('/delProjDocs/:id', projDocController.deleteProjDocs)

//project index page

router.get('/projectIndex/:id', tbProjController.projectIndex)

module.exports=router

