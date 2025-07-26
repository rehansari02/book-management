import express from "express";
import mongoose from "mongoose";
import BookRoutes from "./routes/BookRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_ATLAS);
}

app.use("/api", BookRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
