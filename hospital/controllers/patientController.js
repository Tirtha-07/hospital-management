const patientSchema = require("../models/patientModel");
const mongoose= require("mongoose");
const jwdtoken = require('jsonwebtoken'); // Import the jwt library
const bcrypt = require('bcryptjs');
const secretKey= "secret_key"

exports.insertPatient = async (req, res) => {
    try {
        const newPatient = await patientSchema.create(req.body);
        console.log("new patient added", newPatient);
        res.send(newPatient);
    } catch (err) {
        console.log("error", err);
        res.send(err.message);
    }
};

exports.getPatientByName = async (req, res) => {
    const { PatientName } = req.query;
    const queryObject = {};

    if (PatientName) {
        queryObject.PatientName = { $regex: PatientName, $options: "i" };
    }

    let apiData = patientSchema.find(queryObject);

    console.log(queryObject)
    const response = await apiData;
    console.log("response", response);
    res.json({ response });
};

exports.getPatientByType = async (req, res) => {
    const { PatientOfType } = req.query;
    const queryObject = {};

    if (PatientOfType) {
        queryObject.PatientOfType = { $regex: PatientOfType, $options: "i" };
    }

    let apiData = patientSchema.find(queryObject);

    console.log(queryObject)
    const response = await apiData;
    console.log("response", response);
    res.json({ response });
};

exports.updatePatient = async (req, res) => {
    const id = req.params.id;
    const data = await patientSchema.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.send({ data });
};

exports.deletePatient = async (req, res) => {
    const id = req.params.id;
    const data = await patientSchema.deleteOne({ _id: id }, req.body, { new: true });
    res.send({ message: "deleted successfully", status: 200 });
};

exports.getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;

    // Validate that the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const patientDetails = await patientSchema.findById(patientId);

    if (!patientDetails) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Details found successfully',
      data: patientDetails
    });
  } catch (error) {
    console.error('Error finding details:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};


exports.getPatientByDoa = async (req, res) => {
    try {
        const doaParam = req.params.doa;
    
        if (!doaParam) {
          return res.status(400).json({ error: 'DOA parameter is missing' });
        }
    
        const patients = await patientSchema.find({ doa: doaParam });
    
        if (patients.length === 0) {
          return res.status(404).json({ error: 'No patients found with the specified DOA' });
        }
    
        res.json(patients);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};



exports.getPatientByDod = async (req, res) => {
    try {
        const dodParam = req.params.dod;
    
        if (!dodParam) {
          return res.status(400).json({ error: 'DOD parameter is missing' });
        }
    
        const patients = await patientSchema.find({ dod: dodParam });
    
        if (patients.length === 0) {
          return res.status(404).json({ error: 'No patients found with the specified DOA' });
        }
    
        res.json(patients);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};


exports.patientAndDoctorDetails= async (req, res) => {
    const id = req.params.id;

    const info = await patientSchema.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id)}},

        {
            $lookup: {
              from: "doctordatas",
              localField: "doctorId",
              foreignField: "_id",
              as: "TREATMENT_DETAILS"
            }
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






exports.patientRelativeDetails= async (req, res) => {
  const id = req.params.id;

  const info = await patientSchema.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id)}},

      {
          $lookup: {
            from: "relativedatas",
            localField: "relativeId",
            foreignField: "ID",
            as: "RELATIVE-DETAILS"
          }
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



// const patientSchema = require('../models/Patient'); // Import your Patient model

exports.UpdateMany = async (req, res) => {
  try {
    console.log("Data sent to update", req.body);

    const ids = req.body._id;
    console.log("Ids:", ids);

    const { _id, ...dataToUpdate } = req.body;
    const updatedDocs = await patientSchema.updateMany({ _id: { $in: ids } }, { $set: dataToUpdate });
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
};

exports.DeleteMany = async (req, res) => {
  try {
    const ids = req.body._id;
    const deleteResult = await patientSchema.deleteMany({ _id: { $in: ids } });
    return res.send({
      success: true,
      status: 200,
      message: "Deleted successfully",
      data: deleteResult
    });
  } catch (err) {
    console.log("Error", err);

    res.status(500).json({
      message: 'Internal server error',
      error: err.message
    });
  }
};



exports.addMany = async (req, res) => {
  try {
    const itemsToAdd = req.body;

    if (!Array.isArray(itemsToAdd) || itemsToAdd.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty request body' });
    }

    const addedItems = await patientSchema.insertMany(itemsToAdd);

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





// exports.signUpPatient= async(req,res)=>{

//   console.log("===",req);

//   const {PatientName,PatientOfType,age,email,ph_no,address,doa,dod,doctorId,relativeId,password,addedBy}= req.body;
//   try{
//       const existingUser = await patientSchema.findOne({email:email})
//       if(existingUser){
//           return res.send({status:400,
//           message:"User already exists"})
//       }

//       const hashPassword= await bcrypt.hash(password,10);
//       console.log("=======>>>>",hashPassword);
//       const result= await patientSchema.create({PatientName:PatientName,PatientOfType:PatientOfType,age:age,email:email,ph_no:ph_no,address:address,doa:doa,dod:dod,doctorId:doctorId,relativeId:relativeId,password:hashPassword,addedBy:addedBy})
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
// exports.logInPatient = async(req,res)=>{
//   const {email,password} =req.body
//   try{
//       const existingUser = await patientSchema.findOne({email:email});
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



exports.patientAndAdminDetails= async (req, res) => {
  const id = req.params.id;

  const info = await patientSchema.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id)}},

      {
          $lookup: {
            from: "admindatas",
            localField: "addedBy",
            foreignField: "AdminId",
            as: "ADMIN-DETAILS"
          }
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











