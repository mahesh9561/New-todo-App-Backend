const User = require('../models/authSchema');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

exports.getUserProfile = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID",
        });
    }

    try {
        const user = await User.findById(id); // Use lowercase `user` for the result
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user, // Use lowercase `user` here
        });
    } catch (error) {
        console.error("Error fetching User:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch User",
            error: error.message,
        });
    }
};
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id; // Use ID from route params
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const updates = req.body;

        // Ensure sensitive fields like password are hashed properly
        if (updates.pass) {
            updates.pass = await bcrypt.hash(updates.pass, 10);
        }

        // Perform the update
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validators are run
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove sensitive data before sending the response
        const { pass, ...userWithoutPassword } = updatedUser.toObject();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: userWithoutPassword,
        });
    } catch (error) {
        console.error("Error updating profile:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
};
