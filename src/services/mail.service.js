import axios from 'axios';
import { env } from "../config/env.js";

/**
 * Appelle le microservice SMTP pour envoyer une alerte de connexion par email
 * @param {string} to - Adresse email du destinataire
 */
export const sendAlertLogin = async (to) => {
  try {
    const response = await axios.post(`${env.smtpServiceUrl}/api/mail/alert-login`, {
      to,
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’email :', error.message);
    throw new Error('Échec de l’envoi de l’email');
  }
};
