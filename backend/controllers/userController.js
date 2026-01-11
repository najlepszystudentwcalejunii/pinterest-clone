import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const userInformation = req.body;
    const hashedPassword = await bcrypt.hash(userInformation.password, 10);
    const newUser = await User.create({
      ...userInformation,
      hashedPassword,
    });

    res.status(201).json(newUser);
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

  res.status(200).json(userDetails);
};
