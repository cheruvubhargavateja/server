import { generateToken } from "../../libs/encryptAndDecryptToken.js";
import {
  hashPassword,
  verifyPassword,
} from "../../libs/hashAndVerifyPassword.js";
import Users from "../../schemas/user.model.js";

//Register user api
//path: http://localhost:4000/api/users/register

export async function register(req, res) {
  const { username, email, password, isAdmin } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "username, email, password cannot be empty",
      success: false,
    });
  }

  const exists = await Users.findOne({ email });

  if (exists) {
    return res.status(400).json({
      message: "Already registered with this email",
      success: false,
    });
  }

  const hashedPassword = await hashPassword(password);

  const users = new Users({
    username,
    email,
    password: hashedPassword,
    isAdmin,
  });

  try {
    await users.save();

    res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Intrnal server error",
      error: error.message,
      success: false,
    });
  }
}

//Login user function
//path: http://localhost:4000/api/users/login

export async function login(req, res) {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "email, password cannot be empty", success: false });
  }

  try {
    const loggedIn = await Users.findOne({ email: req.body.email });

    if (!loggedIn) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    const decryptedPassword = await verifyPassword(
      req.body.password,
      loggedIn.password
    );

    if (decryptedPassword) {
      const data = {
        userId: loggedIn._id,
        username: loggedIn.username,
        email: loggedIn.email,
        isAdmin: loggedIn.isAdmin,
      };
      const token = generateToken(data);

      res.cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      return res
        .status(200)
        .json({ message: "Successfully logged in", success: true, data });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
}

//Logout user function
//path: http://localhost:4000/api/users/logout

export async function logout(req, res) {
  try {
    res.cookie("token", "", { expires: new Date(0) });
    return res.status(200).json({
      message: "Successfully logged out!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
}

//get all users function
//path: http://localhost:4000/api/users
export async function getUsers(req, res) {
  try {
    const users = await Users.find();
    return res.status(200).json({
      message: "Successfully fetched users",
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
}
