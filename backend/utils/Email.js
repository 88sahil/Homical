const nodemailer = require('nodemailer')
const ejs = require('ejs')
const {convert} = require('html-to-text')

const Email=class sendEmail{
    constructor(user,url){
        this.to=user.email,
        this.name=user.name.split(' ')[0],
        this.url = url
        this.from = process.env.sender_email
    }
    newTransporter(){
        return nodemailer.createTransport({
            host:process.env.email_host,
            port:process.env.email_port,
            auth:{
                user:process.env.email_user,
                pass:process.env.email_pass
            }
        })
    }
    async send(templete,subject){
        const html = await ejs.renderFile(`${__dirname}/../templete/${templete}.ejs`,{
            firstname:this.name,
            url:this.url,
            subject
        })
        const txt = convert(html,{
            wordwrap:180
        })
        const mailoption ={
            from:this.from,
            to:this.to,
            subject,
            html,
            text:this.url
        }
        await this.newTransporter().sendMail(mailoption)
    }
    async sendPasswordReset(){
        await this.send('Reset','your password Reser token')
    }
}
module.exports=Email