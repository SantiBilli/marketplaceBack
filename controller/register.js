import { emailExistsSVC, registerBusinessSVC, registerClientSVC } from '../services/register.js';
import fs from 'fs';
import bcrypt from 'bcrypt';

export const registerClientCTL = async (req, res) => {
  const bodyParams = req.body;

  if (
    !bodyParams.name ||
    !bodyParams.surname ||
    !bodyParams.email ||
    !bodyParams.date ||
    !bodyParams.password
  )
    return res.status(400).send();

  const emailExists = await emailExistsSVC(bodyParams.email);

  if (emailExists == 500) return res.status(500).send();
  if (emailExists == 409) return res.status(409).send();

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(bodyParams.password, salt);

  const registerClient = await registerClientSVC(
    bodyParams.name,
    bodyParams.surname,
    bodyParams.email,
    bodyParams.date,
    hashPassword
  );

  if (registerClient == 500) return res.status(500).send();

  return res.status(201).send();
};

export const registerBusinessCTL = async (req, res) => {
  const bodyParams = req.body;

  if (!req.file || !bodyParams.name || !bodyParams.email || !bodyParams.description || !bodyParams.password)
    return res.status(400).send();

  const file = req.file;
  const logo = file.filename;

  const emailExists = await emailExistsSVC(bodyParams.email);

  if (emailExists == 500) return res.status(500).send();
  if (emailExists == 409) {
    fs.unlinkSync(`uploads/profilePhotos/${logo}`);
    return res.status(409).send();
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(bodyParams.password, salt);

  const registerBusiness = await registerBusinessSVC(
    bodyParams.name,
    bodyParams.email,
    logo,
    bodyParams.description,
    hashPassword
  );

  if (registerBusiness == 500) return res.status(500).send();

  return res.status(201).send();
};
