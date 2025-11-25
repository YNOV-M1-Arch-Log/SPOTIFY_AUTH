import Joi from 'joi';
import { userService } from '../services/user.service.js';

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(255),
}).min(1); // au moins un champ

export const userController = {
  // POST /users
  createUser: async (req, res, next) => {
    try {
      const { error, value } = createUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const user = await userService.createUser(value);

      return res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /users
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();

      const payload = users.map((u) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        createdAt: u.createdAt,
      }));

      return res.status(200).json(payload);
    } catch (err) {
      next(err);
    }
  },

  // GET /users/:id
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      next(err);
    }
  },

  // PUT /users/:id
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { error, value } = updateUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const updated = await userService.updateUser(id, value);

      return res.status(200).json({
        id: updated.id,
        username: updated.username,
        email: updated.email,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /users/:id
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      await userService.deleteUser(id);

      return res.status(204).send(); // pas de contenu
    } catch (err) {
      next(err);
    }
  },
};
