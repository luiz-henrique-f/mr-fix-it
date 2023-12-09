const nodemailer = require('nodemailer')

export async function POST(request: Request) {
    const req = await request.json();
    
    const { email, nome, data_fim } = req;

    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        from: process.env.EMAIL,
    });

    await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: `Olá, ${nome}`, // Subject line
        text: `O seu plano vence no dia ${data_fim}, atualize seu plano. Equipe Mr. Fix It`, // plain text body
        html: `<p>O seu plano vence no dia ${data_fim}, atualize-o e continue em nossa plataforma</p><p><b>Equipe Mr. Fix It.</b><p>`, // html body
    });
}