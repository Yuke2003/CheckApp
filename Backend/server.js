const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const app = express();
const path = require("path");
const userRouter = require("./routes/userRoute");
const rentRouter = require("./routes/rentRoutes");
const emailRouter = require("./routes/emailRoutes");

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 8000;
console.log(process.env.PORT);

const DB = process.env.MongoDB;
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

mongoose.connect(DB).then((con) => {
  console.log(con.connections);
  console.log("DB connection successfully");
});

app.use(
  cors({
    origin: "http://localhost:5173/", // Specify the allowed origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "https://minpro-2.onrender.com/public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/v1/upload", upload.single("image"), (req, res) => {
  res.status(200).json(req.file);
});
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/rents", rentRouter);

app.listen(PORT, () => console.log(`app running on the port ${PORT}`));
