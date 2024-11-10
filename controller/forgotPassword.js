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

  if (verifyEmail == 404) return res.status(404).send();
  if (verifyEmail == 500) return res.status(500).send();

  const resetToken = crypto.randomBytes(32).toString('hex');
  const token = await userTokenSVC(bodyParams.email, resetToken);

  if (token == 500) return res.status(500).send();

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

  if (userId == 498) return res.status(498).send();
  if (userId == 500) return res.status(500).send();

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const update = await updatePasswordSVC(userId, hashPassword);

  if (update == 500) return res.status(500).send();

  return res.status(200).send();
};
