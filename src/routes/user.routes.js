import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const router = Router();

router.post('/', userController.createUser); //A PROTEGER PAR UNE ROUTE ADMIN
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
