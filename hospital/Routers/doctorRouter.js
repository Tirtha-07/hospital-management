const express = require("express");
const doctorRouter = express.Router();
const doctorController = require("../controllers/doctorController");

doctorRouter.post("/addDoctor", doctorController.insertDoctor);
doctorRouter.post("/addManyDoctor", doctorController.addMany);

doctorRouter.get("/getDoctor", doctorController.getDoctor);




doctorRouter.get("/getDoctor/:id", doctorController.findOne);
doctorRouter.get("/getDoctorByName", doctorController.getDoctorByName);
doctorRouter.get("/getDoctorByType", doctorController.getDoctorByType);
doctorRouter.get("/topThree", doctorController.getTopThree);
doctorRouter.get("/getDoctorAndAdminDetails/:id", doctorController.doctorAndAdminDetails);







doctorRouter.put("/updateDoctor/:id", doctorController.updateDoctor);
doctorRouter.delete("/deleteDoctor/:id", doctorController.deleteDoctor);



// doctorRouter.post("/loginDoctor", doctorController.logInDoctor);
// doctorRouter.post("/SignInDoctor", doctorController.signUpDoctor);




doctorRouter.put("/updateManyDoctor", doctorController.UpdateMany);
doctorRouter.delete("/DeleteManyDoctor", doctorController.DeleteMany);







module.exports = doctorRouter;

