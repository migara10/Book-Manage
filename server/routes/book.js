import express from 'express';
import bookController from './../controllers/bookController.js';
import path from 'path';
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

const route = express.Router();

route.post('/book', upload.single("file"), bookController.addNewBook);  // add new book
route.get('/book', bookController.getBooks); // get All books
route.put('/book/:id',upload.single("file"), bookController.updateBook); // update book by id


export default route;
