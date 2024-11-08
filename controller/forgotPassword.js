import {
  forgotPasswordSVC,
  userTokenSVC,
  obtainTokenUserSVC,
  updatePasswordSVC,
} from '../services/forgotPassword.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

export const forgotPasswordCTL = async (req, res) => {
  const bodyParams = req.body;

  const verifyEmail = await forgotPasswordSVC(bodyParams.email);

  if (!verifyEmail) return res.status(401).send('Email Incorrecto'); //401 Unauthorized

  const resetToken = crypto.randomBytes(32).toString('hex');
  const token = await userTokenSVC(bodyParams.email, resetToken);

  const link = `http://localhost:5173/changepassword/${resetToken}`;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'smartswapsip@gmail.com',
      pass: 'errz tzzp rija oxkn',
    },
  });

  var mailOptions = {
    from: 'smartswapsip@gmail.com',
    to: bodyParams.email,
    subject: 'Cambiar Contraseña Smart Swap',
    html: `
                <p>Ingresa al siguiente link para cambiar tu contraseña:</p>
                <p>${link}</p>
                `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).send('Error al enviar el correo: ' + error.message);
    } else {
      return res.status(200).send('Correo enviado: ' + info.response);
    }
  });
};
export const changePasswordCTL = async (req, res) => {
  const token = req.params.token;
  const password = req.body.password;

  const userId = await obtainTokenUserSVC(token);

  if (!userId) return res.status(498).send('User Not Found');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const update = await updatePasswordSVC(userId, hashPassword);

  if (update == 500) {
    return res.status(500).send();
  }

  return res.status(200).send();
};

// export const CambiarContraseñaCTL = async (req, res) => {

//     const bodyParams = req.body
//     const jwt = req.jwtData

//     const response = await CambiarContraseñaSVC(bodyParams.contra, jwt.userId)

//     if (!response) return res.status(204).send("User Not Found")

//     return res.send()
// }
