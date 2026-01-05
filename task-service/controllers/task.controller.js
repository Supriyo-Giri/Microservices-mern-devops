import { Task } from '../models/task.model.js'

export const createTaskController = async (req, res) => {
  console.log("Create task endpoint hit");

  try {
    const { title, description } = req.body;
    // const userId = req.user?.id;

    // validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    // if (!userId) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorized: user not found",
    //   });
    // }

    const task = await Task.create({
      title,
      description,
    });


    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.log(`Error creating task: ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllTasksController = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTaskByIdController = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
};