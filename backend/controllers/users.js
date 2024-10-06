import User from "../models/user.js"
import Notification from "../models/notification.js"
import bcrypt from "bcryptjs";
import { validateEmail } from "../lib/utils/validateEmail.js";


export const getUserProfile = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({username}).select("-password");
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(`Error in getUserProfile controller: "${error.message}"`);
        res.status(500).json({error: `Internal Server Error: "${error.message}"`});
    }
}

export const getSuggestedProfiles = async (req, res) => {
    try {
        // Creating array of users to ignore. With users alredy followed and the current user
        const ignored_users = req.user.following;
        ignored_users.push(req.user._id);
        // Selecting from MongoDB
        const suggested_users = await User.aggregate([
            {
                $sample: {size: 5}              // Setting sample number
            },            
            {
                $match: {
                    _id: {$nin: ignored_users}  // Applying users filter
                }
            }
        ])
        // Filtering out passwords from objects for security
        suggested_users.forEach(user => user.password=null);
        res.status(200).json(suggested_users);
    } catch (error) {
        console.log(`Error in getSuggestedProfiles controller: "${error.message}"`);
        res.status(500).json({error: `Internal Server Error: "${error.message}"`});
    }
};

export const toggleFollowUser = async (req, res) => {    const {username} = req.params;
    try {
        const target_id = req.params.user_id;
        if (target_id == req.user._id) {
            return res.status(400).json({ error: "Can't follow/unfollow yourself"});
        }
        // Finding Users models
        const target_user = await User.findById(target_id).select("-password");
        const user = await User.findById(req.user._id).select("-password");
        if (!target_user){
            return res.status(400).json({ error: "User not found" });
        }
        // Logic to toggle following
        let message;
        if (user.following.includes(target_id)) {
            // Unfollow
            await User.findByIdAndUpdate(target_id, { $pull: { followers: user.id}});
            await User.findByIdAndUpdate(user.id, { $pull: { following: target_id}});
            message = `User "${target_user.username}" unfollowed successfully`;
        } else {
            // Follow
            await User.findByIdAndUpdate(target_id, { $push: { followers: user.id}});
            await User.findByIdAndUpdate(user.id, { $push: { following: target_id}});
            // Creating follow notification
            const notification = new Notification({
                type: "follow",
                from: user.id,
                to: target_id
            })
            await notification.save();
            user.password = null; // Only removing password from response
            message = `User "${target_user.username}" followed successfully`;
        }
        res.status(200).json({ user_id: target_id, message: message});
    } catch (error) {
        console.log(`Error in toggleFollowUser controller: "${error.message}"`);
        res.status(500).json({error: `Internal Server Error: "${error.message}"`});
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        const { full_name, email, username, current_password, new_password, bio, profile_img, cover_img } = req.body;
        // Password update
        if ((new_password && !current_password) || (!new_password && current_password)){
            return res.status(400).json({ error: "Please provide both current password and new password" });
        }
        if (current_password && new_password) {
            const valid_password = await bcrypt.compare(current_password, user.password);
            if (!valid_password) {
                return res.status(400).json({ error: "Current password incorrect" });
            }
            if (new_password.length < 6) {
                return res.status(400).json({ error: "New password must have at least 6 characters" })
            }
            // Updating password after all validations
            const salt = await bcrypt.genSaltSync(10);
            user.password = await bcrypt.hash(new_password, salt);
        }
        // Email update
        if (email) {
            if (!validateEmail(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }
            user.email = email;
        }
        // Updating other fields
        user.username = username || user.username;
        user.full_name = full_name || user.full_name;
        user.bio = bio || user.bio;
        user.profile_img = profile_img || user.profile_img;
        user.cover_img = cover_img || user.cover_img;
        // Saving and returning updated data
        user = await user.save();
        user.password = null; // Removing password from response
        return res.status(200).json({ message: "User updated successfully", user: user});
    } catch (error) {
        console.log(`Error in updateUserProfile controller: "${error.message}"`);
        res.status(500).json({error: `Internal Server Error: "${error.message}"`});
    } 
};