import { userRepository } from '../repositories/user.repository.js';
import { hashPassword } from '../utils/password.js';

export const userService = {
  // CREATE -> A PROTEGER PAR UNE ROUTE ADMIN
  createUser: async ({ username, email, password }) => {
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      const error = new Error('Email déjà utilisé');
      error.status = 409;
      throw error;
    }

    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
      const error = new Error("Nom d'utilisateur déjà utilisé");
      error.status = 409;
      throw error;
    }

    const passwordHash = await hashPassword(password);

    const user = await userRepository.create({
      username,
      email,
      password: passwordHash,
    });

    return user;
  },

  // READ ALL
  getAllUsers: async () => {
    const users = await userRepository.findAll();
    return users;
  },

  // READ ONE
  getUserById: async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('Utilisateur non trouvé');
      error.status = 404;
      throw error;
    }
    return user;
  },

  // UPDATE
  updateUser: async (id, data) => {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('Utilisateur non trouvé');
      error.status = 404;
      throw error;
    }

    // Unicité email
    if (data.email && data.email !== user.email) {
      const existingEmail = await userRepository.findByEmail(data.email);
      if (existingEmail && existingEmail.id !== user.id) {
        const error = new Error('Email déjà utilisé');
        error.status = 409;
        throw error;
      }
    }

    // Unicité username
    if (data.username && data.username !== user.username) {
      const existingUsername = await userRepository.findByUsername(data.username);
      if (existingUsername && existingUsername.id !== user.id) {
        const error = new Error("Nom d'utilisateur déjà utilisé");
        error.status = 409;
        throw error;
      }
    }

    // Hash du mot de passe si fourni
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    const updated = await userRepository.update(user, data);
    return updated;
  },

  // DELETE
  deleteUser: async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('Utilisateur non trouvé');
      error.status = 404;
      throw error;
    }

    await userRepository.delete(user);
    return;
  },
};
