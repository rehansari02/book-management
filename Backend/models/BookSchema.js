import { model, Schema } from "mongoose";

const BookSchema = new Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    bookPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = model("Book", BookSchema);

export { Book };
