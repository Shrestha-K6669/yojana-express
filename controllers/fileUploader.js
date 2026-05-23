
const path =require('path');
var multer  = require('multer');

//var upload = multer({ dest: 'uploads' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
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
    
}).single("img");

exports.upload1 = multer({
  storage:storage,
  limits:{fieldSize: 100 * 1024 * 1024},
  fileFilter: (req,file,cb)=>{
      checkFileType(file,cb)
  }
}).fields([{name: "k_file_pdf"}, {name: "k_file_word"}]);

exports.uploadFiles= multer({
    storage:storage,
    limits:{fieldSize: 80 * 1024 * 1024},
    //uncomment below if you want to control file type for security purposes.
    /* fileFilter: (req,file,cb)=>{
        checkFileType(file,cb)
    }
    */
    
}).fields([{name:"ctz",maxCount:2},
{name:"cert",maxCount:30},
{name:"land",maxCount:20},
{name:"company",maxCount:20},
{name:"others",maxCount:30}]);

  //module.exports= upload;


/*
upload.array('photos',12)
req.files is array of `photos` files.

form should be enctype="multipart/form-data" 
const cpUpload=upload.fields([{name:'avatar',maxCount:1}, {name:'gallery', maxCount:16}])
req.files['avatar'][0]-> file
req.files['gallery']-> Array

to input multiple file.
<input type="file" id="myFile" name="myFile" multiple>
*/


