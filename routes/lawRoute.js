const express = require("express");
const router = express.Router();
//const webpush=require('web-push')
//const app=express()
const upload=require('../controllers/fileUploader')
const lawController=require("../controllers/lawController")
const { requireAuth, authorizeRoles }=require('../middleware/auth')
const adminOnly=[requireAuth, authorizeRoles('admin')]

//add
router.post('/addLawType',adminOnly,lawController.addKanunType)
router.post('/addLaw',adminOnly,upload.upload1,lawController.addLaw)
//router.post("/addProfile",upload.uploadFiles,profileController.profileEntry);


//router.get('/deleteReln/:id',profileController.deleteReln)
//getting forms=> post method
//router.post('/documentForm',profileController.documentForm)
//get
router.get('/',lawController.indexHome)
router.get('/laws',requireAuth,lawController.getLaws)
router.get('/lawTypeForm',adminOnly,lawController.getLawTypeForm)
router.get('/lawForm', adminOnly, lawController.getLawForm)
router.get('/lawEditForm/:id',adminOnly,lawController.getLawEditForm)
router.post('/viewFile',requireAuth,lawController.viewFile)

router.post('/lawsPage',requireAuth,lawController.getPageLaws)

router.get('/lawTypes',adminOnly,lawController.getLawTypes)

//update law name
router.post('/updateLaw',adminOnly,lawController.updateLawName)
//delete
router.post('/deleteKanun',adminOnly,lawController.deleteLaw)
router.get('/deleteLawType/:id',adminOnly,lawController.deleteLawType)
/*
for laws access to public
*/
router.get('/lawsGen',lawController.getGeneralLaws)
router.post('/lawsPageGen',lawController.getGeneralPageLaws)

//router.get('/getHouse',profileController.getHouses) 
module.exports=router
