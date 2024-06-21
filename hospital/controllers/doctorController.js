const doctorSchema = require("../models/doctorModel");
const mongoose = require("mongoose");
const jwdtoken = require('jsonwebtoken'); // Import the jwt library
const bcrypt = require('bcryptjs');
const doctorSignInCollection = require("../models/doctorModel");
const secretKey= "secret_key"


exports.insertDoctor = async (req, res) => {
    try {
        const newDoctor = await doctorSchema.create(req.body);
        console.log("new doctor added", newDoctor);
        res.send(newDoctor);
    } catch (err) {
        console.log("error", err);
        res.send(err.message);
    }
};



exports.getDoctor = async (req, res) => {

  const { DoctorName } = req.query;
  const queryObject = {};

  if (DoctorName) {
    queryObject.DoctorName = { $regex: DoctorName, $options: "i" };
  }

  let apiData = doctorSchema.find(queryObject);

  console.log(queryObject);
  const response = await apiData;
  console.log("response", response);
  res.json({ response });
};


exports.getDoctorByName = async (req, res) => {

    const { DoctorName } = req.query;
    const queryObject = {};

    if (DoctorName) {
        queryObject.DoctorName = { $regex: DoctorName, $options: "i" };
    }


    let apiData = doctorSchema.find(queryObject);

    console.log(queryObject)
    const response = await apiData;
    console.log("response", response);
    res.json({ response });
};

exports.getDoctorByType = async (req, res) => {

    const { DoctorOfType } = req.query;
    const queryObject = {};

    if (DoctorOfType) {
        queryObject.DoctorOfType = { $regex: DoctorOfType, $options: "i" };
    }


    let apiData = doctorSchema.find(queryObject);

    console.log(queryObject)
    const response = await apiData;
    console.log("response", response);
    res.json({ response });
};

exports.updateDoctor = async (req, res) => {
    const id = req.params.id;
    const data = await doctorSchema.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.send({ data });
};

exports.deleteDoctor = async (req, res) => {
    const id = req.params.id;
    const data = await doctorSchema.deleteOne({ _id: id }, req.body, { new: true });
    res.send({ message: "deleted successfully", status: 200 });
};

exports.findOne = async (req, res) => {
    try {
      const doctorId = req.params.id;
  
      // Validate that the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      const doctorDetails = await doctorSchema.findById(doctorId);
  
      if (!doctorDetails) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json({
        status: 200,
        message: 'Details found successfully',
        data: doctorDetails
      });
    } catch (error) {
      console.error('Error finding details:', error.message);
      res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
    }
  }

exports.getTopThree = async (req, res) => {
    const id = req.params.id;

    const info = await doctorSchema.aggregate([
        // { $match: { _id: new mongoose.Types.ObjectId(id) } },

        {
            $sort: {
             yearsOfExperience : -1
            }
          },
           {
             $limit: 3
           }
    ]);

    console.log("info==========>", info);

    return res.send({
        success: true,
        status: 200,
        message: "fetched successfully",
        data: info
    });
};



exports.UpdateMany= async (req, res) => {
    try {
        console.log("data sent to update", req.body);
    
        const ids = req.body._id;
        console.log("Ids:", ids);
    
        const { _id, ...dataToUpdate } = req.body;
        const updatedDocs = await doctorSchema.updateMany({ _id: { $in: ids } }, { $set: dataToUpdate });
        console.log("Updated successfully", updatedDocs);
    
        res.status(200).json({
          status: 200,
          message: "Updated successfully",
          data: updatedDocs
        });
    
      } catch (err) {
        console.log('Error updating records:', err.message);
        res.status(500).json({
          message: 'Internal server error',
          error: err.message
        });
      }
  }


  exports.DeleteMany= async(req,res)=>{
    try{
      const ids= req.body._id;
      const deleteResult= await doctorSchema.deleteMany({_id: {$in: ids}})
      return res.send({
        success: true,
        status:200,
        message:"Deleted successfully",
        data: deleteResult
      })
    }catch(err){
      console.log("error",err);
  
      res.status(500).json({
        message: 'internal server error',
        error: err.message
      })
    }
  }


  exports.addMany=  async (req, res) => {
    try {
     
  
      const itemsToAdd = req.body;
  
      if (!Array.isArray(itemsToAdd) || itemsToAdd.length === 0) {
        return res.status(400).json({ message: 'Invalid or empty request body' });
      }
  
      const addedItems = await doctorSchema.insertMany(itemsToAdd);
  
      res.status(201).json({
        status: 201,
        message: 'Items added successfully',
        data: addedItems
      });
    } catch (err) {
      console.error('Error adding items:', err.message);
      res.status(500).json({
        message: 'Internal server error',
        error: err.message
      });
    }
  };
  
  // Start the server



  
  

  // exports.signUpDoctor= async(req,res)=>{

  //   console.log("===",req);
  
  //   const {DoctorName,DoctorOfType,age,email,ph_no,degree,yearsOfExperience,ID,AvailableHrs,AvailableDays,password,addedBy}= req.body;
  //   try{
  //       const existingUser = await doctorSchema.findOne({email:email})
  //       if(existingUser){
  //           return res.send({status:400,
  //           message:"User already exists"})
  //       }
  
  //       const hashPassword= await bcrypt.hash(password,10);
  //       console.log("=======>>>>",hashPassword);
  //       const result= await doctorSchema.create({DoctorName:DoctorName,DoctorOfType:DoctorOfType,age:age,email:email,ph_no:ph_no,password:hashPassword,degree:degree,yearsOfExperience:yearsOfExperience,ID:ID,AvailableHrs:AvailableHrs,AvailableDays:AvailableDays,addedBy:addedBy})
  //   console.log("result=====>>>>",result);
  //   return res.send({
  //       success:true,
  //       status:200,
  //       message: "User Created",
  //       data:result
  //   })
  //   }catch(err){
  //       return res.send({
  //           success:false,
  //           status:500,
  //           message:"Internal Server Error"
  //       })
  // }
  // }
  
  
  
  
  // //======================================//
  // exports.logInDoctor = async(req,res)=>{
  //   const {email,password} =req.body
  //   try{
  //       const existingUser = await doctorSchema.findOne({email:email});
  //       console.log("=========>",existingUser);
  //       if(!existingUser){
  //           return res.send({status:404,
  //           message:"User dos't Found"})}
  
  //           const matchPassword = await bcrypt.compare(password,existingUser.password)
  //           if(!matchPassword){
  //               return res.send({status:400,message:"Invalid Password"})
  //           }
  
  //           const token=jwdtoken.sign({email:existingUser.email,
  //               id:existingUser._id},secretKey)
  //               return res.send({
  //                   success:true,
  //                   status:200,
  //                   message: "Login Successfull",
  //                   data:existingUser,
  //                   token:token
  //               })
  //           }catch(error){
  //       return res.send({
  //           success:false,
  //           status:500,
  //           message:"Internal Server Error"
  //       })
  
  
  //   }
  // }
  // //======================================//



  exports.doctorAndAdminDetails = async (req, res) => {
    const id = req.params.id;
  
    const info = await doctorSchema.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
  
      {
        $lookup: {
          from: "admindatas",
          localField: "addedBy",
          foreignField: "AdminId",
          as: "ADMIN-DETAILS",
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




  






  