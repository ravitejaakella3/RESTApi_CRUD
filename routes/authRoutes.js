/**
 * User Routes for CRUD operations
 * @module routes/authRoutes
 */

const express = require("express");
const UserDetails = require("../models/UserDetails");

const router = express.Router();

/**
 * Create a new user
 * @route POST /api/createUser
 * @param {string} name.required - User's name
 * @param {string} email.required - User's email
 * @param {number} age.required - User's age
 */
router.post("/createUser", async(req, res) => {
    const {name, email, age} = req.body;
    
    // Input validation
    if (!name || !email || !age) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing required fields: name, email, and age are required'
        });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid email format'
        });
    }

    try {
        let existingUser = await UserDetails.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User with this email already exists'
            });
        }

        const user = new UserDetails({name, email, age});
        await user.save();

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: user
        });
    } catch (err) {
        console.error('Create user error:', err);
        res.status(500).json({
            status: 'error',
            message: err.message || 'Internal server error'
        });
    }
});

/**
 * Get all users
 * @route GET /api/users
 */
router.get("/users", async(req, res) => {
    try {
        const users = await UserDetails.find();
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (err) {
        console.error('Fetch users error:', err);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching users'
        });
    }
});

/**
 * Get user by ID
 * @route GET /api/users/:userID
 */
router.get("/users/:userID", async(req, res) => {
    const {userID} = req.params;
    try {
        const user = await UserDetails.findById(userID);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        console.error('Fetch user error:', err);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching user'
        });
    }
});

/**
 * Update user
 * @route PUT /api/users/:userID
 */
router.put("/users/:userID", async(req, res) => {
    const {userID} = req.params;
    const {name, email, age} = req.body;

    try {
        const user = await UserDetails.findById(userID);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Update only provided fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (age) user.age = age;

        await user.save();
        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: user
        });
    } catch (err) {
        console.error('Update user error:', err);
        res.status(500).json({
            status: 'error',
            message: err.message || 'Error updating user'
        });
    }
});

/**
 * Delete user
 * @route DELETE /api/users/:userID
 */
router.delete("/users/:userID", async(req, res) => {
    const {userID} = req.params;
    try {
        const user = await UserDetails.findById(userID);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        await UserDetails.findByIdAndDelete(userID);
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (err) {
        console.error('Delete user error:', err);
        res.status(500).json({
            status: 'error',
            message: 'Error deleting user'
        });
    }
});

module.exports = router;