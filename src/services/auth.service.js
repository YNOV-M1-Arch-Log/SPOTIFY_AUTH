import { userRepository } from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

export const authService = {
  register: async ({ username, email, password }) => {
    // Vérifier si l'email existe déjà
    const existingByEmail = await userRepository.findByEmail(email);
    if (existingByEmail) {
      const error = new Error('Email déjà utilisé');
      error.status = 409;
      throw error;
    }

    // Vérifier si le username existe déjà
    const existingByUsername = await userRepository.findByUsername(username);
    if (existingByUsername) {
      const error = new Error('Nom d’utilisateur déjà utilisé');
      error.status = 409;
      throw error;
    }

    const passwordHash = await hashPassword(password);

    const user = await userRepository.create({
      username,
      email,
      password: passwordHash,
    });

    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { user, accessToken, refreshToken };
  },

  login: async ({ identifier, password }) => {
    // identifier = email ou username
    let user = await userRepository.findByEmail(identifier);

    if (!user) {
      user = await userRepository.findByUsername(identifier);
    }

    if (!user) {
      const error = new Error('Identifiants invalides');
      error.status = 401;
      throw error;
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      const error = new Error('Identifiants invalides');
      error.status = 401;
      throw error;
    }

    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { user, accessToken, refreshToken };
  },
};
