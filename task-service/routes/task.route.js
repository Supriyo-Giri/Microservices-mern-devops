import express from 'express'
import { createTaskController, deleteTaskController, getAllTasksController, getTaskByIdController, updateTaskController } from '../controllers/task.controller.js';

const router = express.Router();

router.post("/new", createTaskController);
router.get("/", getAllTasksController);
router.get("/:id", getTaskByIdController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);


export default router;