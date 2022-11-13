const nodemailer= require("nodemailer")

const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        /*
        // Correo de MailTrap
        host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "888e65af021898",
			pass: "46ec5d30278865"
        */
        /*
        // Correo de Outlook
        host: "smtp.office365.com",
		port: 587,
		auth: {
			user: "shopexstore@outlook.com",
			pass: "jcysxwhoruawirin"
		}
        */
        // Correo de Gmail
        host: "smtp.gmail.com",
		port: 587,
		auth: {
			user: "innovedcol.1@gmail.com",
			pass: "egaaskzzrndqdoxw"
		}

      });
    const mensaje={
        // Correo de MailTrap
        // from: "ShopEx <noreply@shopexstore.com>",
        // Correo de Outlook
        // from: "ShopEx <shopexstore@outlook.com>",
        // Correo de Gmail
        from: "ShopEx <innovedcol.1@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
    }

    await transport.sendMail(mensaje)
}

module.exports= sendEmail;