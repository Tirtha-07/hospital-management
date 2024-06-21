const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");

patientRouter.post("/addPatient", patientController.insertPatient);
patientRouter.post("/addManyPatient", patientController.addMany);


patientRouter.get("/getPatientById/:id", patientController.getPatientById);
patientRouter.get("/getPatientByName", patientController.getPatientByName);
patientRouter.get("/getPatientByType", patientController.getPatientByType);
patientRouter.get("/getPatientByDoa/:doa", patientController.getPatientByDoa);
patientRouter.get("/getPatientByDod/:dod", patientController.getPatientByDod);
patientRouter.get("/getPatientTreatmentDetails/:id", patientController.patientAndDoctorDetails);
patientRouter.get("/getPatientRelativeDetails/:id", patientController.patientRelativeDetails);
patientRouter.get("/getpatientAndAdminDetails/:id", patientController.patientAndAdminDetails);




// patientRouter.post("/loginPatient",patientController.logInPatient);
// patientRouter.post("/SignInPatient",patientController.signUpPatient);




patientRouter.put("/updatePatient/:id", patientController.updatePatient);
patientRouter.delete("/deletePatient/:id", patientController.deletePatient);




patientRouter.put("/updateManyPatient", patientController.UpdateMany);
patientRouter.delete("/deleteManyPatient", patientController.DeleteMany);

module.exports = patientRouter;

