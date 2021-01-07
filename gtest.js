const nodemailer = require('nodemailer')



async function sendMail(){
    let sampleUser = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
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
sendMail().catch(console.error)
