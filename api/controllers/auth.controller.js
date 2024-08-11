import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
// import OTP from '../models/otp.model.js';
// import { sendEmail } from '../utils/sendEmail.js';

// let otpStore = {};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    isAdmin: false,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, 'The username is already in use. Please choose a different username.'));
    }
    next(error);
  }
}; 



// export const sendOtp = async (req, res, next) => {
//   const { email } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

//   // Store OTP temporarily in memory
//   otpStore[email] = otp;

//   // Send OTP via email
//   try {
//     await sendEmail(email, 'Your OTP Code', `Your OTP code is: ${otp}`);
//     res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     next(error);
//   }
// };

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    //  const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //  await OTP.create({ email, otp }); 
 
    //  await sendEmail(email, 'Your OTP Code', `Your OTP code is ${otp}`);
 
    //  res.status(200).json({ message: 'OTP sent to email' });

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// export const verifyOtp = (req, res, next) => {
//   const { email, otp } = req.body;

//   // Check OTP
//   if (otpStore[email] === otp) {
//     delete otpStore[email]; // Clear OTP after successful verification
//     const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });
//     res
//       .cookie('access_token', token, { httpOnly: true })
//       .status(200)
//       .json({ message: 'OTP verified, user signed in', token });
//   } else {
//     return next(errorHandler(400, 'Invalid OTP'));
//   }
// };

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
