const relativeSchema = require("../models/relativeModel");
const mongoose = require("mongoose");
const jwdtoken = require('jsonwebtoken'); // Import the jwt library
const bcrypt = require('bcryptjs');
const secretKey= "secret_key"

exports.insertRelative = async (req, res) => {
    try {
        const newRelative = await relativeSchema.create(req.body);
        console.log("new relative added", newRelative);
        res.send(newRelative);
    } catch (err) {
        console.log("error", err);
        res.send(err.message);
    }
};

exports.getRelativeByName = async (req, res) => {
    const { RelativeName } = req.query;
    const queryObject = {};

    if (RelativeName) {
        queryObject.RelativeName = { $regex: RelativeName, $options: "i" };
    }

    let apiData = relativeSchema.find(queryObject);

    console.log(queryObject);
    const response = await apiData;
    console.log("response", response);
    res.json({ response });
};

// exports.getRelativeByType = async (req, res) => {
//     const { RelativeOfType } = req.query;
//     const queryObject = {};

//     if (RelativeOfType) {
//         queryObject.RelativeOfType = { $regex: RelativeOfType, $options: "i" };
//     }

//     let apiData = relativeSchema.find(queryObject);

//     console.log(queryObject);
//     const response = await apiData;
//     console.log("response", response);
//     res.json({ response });
// };

exports.updateRelative = async (req, res) => {
    const id = req.params.id;
    const data = await relativeSchema.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.send({ data });
};

exports.deleteRelative = async (req, res) => {
    const id = req.params.id;
    const data = await relativeSchema.deleteOne({ _id: id }, req.body, { new: true });
    res.send({ message: "deleted successfully", status: 200 });
};

exports.getRelativeById = async (req, res) => {
    try {
        const relativeId = req.params.id;
    
        // Validate that the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(relativeId)) {
          return res.status(400).json({ message: 'Invalid ID format' });
        }
    
        const relativeDetails = await relativeSchema.findById(relativeId);
    
        if (!relativeDetails) {
          return res.status(404).json({ message: 'Item not found' });
        }
    
        res.status(200).json({
          status: 200,
          message: 'Details found successfully',
          data: relativeDetails
        });
      } catch (error) {
        console.error('Error finding details:', error.message);
        res.status(500).json({
          message: 'Internal server error',
          error: error.message
        });
      }
};

// exports.getRelativeByDoa = async (req, res) => {
//     try {
//         const doaParam = req.params.doa;

//         if (!doaParam) {
//             return res.status(400).json({ error: 'DOA parameter is missing' });
//         }

//         const relatives = await relativeSchema.find({ doa: doaParam });

//         if (relatives.length === 0) {
//             return res.status(404).json({ error: 'No relatives found with the specified DOA' });
//         }

//         res.json(relatives);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// exports.getRelativeByDod = async (req, res) => {
//     try {
//         const dodParam = req.params.dod;

//         if (!dodParam) {
//             return res.status(400).json({ error: 'DOD parameter is missing' });
//         }

//         const relatives = await relativeSchema.find({ dod: dodParam });

//         if (relatives.length === 0) {
//             return res.status(404).json({ error: 'No relatives found with the specified DOA' });
//         }

//         res.json(relatives);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

exports.relativeAndDoctorDetails = async (req, res) => {
    const id = req.params.id;

    const info = await relativeSchema.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },

        {
            $lookup: {
                from: "doctordatas",
                localField: "doctorId",
                foreignField: "ID",
                as: "TREATMENT-DETAILS"
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


// const relativeSchema = require('../models/Relative'); // Import your Relative model

exports.UpdateMany = async (req, res) => {
  try {
    console.log("Data sent to update", req.body);

    const ids = req.body._id;
    console.log("Ids:", ids);

    const { _id, ...dataToUpdate } = req.body;
    const updatedDocs = await relativeSchema.updateMany({ _id: { $in: ids } }, { $set: dataToUpdate });
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
    const deleteResult = await relativeSchema.deleteMany({ _id: { $in: ids } });
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
  
      const addedItems = await relativeSchema.insertMany(itemsToAdd);
  
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





  // exports.signUpRelative= async(req,res)=>{

  //   console.log("===",req);
  
  //   const {RelativeName,relation,age,email,ph_no,address,profession,ID,password,addedBy}= req.body;
  //   try{
  //       const existingUser = await relativeSchema.findOne({email:email})
  //       if(existingUser){
  //           return res.send({status:400,
  //           message:"User already exists"})
  //       }
  
  //       const hashPassword= await bcrypt.hash(password,10);
  //       console.log("=======>>>>",hashPassword);
  //       const result= await relativeSchema.create({RelativeName:RelativeName,relation:relation,age:age,email:email,ph_no:ph_no,address:address,profession:profession,ID:ID,password:hashPassword,addedBy:addedBy})
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
  // exports.logInRelative = async(req,res)=>{
  //   const {email,password} =req.body
  //   try{
  //       const existingUser = await relativeSchema.findOne({email:email});
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



  exports.relativeAndAdminDetails = async (req, res) => {
    const id = req.params.id;
  
    const info = await relativeSchema.aggregate([
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
  


