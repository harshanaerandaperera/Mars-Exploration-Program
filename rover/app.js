const express = require('express');
const app = express();
const cors=require('cors');
const bodyParser=require('body-parser');

app.use(cors());//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000,function(){
    console.log("listening to port 3000 ");
});
app.get("/",function(req,res){
    res.send("You are connected to local host port 3000");
});
const createrover=require('./controller/createrover');
app.use("/createrover",createrover);

const controlrover=require('./controller/controlrover');
app.use("/controlrover",controlrover);

const developer=require('./controller/developer');
app.use("/developer",developer);

const discovermass=require('./controller/discovermass');
app.use("/discovermass",discovermass);

