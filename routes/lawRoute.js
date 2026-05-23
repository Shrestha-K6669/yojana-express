const express = require("express");
const router = express.Router();
//const webpush=require('web-push')
//const app=express()
const upload=require('../controllers/fileUploader')
const lawController=require("../controllers/lawController")
const { requireAuth }=require('../middleware/auth')

//add
router.post('/addLawType',requireAuth,lawController.addKanunType)
router.post('/addLaw',requireAuth,upload.upload1,lawController.addLaw)
//router.post("/addProfile",upload.uploadFiles,profileController.profileEntry);


//router.get('/deleteReln/:id',profileController.deleteReln)
//getting forms=> post method
//router.post('/documentForm',profileController.documentForm)
//get
router.get('/',lawController.indexHome)
router.get('/laws',requireAuth,lawController.getLaws)
router.get('/lawTypeForm',requireAuth,lawController.getLawTypeForm)
router.get('/lawForm', requireAuth, lawController.getLawForm)
router.get('/lawEditForm/:id',requireAuth,lawController.getLawEditForm)
router.post('/viewFile',requireAuth,lawController.viewFile)

router.post('/lawsPage',requireAuth,lawController.getPageLaws)

router.get('/lawTypes',requireAuth,lawController.getLawTypes)

//update law name
router.post('/updateLaw',requireAuth,lawController.updateLawName)
//delete
router.post('/deleteKanun',requireAuth,lawController.deleteLaw)
router.get('/deleteLawType/:id',requireAuth,lawController.deleteLawType)
/*
for laws access to public
*/
router.get('/lawsGen',lawController.getGeneralLaws)
router.post('/lawsPageGen',lawController.getGeneralPageLaws)

//router.get('/getHouse',profileController.getHouses) 
module.exports=router
