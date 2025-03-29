const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const EmployeeModel = require("./models/Employee");
const UserModel = require("./models/UserData");
const PORT = 3009; 
const JWT_SECRET_KEY = "your_secret_key";
const MONGO_URI = "mongodb://127.0.0.1:27017/employeeMS";

const app = express();
app.use(express.json()); 

// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Authentication Routes
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await EmployeeModel.findOne({ email });
        if (!user) return res.json({ message: "No record exists with this email" });
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({ message: "Incorrect password" });
        
        const token = jwt.sign({ email: user.email }, JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// JWT Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded;
        next();
    });
};

// Protected Route
app.get("/protectedRoute", verifyToken, (req, res) => {
    res.json({ message: "Protected route accessed successfully", user: req.user });
});

// Employee CRUD Operations
app.post("/addEmployee", async (req, res) => {
    try {
        const { name, email, mobile, desg, gen, courses, date } = req.body;
        const employee = await UserModel.create({ name, email, mobile, desg, gen, courses, date });
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/employees", async (req, res) => {
    try {
        const employees = await UserModel.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put("/updateEmployee/:id", async (req, res) => {
    try {
        const updatedEmployee = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployee);
    } catch (err) {
        res.json(err);
    }
});

app.delete("/deleteData/:id", async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Employee deleted successfully" });
    } catch (err) {
        res.json(err);
    }
});

 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
