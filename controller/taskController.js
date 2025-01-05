const Task = require('../models/taskSchema');
const mongoose = require('mongoose');

// Add a new task
exports.addTask = async (req, res) => {
    const { title, description, priority, dueDate } = req.body;

    try {
        const existingTask = await Task.findOne({ title });
        if (existingTask) {
            return res.status(400).json({
                success: false,
                message: "A task with this title already exists. Please choose a different title.",
            });
        }

        // Create a new task
        const task = new Task({ title, description, priority, dueDate });
        const result = await task.save();

        res.status(201).json({
            success: true,
            message: "Task saved successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error adding task:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to save task",
            error: error.message,
        });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, dueDate } = req.body;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Task ID",
        });
    }

    try {
        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                ...(title && { title }),
                ...(description && { description }),
                ...(priority && { priority }),
                ...(dueDate && { dueDate }),
            },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask,
        });
    } catch (error) {
        console.error("Error updating task:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to update task",
            error: error.message,
        });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Task ID",
        });
    }

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: deletedTask,
        });
    } catch (error) {
        console.error("Error deleting task:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to delete task",
            error: error.message,
        });
    }
};

// View all tasks
exports.viewTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks,
        });
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks",
            error: error.message,
        });
    }
};

// View a single task
exports.viewSingleTask = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Task ID",
        });
    }

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            data: task,
        });
    } catch (error) {
        console.error("Error fetching task:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch task",
            error: error.message,
        });
    }
};
