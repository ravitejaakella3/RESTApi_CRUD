require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const authroutes=require("./routes/authRoutes");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app=express();
app.use(express.json());
app.use("/api", authroutes);

// Security middlewares
app.use(helmet({
    xssFilter: true, // Enable XSS Protection
    frameguard: { action: 'deny' }, // Prevent clickjacking
    hsts: { maxAge: 31536000, includeSubDomains: true } // Enable Strict Transport Security
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//DB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("connected to DB"))
    .catch((err)=>console.log(err));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
