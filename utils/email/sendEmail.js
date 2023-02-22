import nodemailer from 'nodemailer';
import emailBody from './emailBody.js';

//used in User Model before encrypting password
const sendMail = async ({ receiver, name }) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'xyz.hotel.kadana@gmail.com',
      pass: 'cszdnxumjugokhss',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Duothan3.0_IEEE" <xyz.hotel.kadana@gmail.com>', // sender address
    to: receiver, // list of receivers
    subject: 'Duothan3.0_IEEE', // Subject line
    text: 'Hello world?', // plain text body
    html: emailBody({ name }), // html body
  });
};

export default sendMail;
