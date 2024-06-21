
const mongoose= require("mongoose")
const dotenv= require("dotenv")
dotenv.config()
mongoose.connect(process.env.db).then(()=>{
    console.log("db connected");
}).catch(()=>{
    console.log("error",err);
})
