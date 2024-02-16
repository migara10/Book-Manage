import bookModel from "./../models/book.model.js";
import mongoose from "mongoose";

const checkISBNExist = (isbn) => {
  return bookModel.findOne({ isbn }).exec();
};

const addNewBook = async (req, res) => {
  try {
    const { name, year, author, isbn } = req.body;
    // check isbn already exist
    const existingBook = await checkISBNExist(isbn);
    if (existingBook) {
      return res.status(401).send({ error: "Book is already saved." });
    }

    const book = new bookModel({
      name,
      year,
      author,
      isbn,
      img: req.file ? req.file.path.replace(/\\/g, "/") : null,
    });

    await book.save();
    return res.status(200).send({ message: "Book added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBooks = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2; // Adjust the limit as needed

    const totalBooks = await bookModel.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    const skip = (page - 1) * limit;

    const books = await bookModel.find().skip(skip).limit(limit);

    res.status(200).json({ books, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



/* const getBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}; */


const updateBook = async (req, res) => {
  const bookId = req.params.id;

  const query = { _id: new mongoose.Types.ObjectId(bookId) };

  let updatedImagePath = req.body.img;
  if (req.file && req.file.path) {
    updatedImagePath = req.file.path.replace(/\\/g, "/");
  }

  try {
    const updatedBook = {...req.body, img: updatedImagePath}
    await bookModel.updateOne(query, updatedBook);
    return res.status(200).send({ message: "Book updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export default {
  addNewBook,
  getBooks,
  updateBook,
};
