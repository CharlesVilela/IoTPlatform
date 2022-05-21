import nodemailer from 'nodemailer';

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "testeppoifpe2021@gmail.com",
                pass: "#Saranghae"
            }
        });

export default transporter;