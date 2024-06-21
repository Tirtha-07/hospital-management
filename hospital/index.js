const express = require("express");
const app = express();
const dotenv = require("dotenv");
app.use(express.json());
const cors= require("cors");

app.use(cors());
const fs= require("fs");

const adminRouters = require("./Routers/adminRouter");
const doctorRouter = require("./Routers/doctorRouter");

const patientRouter = require("./Routers/patientRouter");
const nurseRouter = require("./Routers/nurseRouter");
const relativeRouter = require("./Routers/relativeRouter");
const signInRouter= require("./Routers/signInRouter");
const noteRouter= require("./Routers/noteRouter");
const forgetRouter= require("./Routers/forgetRouter");

const port = process.env.PORT || 5000;
dotenv.config();
require("./db");


app.use("/api/admin",adminRouters);
app.use("/api/doctor",doctorRouter);
app.use("/api/patient",patientRouter);
app.use("/api/nurse",nurseRouter);
app.use("/api/relative",relativeRouter);
app.use("/api/user",signInRouter);
app.use("/api/note",noteRouter);


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

