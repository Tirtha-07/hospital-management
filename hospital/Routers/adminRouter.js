const express = require("express");
const adminRouter = express.Router();  
const adminController = require("../controllers/adminControllers");  

// adminRouter.post("/addAdmin", adminController.insertAdmin);  
adminRouter.get("/getAdmin", adminController.getAdmin);  

// adminRouter.put("/updateAdmin/:id", adminController.updateAdmin);  
adminRouter.delete("/deleteAdmin/:id", adminController.deleteAdmin);



adminRouter.get("/getAdmin/:id", adminController.findOne);  



// adminRouter.post("/loginAdmin", adminController.logInAdmin);
// adminRouter.post("/SignInAdmin", adminController.signUpAdmin);



adminRouter.post("/forgetpw", adminController.forgetPassword);

adminRouter.post("/respw/:verificationCode", adminController.resetPassword);






adminRouter.post("/addAdmin", adminController.conditionalInsertion);  




module.exports = adminRouter;
