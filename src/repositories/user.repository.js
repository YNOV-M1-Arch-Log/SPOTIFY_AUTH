import { User } from '../models/user.model.js';

export const userRepository = {
  findAll: async () => {
    return User.findAll();
  },

  findById: async (id) => {
    return User.findByPk(id);
  },

  findByEmail: async (email) => {
    return User.findOne({ where: { email } });
  },

  findByUsername: async (username) => {
    return User.findOne({ where: { username } });
  },

  create: async ({ username, email, password }) => {
    return User.create({ username, email, password });
  },

  update: async (user, data) => {
    return user.update(data);
  },

  delete: async (user) => {
    return user.destroy();
  },
};
