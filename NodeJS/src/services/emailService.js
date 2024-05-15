require('dotenv').config()
import nodemailer from "nodemailer"

//
let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: 'Health Care Center',
        to: dataSend.receiveEmail, //list user send
        subject: "Xác nhận đăng ký",
        html: getBodyHTMLEmail(dataSend), 
    });
}

let getBodyHTMLEmail = (dataSend) => {
    
    
        let result =
        `
        <h3>Xin chào ${dataSend.userName}!</h3>
        <p>Bạn nhận muốn sử dụng dịch vụ tại Health Care Center. Hãy xác nhận đó là bạn bằng cách truy cập link bên dưới.</p>
        <div>link: ${dataSend.redirectLink}</div>
        `
    
    return result
}


//
let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            // let contentImg = `${dataSend.imageBase64}`
            // let fileName = `remedy-${dataSend.patientId}-${new Date().getTime()}`
            let info = await transporter.sendMail({
                from: 'Health Care Center',
                to: dataSend.email, //list user send
                subject: "Kết quả đặt lịch khám bệnh ✔",
                html: getBodyHTMLEmail(dataSend), 
                // attachments: [
                //     {   // encoded string as an attachment
                //         filename: `${fileName}.jpg`,
                //         content: contentImg.split("base64,")[1],
                //         encoding: 'base64'
                //     },
                // ]
            });
            resolve()
        } catch (e) {
            reject(e)
        }
    })
    
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
        `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên website Healthy Care thành công.</p>

            <div>Xin chân thành cảm ơn!</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
        `
            <h3>Hello ${dataSend.patientName}!</h3>
            <p>You are receiving this email because you have successfully booked an online medical appointment on the Healthy Care website.</p>
            <div>Sincerely thank!</div>
        `
    }
    return result
}

// 
let sendCodeEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: 'Health Care Center',
        to: dataSend.receiverEmail, //list user send
        subject: "Mã xác thực của bạn",
        html: getBodyHTMLEmailCode(dataSend), 
    });
}

let getBodyHTMLEmailCode = (dataSend) => {
    
    
    let result =
    `
    <p>Mã xác thực của bạn là: ${dataSend.codeVerify}</p>
    `

return result
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    getBodyHTMLEmail: getBodyHTMLEmail,
    sendAttachment: sendAttachment,
    getBodyHTMLEmailRemedy: getBodyHTMLEmailRemedy,
    sendCodeEmail: sendCodeEmail,
}