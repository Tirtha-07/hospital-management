const express = require("express");
const noteRouter = express.Router();  
const noteController = require("../controllers/noteController"); 
const middleware = require("../middleware/authMiddleware");

noteRouter.post("/addNote",middleware.auth,noteController.insertNote);


module.exports = noteRouter;
