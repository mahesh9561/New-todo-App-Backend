const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = require('../models/authSchema');

// Fetch all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userSchema.find({}, '-pass');
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }

    try {
        const deletedUser = await userSchema.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser
        });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
};
