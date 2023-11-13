import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import mongoose from 'mongoose';
import User from "./model/user.js";
import auth from "./route/auth.js";
import game from "./route/game.js";

import { fileURLToPath } from "url";
dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors({
//   origin:["http://localhost:3000","https://yourgame.onrender.com"],
// }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "server/public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });


const PORT = process.env.PORT || 5000

app.use('/',express.static(path.join(__dirname, "public")))

// app.get('/style.css',(req,res)=> res.sendFile('./style.css'));
// app.get('/app.css',(req,res)=> res.sendFile('./app.js'));

app.use('/auth',auth)
app.use('/game',game)




mongoose.connect('mongodb+srv://yigoya7:Ya371240@cluster0.uixnoyf.mongodb.net/yourname?retryWrites=true&w=majority',
).then(()=>{
  app.listen(PORT,()=> console.log(`the server runs in port ${PORT}`))
}).catch(err=>console.log(err))


