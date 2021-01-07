const mysql = require('mysql')
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"test"
})

connection.connect((err,res)=>{
    if(err) throw err
    console.log('connected')
    
    })
module.exports= connection