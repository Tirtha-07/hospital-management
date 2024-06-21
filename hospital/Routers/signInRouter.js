const express = require("express");
const signInRouter = express.Router();
const signInController = require("../controllers/signIncontroller");


// signInRouter.post("/loginUser", signInController.logInUser);
// signInRouter.post("/SignInUser", signInController.signUpUser); 


signInRouter.post("/addUser", signInController.insertUser);
signInRouter.get("/getUser", signInController.getUser);




signInRouter.get("/admindetails/:id", signInController.adminDetails); 
signInRouter.get("/doctordetails/:id", signInController.doctorDetails); 
signInRouter.get("/nursedetails/:id", signInController.nurseDetails); 
signInRouter.get("/patientdetails/:id", signInController.patientDetails); 
signInRouter.get("/relativedetails/:id", signInController.relativeDetails); 





module.exports= signInRouter;






// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impla3lsbC5hbmRyZXdAZXhhbXBsZS5jb20iLCJpZCI6IjY1YjhkM2RhNGRiZTgyNDQwZDk1YjM1NyIsImlhdCI6MTcwNjYxMTcxNH0.JwwaXaMqAZ93P0ly5VzIW-MPVmd9yZ4ZuVXv1GTilGo


