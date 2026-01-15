import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Follow from "../models/followModel.js";

export const createUser = async (req, res) => {
  try {
    const { userName, displayName, password, email } = req.body;

    if (!userName || !displayName || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      displayName,
      email,
      hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET_KEY
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const { hashedPassword: hp, ...userDetails } = newUser.toObject();

    res.status(201).json(userDetails);
  } catch (err) {
    res.status(400).json({ error: err?.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getOneUser = async (req, res) => {
  const { userName } = req.params;

  const user = await User.findOne({ userName });

  const { hashedPassword, ...userDetails } = user.toObject();

  const followerCount = await Follow.countDocuments({ following: user._id });
  const followingCount = await Follow.countDocuments({ follower: user._id });

  const token = req.cookies.jwt;

  if (!token) {
    return res.status(200).json({
      ...userDetails,
      followingCount,
      followerCount,
      isFollowing: false,
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (!err) {
        const isExists = await Follow.exists({
          follower: payload.userId,
          following: user._id,
        });
        return res.status(200).json({
          ...userDetails,
          followingCount,
          followerCount,
          isFollowing: isExists ? true : false,
        });
      }
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const { hashedPassword: hp, ...userDetails } = user.toObject();

    res.status(200).json(userDetails);
  } catch (err) {
    res.status(400).json({ error: err?.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logout successful" });
};

export const followUser = async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({ userName });
  const isFollowing = await Follow.exists({
    follower: req.userId,
    following: user._id,
  });

  if (isFollowing) {
    await Follow.deleteOne({
      follower: req.userId,
      following: user._id,
    });
  } else {
    await Follow.create({
      follower: req.userId,
      following: user._id,
    });
  }
  res.status(200).json({ message: "Successful" });
};
