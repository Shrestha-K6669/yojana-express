
const path =require('path');
var multer  = require('multer');
const project_docs = require('../models/project_docs');

//var upload = multer({ dest: 'uploads' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploadY')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname).toLowerCase())
     //cb(null,file.originalname)
    }
  })
  const storageTBmember=multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploadTBmember')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname).toLowerCase())
     //cb(null,file.originalname)
    }
  })

  const storageProjectDocs=multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/ProjectDocs')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname).toLowerCase())
     //cb(null,file.originalname)
    }
  })

  const checkFileType =(file,cb)=>{
    const filetypes= /jpeg|jpg|png|gif|docx|xlsx|pdf|doc|application|vnd.openxmlformats-officedocument.spreadsheetml.sheet|vnd.openxmlformats-officedocument.wordprocessingml.document/;
    const extname = filetypes.test(path.extname(file.originalname));
    const mimetype= filetypes.test(file.mimetype)
    if(mimetype&&extname){
        return cb(null,true)
    }
    else{
        cb('files only')
    }
  }
  exports.upload= multer({
    storage:storage,
    limits:{fieldSize: 80 * 1024 * 1024},
    //uncomment below if you want to control file type for security purposes.
    /* fileFilter: (req,file,cb)=>{
        checkFileType(file,cb)
    }
    */
    
}).single("profilepic");

exports.upload1 = multer({
  storage:storage,
  limits:{fieldSize: 20 * 1024 * 1024},
  /*
  fileFilter: (req,file,cb)=>{
      checkFileType(file,cb)
  }
  */
}).fields([{name: "profilepic"}, {name: "img"}]);

exports.uploadtbmember=multer({
storage:storageTBmember,
limits:{fieldSize: 20 * 1024 * 1024},
}).fields([{name:"photo"},{name:"ctz_front"},{name:"ctz_back"}])

exports.uploadExcel=multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/excel')
    },
    filename: function (req, file, cb) {
      cb(null, 'uploaded-' + Date.now() + path.extname(file.originalname).toLowerCase())
    }
  }),
  limits:{fieldSize: 20 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    const allowedExt = /xlsx|xls|csv/;
    const allowedMime = /sheet|excel|csv|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|application\/vnd\.ms-excel/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExt.test(ext) || allowedMime.test(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only Excel files (.xlsx, .xls, .csv) are allowed'))
    }
  }
}).single('excelFile')

exports.uploadProjDoc=multer({
  storage:storageProjectDocs,
  limits:{fieldSize: 20 * 1024 * 1024},
  }).fields([{name:"doc"},{name:"pto"}])
  

/* 
exports.uploadFiles= multer({
    storage:storage,
    limits:{fieldSize: 80 * 1024 * 1024},
    //uncomment below if you want to control file type for security purposes.
    /* fileFilter: (req,file,cb)=>{
        checkFileType(file,cb)
    }
    */
  /*  
}).fields([{name:"ctz",maxCount:2},
{name:"cert",maxCount:30},
{name:"land",maxCount:20},
{name:"company",maxCount:20},
{name:"others",maxCount:30}]);
*/

 


