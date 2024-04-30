
import User from "../../../DB/user.model.js"
import { Op } from "sequelize"
// Function to get all users
export const getAllUsers = async (req, res, next) => {
    const users = await User.findAll(); // Finding all users in the database
    res.json({ message: 'Success', users }); // Returning success message along with the list of users
};

// Function to register a new user
export const signUp = async (req, res, next) => {
    const { name, email, password, age } = req.body; // Extracting user details from the request body

    // Checking if the provided email already exists in the database
    const isEmailCheck = await User.findOne({ where: { email } });
    if (isEmailCheck) {
        return res.json({ message: 'Email already exists' });
    }

    // Creating a new user with the provided details
    const newUser = await User.create({ name, email, password, age });
    if (newUser._options.isNewRecord) {
        return res.json({ message: 'User added successfully' });
    }
    return res.json({ message: 'Failed to add user' });
};

// Function to authenticate a user
export const signIn = async (req, res, next) => {
    const { email, password } = req.body; // Extracting email and password from the request body

    // Checking if a user with the provided email and password exists in the database
    const oldUser = await User.findAll({ where: { email, password } });
    if (!oldUser.length) {
        return res.json({ message: "Not allowed" });
    }
    return res.json({ message: "Login successful" });
};

// Function to update user information
export const update = async (req, res, next) => {
    const { id } = req.params; // Extracting user ID from the URL parameters
    const { name, email, age, password } = req.body; // Extracting updated user details from the request body

    // Finding the user by ID
    const user = await User.findByPk(id);
    if (!user) {
        return res.json({ message: "User not found" });
    }

    // Updating the user with the provided details
    const updateResult = await User.update({ name, email, age, password }, { where: { id } });
    if (!updateResult.length) {
        return res.json({ message: "Update failed" });
    }

    return res.json({ message: "Update successful" });
};

// Function to delete a user
export const Delete = async (req, res, next) => {
    const { id } = req.params; // Extracting user ID from the URL parameters

    // Finding the user by ID
    const user = await User.findByPk(id);
    if (!user) {
        return res.json({ message: "User not found" });
    }

    // Deleting the user from the database
    const deleteUser = await User.destroy({ where: { id } });
    if (!deleteUser) {
        return res.json({ message: "User not deleted" });
    }

    return res.json({ message: "User deleted successfully" });
};

// Function to search for users based on criteria
export const search_1 = async (req, res, next) => {
    // Searching for users under 30 years old and whose names start with 'a'
    const searchResult = await User.findAll({ where: { age: { [Op.lt]: 30 }, name: { [Op.like]: 'a%' } } });
    if (!searchResult.length) {
        return res.json({ message: "Search failed" });
    }
    return res.json({ message: "Search successful", searchResult });
};

// Function to search for users within a specific age range
export const search_2 = async (req, res, next) => {
    // Searching for users between the ages of 20 and 30
    const searchResult = await User.findAll({ where: { age: { [Op.between]: [20, 30] } } });
    if (!searchResult.length) {
        return res.json({ message: "Search failed" });
    }
    return res.json({ message: "Search successful", searchResult });
};

// Function to retrieve the top 3 users with the highest age
export const search_3 = async (req, res, next) => {
    // Retrieving the top 3 users with the highest age
    const searchResult = await User.findAll({ order: [['age', 'desc']], limit: 3 });
    if (!searchResult.length) {
        return res.json({ message: "Search failed" });
    }
    return res.json({ message: "Search successful", searchResult });
};

// Function to search for users by their IDs
export const search_4 = async (req, res, next) => {
    const { ids } = req.body; // Extracting user IDs from the request body

    // Searching for users with IDs provided in the request body
    const searchResult = await User.findAll({ where: { id: { [Op.in]: ids } } });
    if (!searchResult.length) {
        return res.json({ message: "Users not found" });
    }
    return res.json({ message: "Search successful", searchResult });
};



