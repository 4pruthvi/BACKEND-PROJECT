//require("dotenv").config({path: "./.env"});

import dotenv from "dotenv"; // this is the new way to import dotenv in ES6 modules

import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is runnign on port: ${process.env.PORT || 8000}`);
    })
})
.catch((error) => {
    console.log("MONGO DB connection failed !!",error)
})








/*
This is the first approach to connect the MongoDB database.

import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express"

const app = express()

( async () => { // IIFE - Immediately Invoked Function Expression USED TO AVOID CALLBACK HELL
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Error:",error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`); 
        })

    } catch(error) {
        console.log("Error:",error);
        throw error
    }
}) ()
*/