import mongoose from "mongoose";
import config from './../config.js'


async function connect() {
    try {
      const db = await mongoose.connect(config.DB_URI, {
      });
      console.log("Connected to MongoDB");
      return db;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  
  export default connect;

