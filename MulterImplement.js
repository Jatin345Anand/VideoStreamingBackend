const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const bodyparser = require('body-parser');
const CRUDforGoogleDrive = require('./models/GoogleApisOperations');
// Set Storage Engine
const Storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// Init Upload
const upload = multer({
    storage: Storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');
const GoogleDrivesDetails = [
    {
        "jatin345anand@gmail.com":{"client_id":"221886488437-sk21jrm78p4o43s4p91lkq1t1k8iaona.apps.googleusercontent.com","project_id":"quickstart-1575102754813","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"KblB1LvF1Zyg85LAZa5KoLzl","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"] 
    }
    },
    {
        "javatomcat36@gmail.com":{"client_id":"142434681406-0h69iinrf7kg14qfturdc0sm8sqtpttf.apps.googleusercontent.com","project_id":"quickstart-1575267930855","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"nvOaMH5ICqiZCobZXZAL18Fa",
        "redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}
    },
    {
        "javascriptangular36@gmail.com":{"client_id":"935829242553-lnnkbjc7p41njkrbu5fmlj3hqa00g6rg.apps.googleusercontent.com","project_id":"quickstart-1575268026610","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"x_3Q6Jk2EyHEnkZxu3bFrDht","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}
    }
];

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // const filetypes = /jpeg|jpg|png|pdf|java|csv|js|py/;
    // Check ext
    console.log('file is ',file);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime.
    const mimetype = filetypes.test(file.mimetype);
    console.log(' file type : ',filetypes,' extname ',extname,' mimetype ',mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }
    else{
        cb('Error : Images Only!');
    }
}
// Init App
const app = express();
// EJS

app.set('view engine', 'ejs');
// client view
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('index');
});
// body input
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.post('/delete',(req,res)=>{
console.log(' delete body',req.body);
// console.log('file',req.file);
if(req.body.read){
   Files = CRUDforGoogleDrive.ReadAllFiles();
   if(Files.length){
    console.log('in /delete',Files);
   }
   
//    console.log(typeof Files);
}
if(req.body.delete){
   CRUDforGoogleDrive.DeleteOneFile(req.body.fn,req.body.fid);
}
});
app.post('/upload', (req, res) => {
    // res.send('sent');
    console.log('req,body...');
    upload(req, res, (err) => {
        if (err) {
            console.log('Error occured',err);
            res.render('index',{
                msg:err
            });
        }
        else {
            console.log('File Sent')
            console.log(req.file);
            if(req.file == undefined){
                res.render('index',{
                    msg : "No File Selected"
                })
            }
            else{
                CRUDforGoogleDrive.UploadOneFile(req.file.filename);
                res.render('index',{
                    msg:'File Uploaded to Google Drive. Done!!',
                    file:`uploads/${req.file.filename}`
                })
            }
            // res.send('sent');
        }
    })
})
const port = 3002;
app.listen(port, () => {
    console.log(`Server has been Started on ${port}`);
});