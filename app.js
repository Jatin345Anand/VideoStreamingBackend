const express = require('express');
// const ejslint = require('ejs-lint');
// const request = require('request');
const bodyparser = require('body-parser');
const app = express();
const gasRoute = require('./routes/indexRoute');
const CORS =  require('./utils/middlewares/cors');
const ejs = require('ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());
app.use(CORS);
app.use("/", gasRoute);

// const ejs = require('ejs');
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json());
// app.use(cors)
// app.use('/',gasRoute)
// app.set('view engine','ejs');
// ejslint.lint();
app.listen(3001,()=>{
    console.log(
     'Get Set Ready.. GO!!! '
    );
});