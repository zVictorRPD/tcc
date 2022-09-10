import nodemailer from "nodemailer";
import { smtp_config } from "../config/smtp";

const transporter = nodemailer.createTransport(smtp_config);

export async function sendEmailFunction(
    receiver: string[],
    title: string,
    message: string
) {
    
    return await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: receiver,
        subject: title,
        text: message,
    });
}
