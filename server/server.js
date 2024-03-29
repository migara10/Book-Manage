import express from 'express';
import cors from "cors";

import connect from "./database/connection.js";
import auth from './routes/auth.js'; // import auth route
import book from './routes/book.js'; // import book route




const app = express(); // create express app
app.use(express.json());
app.use(cors());

const PORT = 3000 || process.env.PORT; // create local build port or get prod build port

app.use('/auth', auth); // create auth route
app.use('/store', book); // create book route
app.use('/upload', express.static('upload')); // image upload path



connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`server connect on: ${PORT}`);
      });
    } catch (err) {
      console.log("server Connect Failed", err);
    }
  })
  .catch((err) => {
    console.log("Invalid Database connection", err);
  });
