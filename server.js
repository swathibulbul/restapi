const http=require("http");
const mysql=require("mysql");
const express=require("express");
const path=require("path");
const router=express.Router();
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
const methodOverride =require('method-override');



app.use(methodOverride('_method'));


app.use(bodyParser.urlencoded({

    extended: true

}));

router.get('/swa',function(req,res){
    req.sendFile(path.join(RESTAPI+'/get.html'));
    //__dirname : It will resolve to your project folder.
  });


/*
  router.post('/users', function (req, res) {
    //console.log(req.body);
    //res.send(req.body);
    req.sendFile(path.join(RESTAPI+'/post.html'));
  });
  */
//const pool = require('/config/db');
//var app=express();
//const bodyparser=require("body-parser");
 //app.use(bodyparser.json());
 var sqlconnection=mysql.createConnection({
    host: 'northside.in',
    user: 'shakir',
    password: 'shakir123',
    database: 'shakir_test'
 });
 sqlconnection.connect((err)=>{
    if(!err)
    console.log("success db connection");
    else
    console.log("db connection failed"+json.stringify(err,undefined,2));
 });
 app.listen(8080);
 console.log("listening the port");



 
 //get all the data
 app.get('/swa/all',(req,res)=>
 {
     sqlconnection.query('select*from swathi',(err,rows,fields)=>{
         if(!err)
         res.send(rows);
             })
 });

 // get only single id

 app.get('/swa',(req,res)=>
 {
    const id = req.query.id;
     sqlconnection.query('select * from swathi where id=?',id,(err,results)=>{
         if(err) throw err;

        
         res.send(results);
             });
 });


 


app.post('/post', function (req, res) {

    var postData = req.body;

    sqlconnection.query("INSERT INTO swathi SET id=?,`sname`=?",[req.body.id, req.body.sname], function (error, results, fields) {

        if (error) {

            res.end( + '<h2>ERROR: ID ALREADY EXISTS</h2>')

        }

        res.end( 'Record ' + [req.body.id] + ' has been Inserted!');



    });

});





app.put('/ideas/:id', (request, response) => {
    var  putdata= [request.body.id,request.body.sname];
 
    sqlconnection.query('UPDATE swathi SET sname=? WHERE id = ?',putdata, (error, result) => {
        if (!error) 
 
        response.send('User updated successfully.');
    });
});



// Delete a user
app.delete('/ideas/:id', (request, response) => {
    var id = request.body.id;
 
    sqlconnection.query('DELETE FROM swathi WHERE id = ?', request.body.id, (error, result) => {
        if (error) throw error;
 
        response.send('User deleted.');
    });
});
