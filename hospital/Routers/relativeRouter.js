const express = require("express");
const relativeRouter = express.Router();
const relativeController = require("../controllers/relativeController");

relativeRouter.post("/addRelative", relativeController.insertRelative);
relativeRouter.post("/addManyRelative", relativeController.addMany);


relativeRouter.get("/getRelativeById/:id", relativeController.getRelativeById);
relativeRouter.get("/getRelativeByName", relativeController.getRelativeByName);
relativeRouter.get("/getRelativeAndAdminDetails/:id", relativeController.relativeAndAdminDetails);

// relativeRouter.get("/getRelativeByType", relativeController.getRelativeByType);
// relativeRouter.get("/getRelativeByDoa/:doa", relativeController.getRelativeByDoa);
// relativeRouter.get("/getRelativeByDod/:dod", relativeController.getRelativeByDod);
// relativeRouter.get("/getRelativeTreatmentDetails/:id", relativeController.relativeAndDoctorDetails);

relativeRouter.put("/updateRelative/:id", relativeController.updateRelative);
relativeRouter.delete("/deleteRelative/:id", relativeController.deleteRelative);



// relativeRouter.post("/loginRelative", relativeController.logInRelative);
// relativeRouter.post("/SignInRelative", relativeController.signUpRelative); 





relativeRouter.put("/updateManyRelative", relativeController.UpdateMany);
relativeRouter.delete("/deleteManyRelative", relativeController.DeleteMany);



module.exports = relativeRouter;
