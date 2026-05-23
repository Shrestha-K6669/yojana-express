const express = require("express");
const router = express.Router();
//const app=express()
const reportController=require("../controllers/reportController")
const { requireAuth }=require('../middleware/auth')

//router.get('/y',yController.getYpage)
router.use(requireAuth)

router.get('/agreement/:id',reportController.agreement)
router.post('/agreementProject',reportController.projectsAgreement)
router.get('/tippani/:project_id/:tb_id', reportController.tippani_report )
router.get('/karyades/:project_id/:tb_id', reportController.karyades)
module.exports=router

