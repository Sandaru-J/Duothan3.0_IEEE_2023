import User from '../models/User.js';

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    contactNo,
    licenseNo,
    operatingHours,
    owner,
    website,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !address ||
    !contactNo ||
    !licenseNo ||
    !operatingHours ||
    !owner ||
    !website
  ) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
      address,
      contactNo,
      licenseNo,
      operatingHours,
      website,
      owner,
    });
    const token = await user.createToken();
    const resUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      contactNo: user.contactNo,
      licenseNo: user.licenseNo,
      owner: user.owner,
      token,
    };
    res.status(201).json({ user: resUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  try {
    const user = await User.findOne({ email }, '+password');
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = await user.createToken();
    const resUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    };
    res.status(200).json({ user: resUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    const resUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      contactNo: user.contactNo,
      licenseNo: user.licenseNo,
      owner: user.owner,
    };
    res.status(200).json({ user: resUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({ message: 'Users do not exist' });
    }
    const resUsers = users.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        contactNo: user.contactNo,
        licenseNo: user.licenseNo,
        owner: user.owner,
      };
    });
    res.status(200).json({ users: resUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { register, login, getUser, getUsers };
