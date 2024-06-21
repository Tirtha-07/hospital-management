const express = require("express");
const nurseRouter = express.Router();
const nurseController = require("../controllers/nurseController");

nurseRouter.post("/addNurse", nurseController.insertNurse);
nurseRouter.post("/addManyNurse", nurseController.addMany);


nurseRouter.get("/getNurseById/:id", nurseController.getNurseById);
nurseRouter.get("/getNurseByName", nurseController.getNurseByName);
nurseRouter.get("/getNurseByType", nurseController.getNurseByType);
nurseRouter.get("/getNurseByDoj/:dateOfJoining", nurseController.getNurseByDoj);
// nurseRouter.get("/getNurseByDod/:dod", nurseController.getNurseByDod);
nurseRouter.get("/getNurseAndDoctorDetails/:id", nurseController.nurseAndDoctorDetails);
nurseRouter.get("/getNurseAndAdminDetails/:id", nurseController.nurseAndAdminDetails);





nurseRouter.put("/updateNurse/:id", nurseController.updateNurse);
nurseRouter.delete("/deleteNurse/:id", nurseController.deleteNurse);



// nurseRouter.post("/loginNurse", nurseController.logInNurse);
// nurseRouter.post("/SignInNurse", nurseController.signUpNurse);




nurseRouter.put("/updateManyNurse", nurseController.UpdateMany);
nurseRouter.delete("/deleteManyNurse", nurseController.DeleteMany);

module.exports = nurseRouter;
