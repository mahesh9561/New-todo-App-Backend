const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: [true, "Task priority is required"],
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
