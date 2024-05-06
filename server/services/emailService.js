const nodemailer = require('nodemailer');

async function sendEmail(email,subject,text){
    return new Promise((resolve,reject)=>{
        let resetCode = "123456";
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
              user: "adghalshop@gmail.com",
              pass: "xsmtpsib-9d2cc69afef80a28d4e3e66f3e749a0c6c78215f0e9c27edd3d2a2455080ffa6-VSq5NYrcQKv7wZ3h", // generated ethereal password
            },
          });
          
          var mailOptions = {
            from: '"Adghal" contact@adghal.com',
            to: email,
            subject: subject,
            html: text,
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                reject(error)
            } else {
                resolve("done")
            }
          });          
    })
}
module.exports = {
    sendEmail
}