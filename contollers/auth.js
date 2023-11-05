import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
  const { name, surname, email, password } = req.body;
  if(!name || !surname || !email || !password) {
    return res.status(401).json({message: 'Please provide valid credentials'});
  }
  try {
    const isSignedUp = await User.findOne({ email });
    if (isSignedUp) {
      return res.status(400).json({ error: 'User already exists', reason: "user" });
    }
    const salt = bcrypt.genSaltSync(10);
    console.log(salt);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log("hashedPassword", hashedPassword);
    const newUser = new User(
      {name, surname, email, password: hashedPassword}
    );
    await newUser.save();    
    const token = jwt.sign({id: newUser._id}, process.env.SECRET_KEY);
    const { userPassword, ...other } = newUser._doc;
    return res.status(200).json({
      token,
      user: other,
      message: "user has been created"
    })
    console.log(3);
  } catch(err) {
    return res.status(404).json({ message: "Something went wrong"});
  }
}

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ error: 'Please provide name and password', reason: "email"});
    }
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(401).json({ error: 'User does not exist', reason: "user"});
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if(!checkPassword) {
      return res.status(401).json({ error: 'Wrong password', reason: "password"});
    }
    const token = jwt.sign({id: user._id, }, process.env.SECRET_KEY);
    const { userPassword, ...other } = user._doc;
    res.status(200).json({user: other, token});
  } catch(error) {
    next(error);
    console.log(error);
  }
}