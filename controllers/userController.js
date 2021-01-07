'use strict'
module.exports =(app)=>{
    console.log('in user controller')
var connection = require('../models/db')
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken')
process.env.ACCESS_TOKEN_SECRET;

app.get('/users',authenticate, (req,resp)=>{
    console.log('getting users')
    console.log(req.user)
    connection.query("select * from users inner join user_role on users.id=user_role.userId",(err,res)=>{
        resp.send(res)
        
    })
    
})
app.get('/users/:id', (req,resp)=>{
    connection.query("select * from users",(err,res)=>{
        resp.send(req.params.id)
        console.log(req.params.id)
    })
    
})

app.post('/login',(req,res)=>{
    connection.query(`select * from users where email='${req.body.email}'`,(err,resp)=>{
        if(err){
            res.send('Invalid credential')
        }
        console.log(req.body.email)
        if(resp){

            bcrypt.compare(req.body.password, resp[0].password, function(err, ress) {
                if(res) {
                    delete resp[0].password

                    let payload = {data: resp[0]}

                    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                        algorithm: "HS256",
                        expiresIn: process.env.ACCESS_TOKEN_LIFE
                    })
                    res.send(accessToken)
                    console.log('welcome my brother')
                } else {
                    trailObject= {
                        actor:'anonymous',
                        action:`anonymous user with ${req.body.email} attempt login but failed `,
                        type:'danger'

                    }
                    auditManager.logTrail(trailObject)
                    res.send('Invalid credential 2')
                } 
              });
   
    }
    })
})

app.post('/user',(req,res)=>{
   console.log(req.body.name)
   bcrypt.hash(req.body.password, 10, function(err, hash) {
       if(err) throw err
    connection.query(`insert into users (firstName,lastName,lastLogin,age,city,email,password) values('${req.body.firstName}','${req.body.lasttName}','${req.body.lastLogin}','${req.body.age}','${req.body.city}','${req.body.email}','${hash}')`,(err,resp)=>{
        if(err)
          {
             
              res.send(err.sqlMessage)
          }
         
         res.send('User successfully created ')
 
     })
 
  });
})
 function authenticate(req,res,next){
     const token = req.headers['authorization']

     if(token==null) return res.status(401).send("You have not been authenticated")
    
     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{

        if(err){
            return res.status(403).send(err)
        }
        req.user = user
        next()
     })
    
    }

};