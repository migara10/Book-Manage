import userModel from "../models/user.model.js"; // import user model
import bcrypt from "bcrypt"; // import password encorder
import config from "./../config.js";
import jwt from "jsonwebtoken";

const userNameExist = (userName) => {
  return userModel.findOne({ userName }).exec();
};

const emailExist = (email) => {
  return userModel.findOne({ email }).exec();
};

const hashPassword = async (password) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
};

const registerUser = async (req, res) => {
  try {
    const { userName, password, email, firstName, address, role } = req.body;

    // check username already exist
    const existingUser = await userNameExist(userName);
    if (existingUser) {
      return res.status(401).send({ error: "User is already exists." });
    }

    // check email already exist
    const existingEmail = await emailExist(email);
    if (existingEmail) {
      return res.status(401).send({ error: "Email is already use." });
    }

    const hashedPassword = await hashPassword(password); // hash password

    const newUser = new userModel({
      userName,
      password: hashedPassword,
      email,
      firstName,
      address,
      role,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(200).send({ message: "User registered successfully." });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const compareHashPassword = (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, (error, passwordMatch) => {
      if (error) reject(error);
      resolve(passwordMatch);
    });
  });
};

const generateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await userNameExist(userName);

    if (!user) {
      return res.status(400).send({ error: "Valid User Not Found." });
    }

    // Compare password
    const isMatch = await compareHashPassword(password, user.password);

    if (isMatch) {
      const token = generateToken(user);
      console.log("Password matches. User logged in.");
      console.log("Generated Token:", token);
      const userWithoutPassword = { ...user.toObject(), password };
      return res.status(200).send({ message: "User login successfully.", token, user: userWithoutPassword, });
    } else {
      return res.status(400).send({ error: "Invalid Password." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export default {
  registerUser,
  loginUser,
};
