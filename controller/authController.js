
const bcrypt = require('bcrypt');
const userSchema = require('../models/authSchema');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_jwt_secret_key";

exports.registerUser = async (req, res) => {
    const { name, email, mobile, pass, role } = req.body;

    try {
        // Check if the email already exists
        const userEmail = await userSchema.findOne({ email });
        if (userEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(pass, 10);

        // Create new user data
        const userData = new userSchema({
            name,
            email,
            mobile,
            pass: hashedPassword,
            role: role || 'user',
        });

        // Save the user
        await userData.save();

        // Generate a JWT token
        const token = jwt.sign(
            { userId: userData._id, userEmail: userData.email, userName: userData.name, role: userData.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: "Register successful", token });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, pass } = req.body;

    try {
        // Find user by email
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        // Validate the password
        const isValidPassword = await bcrypt.compare(pass, user.pass);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role, userEmail: user.email, username: user.name },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the response
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Login unsuccessful", error: error.message });
    }
};

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
