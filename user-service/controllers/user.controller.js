import { User } from '../model/user.model.js'
import argon2 from 'argon2'

export const getAllUserController = async (req,res) => {
    try {
        console.log(`Get all user endpoint was hit...`)
        const allUser = await User.find({});
        if(allUser.length === 0){
            return res.status(400).json({
                success: false,
                message: "No users are present in the database"
            });
        }
        return res.status(200).json({
            success: true,
            allUser
        });
    } catch (error) {
        console.log(`Error in getAllUserController: ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

export const createNewUserController = async (req, res) => {
  try {
    console.log("Create new user endpoint hit");

    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    email = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });

    const newUser = await User.create({
      name: name.trim(),
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: newUser._id,
    });

  } catch (error) {
    console.error("Error in createNewUserController:", error);

    // Handle duplicate email race condition
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserByIdController = async (req, res) => {
  console.log(`Get user endpoint was hit...`)
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error in getUserByIdController:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateUserController = async (req, res) => {
  console.log(`update user endpoint was hit...`)
  try {
    const { id } = req.params;
    const { name, password } = req.body;

    const updateData = {};

    if (name) updateData.name = name.trim();

    if (password) {
      updateData.password = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateUserController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteUserController = async (req, res) => {
  console.log(`delete user endpoint was hit...`)
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteUserController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};