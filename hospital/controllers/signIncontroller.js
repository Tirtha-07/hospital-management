const userSchema = require("../models/signInModel");
// const adminSignInSchema = require("../models/signInModel");

const mongoose= require("mongoose");
const jwdtoken = require('jsonwebtoken'); // Import the jwt library
const bcrypt = require('bcryptjs');
// const adminSignInCollection = require("../models/adminModel");
const secretKey= "secret_key"



exports.insertUser = async (req, res) => {
  try {
      const newUser = await userSchema.create(req.body);
      console.log("new user added", newUser);
      res.send(newUser);
  } catch (error) {
      console.log("error");
  }
}


exports.getUser = async (req, res) => {
  try {
      const users = await userSchema.find();
      res.send(users);
  } catch (error) {
      console.log("error");
  }
}




exports.signUpUser= async(req,res)=>{

    console.log("===",req);
  
    const {userName,email,password,userType}= req.body;
    try{
        const existingUser = await SignInSchema.findOne({email:email})
        if(existingUser){
            return res.send({status:400,
            message:"User already exists"})
        }
  
        const hashPassword= await bcrypt.hash(password,10);
        console.log("=======>>>>",hashPassword);
        const result= await SignInSchema.create({userName:userName,email:email,password:hashPassword,userType:userType})
    console.log("result=====>>>>",result);
    return res.send({
        success:true,
        status:200,
        message: "User Created",
        data:result
    })
    }catch(err){
        return res.send({
            success:false,
            status:500,
            message:"Internal Server Error"
        })
  }
  }
  
  
  
  
  //======================================//
  exports.logInUser = async(req,res)=>{
    const {email,password} =req.body
    try{
        const existingUser = await SignInSchema.findOne({email:email});
        console.log("=========>",existingUser);
        if(!existingUser){
            return res.send({status:404,
            message:"User dos't Found"})}
  
            const matchPassword = await bcrypt.compare(password,existingUser.password)
            if(!matchPassword){
                return res.send({status:400,message:"Invalid Password"})
            }
  
            const token=jwdtoken.sign({email:existingUser.email,
                id:existingUser._id},secretKey)
                return res.send({
                    success:true,
                    status:200,
                    message: "Login Successfull",
                    data:existingUser,
                    token:token
                })
            }catch(error){
        return res.send({
            success:false,
            status:500,
            message:"Internal Server Error"
        })
  
  
    }
  }


  exports.adminDetails=  async (req, res) => {
    const id = req.params.id;
  
    const info = await SignInSchema.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
  
      {
        $lookup: {
          from: "admindatas",
          localField: "userTypeId",
          foreignField: "AdminId",
          as: "DETAILS",
        },
      },
    ]);
  
    console.log("info==========>", info);
  
    return res.send({
      success: true,
      status: 200,
      message: "Fetched successfully",
      data: info,
    });
  };
  




  exports.doctorDetails=  async (req, res) => {
    const id = req.params.id;
  
    const info = await SignInSchema.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
  
      {
        $lookup: {
          from: "doctordatas",
          localField: "userTypeId",
          foreignField: "ID",
          as: "DETAILS",
        },
      },
    ]);
  
    console.log("info==========>", info);
  
    return res.send({
      success: true,
      status: 200,
      message: "Fetched successfully",
      data: info,
    });
  };



  exports.nurseDetails=  async (req, res) => {
    const id = req.params.id;
  
    const info = await SignInSchema.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
  
      {
        $lookup: {
          from: "nursedatas",
          localField: "userTypeId",
          foreignField: "ID",
          as: "DETAILS",
        },
      },
    ]);
  
    console.log("info==========>", info);
  
    return res.send({
      success: true,
      status: 200,
      message: "Fetched successfully",
      data: info,
    });
  };



  // exports.doctorDetails=  async (req, res) => {
  //   const id = req.params.id;
  
  //   const info = await SignInSchema.aggregate([
  //     { $match: { _id: new mongoose.Types.ObjectId(id) } },
  
  //     {
  //       $lookup: {
  //         from: "doctordatas",
  //         localField: "userTypeId",
  //         foreignField: "ID",
  //         as: "DETAILS",
  //       },
  //     },
  //   ]);
  
  //   console.log("info==========>", info);
  
  //   return res.send({
  //     success: true,
  //     status: 200,
  //     message: "Fetched successfully",
  //     data: info,
  //   });
  // };



  exports.patientDetails=  async (req, res) => {
    const id = req.params.id;
  
    const info = await SignInSchema.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
  
      {
        $lookup: {
          from: "patientdatas",
          localField: "userTypeId",
          foreignField: "ID",
          as: "DETAILS",
        },
      },
    ]);
  
    console.log("info==========>", info);
  
    return res.send({
      success: true,
      status: 200,
      message: "Fetched successfully",
      data: info,
    });
  };




  exports.relativeDetails=  async (req, res) => {
    const id = req.params.id;
  
    const info = await SignInSchema.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
  
      {
        $lookup: {
          from: "relativedatas",
          localField: "userTypeId",
          foreignField: "ID",
          as: "DETAILS",
        },
      },
    ]);
  
    console.log("info==========>", info);
  
    return res.send({
      success: true,
      status: 200,
      message: "Fetched successfully",
      data: info,
    });
  };




  