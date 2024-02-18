import userModel from "../models/user.model.js"; // import user model
import bcrypt from "bcrypt"; // import password encorder
import config from "./../config.js";
import jwt from "jsonwebtoken";

let refreshTokens = [];

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
      return res.status(401).send({ message: "User is already exists." });
    }

    // check email already exist
    const existingEmail = await emailExist(email);
    if (existingEmail) {
      return res.status(401).send({ message: "Email is already use." });
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
    return res.status(500).send({ message: "Internal Server Error" });
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

/* const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await userNameExist(userName);

    if (!user) {
      return res.status(400).send({ message: "Valid User Not Found." });
    }

    // Compare password
    const isMatch = await compareHashPassword(password, user.password);

    if (isMatch) {
      const token = generateToken(user);
      const userWithoutPassword = { ...user.toObject(), password };
      return res.status(200).send({ message: "User login successfully.", token, user: userWithoutPassword, });
    } else {
      return res.status(400).send({ message: "Invalid Password." });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}; */

const generateToken = (user, key, time) => {
  const token = jwt.sign({ userId: user._id }, key, {
    expiresIn: time,
  });
  return token;
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await userNameExist(userName);

    if (!user) {
      return res.status(400).send({ message: "Valid User Not Found." });
    }

    // Compare password
    const isMatch = await compareHashPassword(password, user.password);

    if (isMatch) {
      const accessToken = generateToken(user, config.ACCESS_KEY, "10s");
      const refreshToken = generateToken(user, config.REFRESH_KEY, "20s");

      refreshTokens.push(refreshToken);
      const userWithoutPassword = { ...user.toObject(), password };
      return res.status(200).send({
        message: "User login successfully.",
        accessToken,
        refreshToken,
        user: userWithoutPassword,
      });
    } else {
      return res.status(400).send({ message: "Invalid Password." });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (refreshToken == null) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).send({ message: "Forbidden" }); // check refresh token already save in the server
    }
    jwt.verify(refreshToken, config.REFRESH_KEY, (err, user) => {
      if (err) {
        return res.status(403).send({ message: "Forbidden" });
      }
      const accessToken = generateToken(user, config.ACCESS_KEY, "10s");
      return res.status(200).send({ accessToken });
    });
  } catch (error) {}
};

export default {
  registerUser,
  loginUser,
  getToken,
};
