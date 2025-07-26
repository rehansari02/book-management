import { Book } from "../models/BookSchema.js";

export const bookadd = async (req, res) => {
  try {
    const { bookName, author, publisher, bookPrice } = req.body;
    console.log("Received data from frontend:", req.body);

    const data = new Book({
      bookName,
      author,
      publisher,
      bookPrice,
    });
    await data.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Book
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

export const getbookedit = async (req, res) => {
  let { id } = req.params;
  const { bookName, author, publisher, bookPrice } = req.body;
  let data = await Book.findByIdAndUpdate(id, {
    bookName,
    author,
    publisher,
    bookPrice,
  });
  res.status(200).json(data);
};

export const getbookdelete = async (req, res) => {
  let { id } = req.params;
  let data = await Book.findByIdAndDelete(id);
  res.status(200).json({ message: "Book deleted successfully" });
  console.log(data);
};
