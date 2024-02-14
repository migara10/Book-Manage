import mongoose from "mongoose";

export const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a book name"],
    minlength: 3,
  },
  year: {
    type: Number,
    required: [true, "Please provide a publication year"],
  },
  author: {
    type: String,
    required: [true, "Please provide the author's name"],
  },
  isbn: {
    type: Number,
    required: [true, "Please provide a valid ISBN"],
  },
  img: {
    type: String,
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now,
  },
});

BookSchema.pre('save', function (next) {
  this.lastModifiedDate = Date.now();
  next();
});

export default mongoose.model('Book', BookSchema);
