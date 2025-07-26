import React, { useEffect, useState } from "react";
import axios from "../api/axoisConfig.js";

function InputBar() {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [isEditUpdate, setisEditUpdate] = useState(null);

  const [books, setBooks] = useState([]);

  // Flash message state
  const [flashMsg, setFlashMsg] = useState("");
  const [flashType, setFlashType] = useState(""); // success | error

  // edit
  const handleEdit = async (book) => {
    setBookName(book.bookName);
    setAuthor(book.author);
    setPublisher(book.publisher);
    setBookPrice(book.bookPrice);
    setisEditUpdate(book._id);
  };

  // Fetch book list
  const getBooks = async () => {
    try {
      const res = await axios.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      bookName,
      author,
      publisher,
      bookPrice,
    };

    try {
      if (isEditUpdate) {
        const res = await axios.put(`/${isEditUpdate}`, newBook);
        getBooks();
      } else {
        const res = await axios.post("/bookadd", newBook);
        setFlashMsg(res.data.message || "Book added successfully!");
        setFlashType("success");
        getBooks();
      }
    } catch (err) {
      setFlashMsg("Failed to add book");
      setFlashType("error");
    }

    // Clear form
    setBookName("");
    setAuthor("");
    setPublisher("");
    setBookPrice("");

    // Remove flash message after 3 seconds
    setTimeout(() => {
      setFlashMsg("");
      setFlashType("");
    }, 3000);
  };

  // delete
  const handleDelete = async (id) => {
    console.log(id);
    let data = await axios.delete(`/${id}`);
    setFlashMsg(data.message || "Book  deleted Successfull!");
    setFlashType("success");
    getBooks();
    // Remove flash message after 3 seconds
    setTimeout(() => {
      setFlashMsg("");
      setFlashType("");
    }, 1000);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Flash Message */}
      {flashMsg && (
        <div
          className={`text-white px-4 py-2 rounded-md mb-4 w-full text-center ${
            flashType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {flashMsg}
        </div>
      )}

      {/* Book Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Book Name"
          value={bookName}
          required
          onChange={(e) => setBookName(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          required
          onChange={(e) => setAuthor(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Publisher"
          value={publisher}
          required
          onChange={(e) => setPublisher(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
        />
        <input
          type="number"
          placeholder="Book Price (₹)"
          value={bookPrice}
          required
          onChange={(e) => setBookPrice(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
        />

        <div className="md:col-span-2 lg:col-span-4 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Book List */}
      <h2 className="text-xl font-semibold mb-4">📚 Book List</h2>
      <div className="grid gap-4">
        {books.map((book, i) => (
          <div
            key={i}
            className="border rounded-md p-4 shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div className="mb-2 sm:mb-0">
              <p>
                <strong>Name:</strong> {book.bookName}
              </p>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Publisher:</strong> {book.publisher}
              </p>
              <p>
                <strong>Price:</strong> ₹{book.bookPrice}
              </p>
            </div>
            <div className="flex gap-3 mt-2 sm:mt-0">
              <button
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                onClick={() => {
                  handleEdit(book);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                onClick={() => {
                  handleDelete(book._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputBar;
