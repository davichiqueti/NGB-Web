import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import { generateUserToken } from '../lib/utils/generateUserToken.js';


export const signup = async (req, res) => {
    try {
        const { full_name, username, email, password } = req.body;
        // Checking password lenght
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must have at least 6 characters" })
        }
        // Checking email pattern
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email_regex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        // Checking if username is alredy in use
        const existing_user = await User.findOne({ username: username });
        if (existing_user) {
            return res.status(400).json({ error: "Username is alredy in use" })
        }
        // Checking if email is alredy in use
        const existing_email = await User.findOne({ email: email });
        if (existing_email) {
            return res.status(400).json({ error: "Email is alredy in use" })
        }
        // After all validations, creates user account
        const salt = await bcrypt.genSaltSync(10);
        const hashed_password = await bcrypt.hash(password, salt);
        const new_user = new User({
            full_name,
            username,
            email,
            password: hashed_password
        })
        if (new_user) {
            generateUserToken(new_user._id, res)
            await new_user.save();
            // Updating response data
            res.status(201).json({
                user_id: new_user._id,
                message: `User ${username} created sucessfully.`
            })
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log(`Error in signup controller: "${error.message}"`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const valid_password = await bcrypt.compare(password, user.password);
        if(!user || !valid_password) {
            return res.status(400).json({ error: "Invalid Credentials" })
        }
        generateUserToken(user._id, res);
        res.status(201).json({
            user_id: user._id,
            message: `Logged as ${username} sucessfully.`
        })
    } catch (error) {
        console.log(`Error in login controller: "${error.message}"`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log(`Error in logout controller: "${error.message}"`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const authCheck = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json({user, message: "Authorized"});
    } catch (error) {
        console.log(`Error in authCheck controller: "${error.message}"`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Account deleted successfully"});
    } catch (error) {
        console.log(`Error in deleteAccount controller: "${error.message}"`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
