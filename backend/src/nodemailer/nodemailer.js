import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// creer le transport
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 2525,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    logger: true, // <--- AJOUTEZ CECI
    debug: true   // <--- AJOUTEZ CECI
});

export const sendEmail = async (to, subject, htmlContent) => {
    if (!EMAIL_USER || !EMAIL_PASS) {
        console.error("EMAIL_USER ou EMAIL_PASS manquant. Impossible d'envoyer l'email.");
        throw new Error("Credentials for email service are missing.");
    }
    const mailOptions = {
        from: EMAIL_USER,
        to,
        subject,
        html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
};

export default transporter