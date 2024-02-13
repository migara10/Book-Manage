import userModel from "../models/user.model.js"; // import user model
import bcrypt from "bcrypt"; // import password encorder

const userNameExist = (userName) => {
  return userModel.findOne({ userName }).exec();
};

const emailExist = (email) => {
  return userModel.findOne({ email }).exec();
};

const hashPassword = async (password) =>{
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
  }

const registerUser = async (req, res) => {
  try {
    const { userName, password, email, firstName, address } = req.body;

    // check username already exist
    const existingUser = await userNameExist(userName);
    if (existingUser) {
      return res.status(409).json({ error: "User is already exists." });
    }

    // check email already exist
    const existingEmail = await emailExist(email);
    if (existingEmail) {
      return res.status(409).json({ error: "Email is already in use." });
    }

    const hashedPassword = await hashPassword(password);// hash password

    const newUser = new userModel({
      userName,
      password: hashedPassword,
      email,
      firstName,
      address,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(200).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

  

export default {
  registerUser,
};
