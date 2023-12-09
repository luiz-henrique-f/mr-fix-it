import { config } from "../../../config";


const nodemailer = require('nodemailer')
// const config = require('../../lib/config')

export async function POST(request: Request) {
    const req = await request.json();
    
    const { email, nome, data_fim } = req;

    console.log(config.EMAIL)

    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: config.EMAIL,
            pass: config.PASSWORD,
        },
        from: config.EMAIL,
    });

    await transporter.sendMail({
        from: config.EMAIL, // sender address
        to: email, // list of receivers
        subject: `Olá, ${nome}`, // Subject line
        text: `O seu plano vence no dia ${data_fim}, atualize seu plano. Equipe Mr. Fix It`, // plain text body
        html: `<p>O seu plano vence no dia ${data_fim}, atualize-o e continue em nossa plataforma</p><p><b>Equipe Mr. Fix It.</b><p>`, // html body
    });
}