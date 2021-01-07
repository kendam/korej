'use strict';
var db = require('./db')

var User = (user)=>{
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.age = user.age;
    this.city = user.city;
    this.email = user.email;
    this.password = user.password;

}

User.createUser = (newUser, result)=>{
    db.query("INSERT INTO users set ?", newUser,  (err, res) =>{
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
}

User.getAllUsers = (result)=>{
    db.query("Select * from tasks", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
          console.log('tasks : ', res);  

         result(null, res);
        }
    });   

}

module.exports = User