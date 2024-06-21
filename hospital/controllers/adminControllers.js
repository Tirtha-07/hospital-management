const adminSchema = require("../models/adminModel");
const adminSignInSchema = require("../models/signInModel");

const mongoose= require("mongoose");
const jwdtoken = require('jsonwebtoken'); // Import the jwt library
const bcrypt = require('bcryptjs');
const adminSignInCollection = require("../models/adminModel");
const secretKey= "secret_key"

// exports.insertAdmin = async (req, res) => {
//     try {
//         const newAdmin = await adminSchema.create(req.body);
//         console.log("new admin added", newAdmin);
//         res.send(newAdmin);
//     } catch (err) {
//         console.log("error", err);
//         res.send(err.message);
//     }
// };

exports.insertAdmin= async (req,res)=>{
    try{
        const newAdmin= await adminSchema.create(req.body);
        console.log("new admin added",newAdmin);
        res.send(newAdmin)
    }catch(error){
        console.log("error");
    }
}







exports.getAdmin = async (req, res) => {

    const { AdminName } = req.query;
    const queryObject = {};

    if (AdminName) {
        queryObject.AdminName = { $regex: AdminName, $options: "i" };
    }

   

    let apiData = adminSchema.find(queryObject);

    console.log(queryObject)
    const response = await apiData;
    console.log("response", response);
    res.json({ response })
};

exports.updateAdmin = async (req, res) => {
    const id = req.params.id;
    const data = await adminSchema.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.send({ data });
};

exports.deleteAdmin = async (req, res) => {
    const id = req.params.id;
    const data = await adminSchema.deleteOne({ _id: id }, req.body, { new: true });
    res.send({ message: "deleted successfully", status: 200 });
}

exports.findOne = async (req, res) => {
    try {
      const adminId = req.params.id;
  
      // Validate that the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(adminId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      const adminDetails = await adminSchema.findById(adminId);
  
      if (!adminDetails) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json({
        status: 200,
        message: 'Details found successfully',
        data: adminDetails
      });
    } catch (error) {
      console.error('Error finding details:', error.message);
      res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
    }
  }



//   exports.signUpAdmin= async(req,res)=>{

//     console.log("===",req);
  
//     const {AdminName,age,email,ph_no,address,state,pin,password,AdminId}= req.body;
//     try{
//         const existingUser = await adminSignInSchema.findOne({email:email})
//         if(existingUser){
//             return res.send({status:400,
//             message:"User already exists"})
//         }
  
//         const hashPassword= await bcrypt.hash(password,10);
//         console.log("=======>>>>",hashPassword);
//         const result= await adminSignInSchema.create({AdminName:AdminName,age:age,email:email,ph_no:ph_no,address:address,state:state,pin:pin,password:hashPassword,AdminId:AdminId})
//     console.log("result=====>>>>",result);
//     return res.send({
//         success:true,
//         status:200,
//         message: "User Created",
//         data:result
//     })
//     }catch(err){
//         return res.send({
//             success:false,
//             status:500,
//             message:"Internal Server Error"
//         })
//   }
//   }
  
  
  
  
//   //======================================//
//   exports.logInAdmin = async(req,res)=>{
//     const {email,password} =req.body
//     try{
//         const existingUser = await adminSignInSchema.findOne({email:email});
//         console.log("=========>",existingUser);
//         if(!existingUser){
//             return res.send({status:404,
//             message:"User dos't Found"})}
  
//             const matchPassword = await bcrypt.compare(password,existingUser.password)
//             if(!matchPassword){
//                 return res.send({status:400,message:"Invalid Password"})
//             }
  
//             const token=jwdtoken.sign({email:existingUser.email,
//                 id:existingUser._id},secretKey)
//                 return res.send({
//                     success:true,
//                     status:200,
//                     message: "Login Successfull",
//                     data:existingUser,
//                     token:token
//                 })
//             }catch(error){
//         return res.send({
//             success:false,
//             status:500,
//             message:"Internal Server Error"
//         })
  
  
//     }
//   }
  //======================================//




  const randomStringGenerate = (length)=>{
    let result= "";
    const characters= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234456789";

    const charactersLength= characters.length;
    let counter = 0;
    while(counter < length){
        result+=characters.charAt(Math.floor(Math.random()* charactersLength));
        counter+=1;

    }
    return result;
};



  exports.forgetPassword= async (req,res)=>{
    const {email}= req.body;
    console.log("body====",req.body);

    try{
        if(email== undefined) throw "Please enter email address";

        const existingUser = await adminSchema.findOne({email:email});
         if(!existingUser) throw "Please enter valid email address";
         console.log("existingUser==", existingUser);
         const response = await adminSchema.findOneAndUpdate({email: email},
            {
                $set: {
                    verificationCode: randomStringGenerate(6),
                    verificationCodeExp: new Date(
                        new Date().getTime() + 24 * 60 * 60 *1000
                    )
                }
            },
            {new : true}
            );

            res.send({
                status: "success",
                data: response,
            });

} catch(error){
    res.send(error);
}
}


exports.resetPassword= async (req,res)=>{
    const{newpassword, confirmpassword} = req.body;
    console.log("body====>",req.body);
    const verificationCode= req.params.verificationCode;
    console.log("verificationCode111111111111===>",verificationCode);
    
try{
    
    const exverificationCode= await adminSchema.findOne({
        verificationCode: verificationCode,
    });

    console.log("exverificationCode", exverificationCode);
    if(exverificationCode==null) throw "invalid user";
    if(exverificationCode.verificationCodeExp < new Date(new Date().getTime()))
    throw "code expired";

    const response = await adminSchema.findOneAndUpdate(
        {_id: exverificationCode._id },
        {
            $set: {password: newpassword},

            $unset: {
                verificationCode: 1,
                verificationCodeExp: 1
            }
        }
    );

    return res.send({
        status: "success",
        data: response,
    });

    
}catch(error){
    console.log("error",error);
}
}
  







exports.conditionalInsertion = async (req, res) => {

    console.log("===", req);

    try {

        const { AdminName,age,email,ph_no,address,state,pin,password,AdminId } = req.body;

        // ask question vvvvvvvvv

        const existingAdmin1 = await adminSchema.findOne({ email: email });
        const existingAdmin2 = await adminSchema.findOne({ ph_no: ph_no });


        // ask question ^^^^^^^^^^^^^^

        if (existingAdmin1) {

            const data = await adminSchema.findByIdAndUpdate(existingAdmin1._id, req.body, { new: true });
            res.send({ data });
            console.log("data==========================================>>>>>>>>", data);
        } else  if (existingAdmin2) {

            const data = await adminSchema.findByIdAndUpdate(existingAdmin2._id, req.body, { new: true });
            res.send({ data });
            console.log("data==========================================>>>>>>>>", data);
        }
        
        
        else {
            const result = await adminSchema.create({ AdminName:AdminName,age:age,email:email,ph_no:ph_no,address:address,state:state,pin:pin,password:password,AdminId:AdminId });
            console.log("result=====>>>>", result);
            return res.send({
                success: true,
                status: 200,
                message: "Admin Created",
                data: result
            });
        }
    } catch (err) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Server Error"
        });
    }
}

  
  
  
  


  