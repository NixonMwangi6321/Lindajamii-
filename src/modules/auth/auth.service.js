const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const User =
require("./user.model");

const register =
async (data) => {

  const existingUser =
  await User.findOne({
    email: data.email.toLowerCase()
  });

  if (existingUser) {
    throw new Error(
      "Email already registered"
    );
  }

  const hashedPassword =
  await bcrypt.hash(
    data.password,
    10
  );

  const user =
  await User.create({

    fullName:
    data.fullName,

    email:
    data.email.toLowerCase(),

    password:
    hashedPassword,

    role:
    data.role || "CITIZEN"

  });

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role
  };

};

const login =
async (
  email,
  password
) => {

  const user =
  await User.findOne({
    email: email.toLowerCase()
  });

  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }

  if (!user.active) {
    throw new Error(
      "Account is disabled"
    );
  }

  const validPassword =
  await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    throw new Error(
      "Invalid email or password"
    );
  }

  user.lastLogin =
  new Date();

  await user.save();

  const token =
  jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h"
    }
  );

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
  };

};

module.exports = {
  register,
  login
};