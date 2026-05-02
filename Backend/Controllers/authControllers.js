
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "missing details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  // sending email
const mailOptions = {
  from: process.env.SENDER_EMAIL,
  to: email,
  subject: "Welcome to Ftech!",
  text: `Hi ${name},\n\nThank you for registering at Ftech. We're excited to have you on board!\n\nBest regards,\nThe Ftech Team`,
}
console.log("Sending to:", email);
await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: name,
        email: email,
      },
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
// login api

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "missing details" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "invalid credentials" });
    }
// check if the user password match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "login successful",
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({
    success: true,
    message: "logged out successfully",
  });
};

// send verification otp to user email

export const sendVerifyOtp = async (req, res)=>{
try{
  const {userId} = req.body // get user id from body
  const user= await userModel.findById(userId) // find user by id
  if(user.isAccountVerified){
    return res.json({success: false, message: "account already verified"})
  }
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.verifyOtp = otp
  user.verifyOtpExpiryAt = Date.now() + 10 * 60 * 1000 // otp expires in 10 mins
  await user.save()
  console.log(`Generated OTP for user", user.email, "OTP:", ${otp}`);
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Your Account Verification OTP",
    text: `Hi ${user.name},\n\nYour verification OTP is: ${otp}\n\nThis OTP will expire in 10 minutes.`

  }
  await transporter.sendMail(mailOptions);
  res.json({success: true , message: `OTP sent to your email ${user.email}`})
}catch(error){
  res.json({success: false, message: error.message})
}
}
// verify email using otp 
export const verifyEmail = async (req, res)=>{
const {userId, otp} = req.body;
if(!userId || !otp){
  return res.json({success: false, message: "missing details"})
}
try{
const user = await userModel.findById(userId)
if(!user){
  return res.json({success:false, message: 'user not found'})
}

if(user.verifyOtp === '' || user.verifyOtp !== otp ){
  return res.json({success: false , message:'invalid otp'})
}
if(user.verifyOtpExpiryAt < Date.now()){
  return res.json({success: false, message:'otp expired'})
}
user.isAccountVerified = true
user.verifyOtp='';
user.verifyOtpExpiryAt= 0;

await user.save();
return res.json({success: true, message:'email verified successfully '})
}catch(error){
  return res.json({success: false, message: error.message})
}


}

// ceck if user is authenticated or not

export const isAuthenticated = async (req, res) =>{
    try{
res.json({success: true, message: "user is authenticated"})
    }catch(error){
      res.json({success: false, message: error.message})
    }
}

// reseto password otp generator
export const sendResetOtp = async (req, res) =>{
  const {email} = req.body;

  if(!email){
    return res.json({success: false, message: "email is required"})
  }
  try{
const user = await userModel.findOne({ email })
if(!user){
  return res.json({success: false, message: "user not found"})
}


 const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.resetOtp = otp
  user.resetOtpExpiryAt = Date.now() + 15 * 60 * 1000 // otp expires in 15 mins
  await user.save() // save otp and expiry time to user document
  console.log("Reset OTP sent to:", user.email, `OTP: ${otp}` );
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Your Account Reset OTP",
    text: `Hi ${user.name},\n\nYour reset OTP is: ${otp}\n\nThis OTP will expire in 10 minutes.`

  }
  await transporter.sendMail(mailOptions);
  return res.json({success: true, message: `reset OTP sent to your email ${user.email}`})
  

  }
  catch(error){
    return res.json({success: false, message: error.message})
  }
}


// reset password using otp

export const resetPassword = async (req,res) =>{
  const {email, otp, newPassword} = req.body;
  if(!email || !otp || !newPassword){
    return res.json({success: false, message: "missing details"})
  }
  try{
const user = await userModel.findOne({email});
if(!user){

  return res.json({success: false, message: "user not found"})
}

if(user.resetOtp === '' || user.resetOtp !== otp){
  return res.json({success: false, message: "invalid otp"})
}

if(user.resetOtpExpiryAt < Date.now()){
  return res.json({success: false, message: "otp expired"})
}
const hashedPassword = await bcrypt.hash(newPassword, 10);
user.password = hashedPassword;
user.resetOtp = '';
user.resetOtpExpiryAt = 0;
await user.save();
return res.json({success: true, message: "password reset successful"})
}catch(error){
    return res.json({success: false, message: error.message})
  }
}