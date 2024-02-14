import bookModel from "./../models/book.model.js";

const checkISBNExist = (isbn) => {
  return bookModel.findOne({ isbn }).exec();
};

const addNewBook = async (req, res) => {
  try {
    const { name, year, author, isbn } = req.body;
    // check isbn already exist
    // check username already exist
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
    const books = await bookModel.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  addNewBook,
  getBooks,
};
