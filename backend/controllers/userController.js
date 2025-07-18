import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const createToken =(id)=>{
    return jwt.sign({
        id
    },process.env.JWT_SECRET)
};


//Route for user login
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user= await userModel.findOne({email});
        if(!user){
            return res.json({success:false , message:"User does not exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
            const token=createToken(user._id);
            res.json({success:true ,  token});
        }else{
            res.json({success:false, message:"Invalid credentials (user not found)"})
        }

    }catch(e){
        console.log(e);
        res.json({ success: false, message: e.message });
    }


}

//Route for user registeration
const registerUser=async(req,res)=>{
    try{
        const {name , email, password}=req.body;
        ///checking user exists or not
        const exists =await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        /////validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false ,message:"Please enter a valid email"})
        }
        if(password.length<6){
            return res.json({success:false ,message:"Please enter a strong password(atleast 8 character)"})
        }
        ////hashing
        const salt=await bcrypt.genSalt(10);
        const hashedpass=await bcrypt.hash(password,salt);

        const newuser=new userModel({
            name,
            email,
            password:hashedpass
        })
        const user=await newuser.save();
        const token = createToken(user._id);
        res.json({success:true , token})

    }catch(e){
        console.log(e);
        res.json({success:false,message:e.message});
    }
}

//Route for admin login
const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password , process.env.JWT_SECRET);
            res.json({success:true , token});
        }else{
            res.json({success:false , message:"Invalid Credentials"})
        }

    }catch(e){
        console.log(e);
        res.json({ success: false, message: e.message });
    }


}
export {loginUser , registerUser,adminLogin}