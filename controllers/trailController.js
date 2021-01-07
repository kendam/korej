var connection = require('../models/db')

var auditTrail=()=>{

}
auditTrail.logTrail=(trail)=>{
    connection.query(`insert into trail(actor,action,type) values('${trail.actor}','${trail.action}','${trail.type}')`,(err,resp) =>{
        if(err){
            console.log(err)
            return new Error(err)
           

        }
    })
   

}

module.exports=auditTrail

