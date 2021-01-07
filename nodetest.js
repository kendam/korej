http = require('http');
url = require('url');
const readline = require('readline');
var uc = require('upper-case');
const nodemailer = require('nodemailer')
var express = require('express')
var app = express();
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

connection.query("select * from users",(err,res)=>{
    console.log(res)
})

fileServer = require('fs')


    const fileStream = fileServer.createReadStream('users.txt')

    const lineReader = readline.createInterface({
        input:fileStream

    })

    async function sendMail(){
        let sampleUser = await nodemailer.createTestAccount()
        let transporter = nodemmailer.createTransport({
            host:"smtp.ethereal.email",
            port:587,
            secure:false,
            auth:{
                user:sampleUser.user,
                pass:sampleUser.pass
    
            }
    
        });
    
        let info = await transporter.sendMail({
            from:'"Kenny"<kenny@me.com>',
            to:"kenny@ksolutionsng.com",
            subject:"Just a Test",
            text:'Hello',
            html:'<h3>Hello</h3>'
    
        })
    
        console.log(`message sent ${info.messageId}`)
    
    }
    //sendMail().catch(console.error)
    app.get('/me',(req,res)=>{
        res.send('Hello, this is all about me')
    })
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'text/html'})
    q = url.parse(req.url,true).query
    if(q.name!=undefined){
    jsonUser =q.name
    fileServer.appendFile('users.txt',`${jsonUser},\n`,(err,file)=>{
        if(err) throw err;
        console.log('file saved')

    })
}
userArray = []
lineReader.on('line',()=>{
    userObjec = {"name":q.name }
    userArray.push(userObjec)
})

    res.write(uc.upperCase('Hello'))
    res.end();
    console.log('listening at port 4500')
    
    

}).listen(4500)

