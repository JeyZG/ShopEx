const nodemailer= require("nodemailer")

const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "888e65af021898",
			pass: "46ec5d30278865"
		}
      });
    const mensaje={
        from: "ShopEx <noreply@shopex.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
    }

    await transport.sendMail(mensaje)
}

module.exports= sendEmail;