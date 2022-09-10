export const smtp_config = {
    service: 'gmail',
    auth :{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    },
    port: 465,
    host: 'smtp.gmail.com'
}
