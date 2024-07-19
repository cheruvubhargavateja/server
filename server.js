import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./src/routes/routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // The specific origin you want to allow
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db connection
mongoose
  .connect(process.env.DB_URL)
  .then(console.log("Successfully connected to mongoDB."))
  .catch((err) => {
    console.log(err);
  });

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("connected to port ", process.env.PORT);
});
