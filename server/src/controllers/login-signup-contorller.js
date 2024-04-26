const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {generateToken} = require("../utils/jwt_validation");
const { TokenExpiredError } = require("jsonwebtoken");

// Signup controller
exports.signup = async (req, res) => {
  try {
    const user = req.body; // Assuming the rquest body contains the user data

    // Check for user credentials (emal/password validation)
    if (!user.email || !user.password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      return res
        .status(400)
        .send({ error: "User with this email already exists" });
    }

    // securing the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // save the user data into database
    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User data has been submitted successfully");

    // Generating  token
    const payload = {
      id: newUser.id,
      email: newUser.email,
    };

    const token = generateToken(payload);
    console.log("Token is: ", token);

    return res.set('Authorization', `Bearer ${token}`).status(200).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    return res
      .status(500)
      .send({ error: "An error occurred while submitting the form" });
  }
};

// Login controller
exports.login = async (req, res) => {
    
  // Define a method to compare passwords
  const comparePassword = async (password, hashedPassword) => {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
      throw err;
    }
  };

  try {
    // Extract useremail and password from the request body
    const { email, password } = req.body;

    // find the user by useemail
    const user = await User.findOne({ email: email }).select("+password");

    console.log({user})
    // Compare password, If user does not exists or password does not match, return err
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    // If authentication is successfull, Generate JWT token
    const token = generateToken({user});
    console.log("Token is: ", token);
   

    // Return success message and token
    res.status(200).send({ message: "Authentication successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
};
