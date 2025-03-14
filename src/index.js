import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });


















//1st APPROACH TO CONNECT APP TO DATABASE DIRECTLY 


// import express from "express"
// const app = express()

// (async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URl}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.error(error);
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`app is listening ${process.env.PORT }`);
//         })
//     }catch(error){
//         console.log("ERROR:",error)
//         throw err
//     }
// })()