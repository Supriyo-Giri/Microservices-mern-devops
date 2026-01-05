import express from 'express'
import { getAllUserController,createNewUserController,updateUserController,getUserByIdController,deleteUserController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/',getAllUserController)
router.post('/new',createNewUserController)
router.get('/:id',getUserByIdController)
router.post('/:id',updateUserController)
router.delete('/:id',deleteUserController)

export default router;