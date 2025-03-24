const express = require("express")

const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require("bcryptjs");
const EmployeeModel = require('./models/Employee')
const UserModel = require('./models/UserData')

const jwt = require('jsonwebtoken')

const multer = require('multer');
const path = require('path')


const JWT_SECRET_KEY = 'your_secret_key'

const app = express()
app.use(express.json())
app.use(cors())

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/employeeMS", { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("MongoDB connected"))
      .catch(err => console.error("MongoDB connection error:", err));



app.post('/', (req, res) => {
      EmployeeModel.create(req.body)
            .then(employee => res.json(employee))
            .catch(err => res.json(err))
})

app.post('/login', async (req, res) => {
      const { email, password } = req.body;
      try {
            const user = await EmployeeModel.findOne({ email });
            if (!user) {
                  return res.json({ message: 'No record exists with this email' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                  return res.json({ message: 'Incorrect password' });
            }
            // Authentication successful and Generate JWT token
            const token = jwt.sign({ email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
})

      ;// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ message: 'Unauthorized' });
      jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Unauthorized' });
            req.user = decoded;
            next();
      });
};

// Protected route
app.get('/protectedRoute', verifyToken, (req, res) => {
      // If the token is valid, you can perform authorized actions here
      res.json({ message: 'Protected route accessed successfully', user: req.user });
});

//Admin count
app.get('/admin_count', (req, res) => {
      EmployeeModel.countDocuments()
            .then(data => res.json(data))
            .catch(err => res.json(err))
})
//Admin records
app.get('/admin_records', (req, res) => {
      EmployeeModel.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err))
})

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, 'uploads/employeeImgs');
      },
      filename: function (req, file, cb) {
            cb(null, Date.now() + "_" + file.originalname);
      }
});

const upload = multer({ storage: storage });


//Add
app.post('/addEmployee', upload.single('image'), async (req, res) => {
      try {
            const { name, email, mobile, desg, gen, courses, image, date } = req.body;
            const coursesArray = Array.isArray(courses) ? courses : [courses];

            const imageUrl = req.file ? req.file.filename : '';
            console.log(imageUrl)

            // const img = req.file.buffer.toString('base64');

            const employee = await UserModel.create({
                  name,
                  email,
                  mobile,
                  desg,
                  gen,
                  courses: coursesArray,
                  image: imageUrl,
                  date
            });
            await employee.save();
            res.status(201).json(employee);
      } catch (error) {
            res.status(400).json({ error: error.message });
      }
});

app.get('/', (req, res) => {
      UserModel.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err))
})

// Pagination route
// app.get('/employees', getAllEmployees); 
app.get('/employees', async (req, res) => {
      try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const skip = (page - 1) * pageSize;
            const limit = pageSize;
            const data = await UserModel.find()
                  .skip(skip)
                  .limit(limit)
                  .exec();
            const totalCount = await UserModel.countDocuments();
            const totalPages = Math.ceil(totalCount / pageSize);
            res.status(200).json({
                  results: data,
                  pagination: {
                        page: page,
                        pageSize: pageSize,
                        totalCount: totalCount,
                        totalPages: totalPages
                  }
            });
      } catch (err) {
            res.status(500).json({ message: err.message });
      }
});


app.get('/getData/:id', (req, res) => {
      const id = req.params.id;
      UserModel.findById({ _id: id })
            .then(data => res.json(data))
            .catch(err => res.json(err))
})

//update
app.put('/updateEmployee/:id', (req, res) => {
      const id = req.params.id
      const { name, email, mobile, desg, gen, courses, image, date } = req.body;
      const coursesArray = Array.isArray(courses) ? courses : [courses];
      UserModel.findByIdAndUpdate({ _id: id }, {
            name,
            email,
            mobile,
            desg,
            gen,
            courses: coursesArray,
            image,
            date
      })
            .then(data => res.json(data))
            .catch(err => res.json(err))
})

//Delete

app.delete('/deleteData/:id', (req, res) => {
      const id = req.params.id
      UserModel.findByIdAndDelete({ _id: id })
            .then(data => res.json(data))
            .catch(err => console.log(err))

})

//Employees count
app.get('/employee_count', (req, res) => {
      UserModel.countDocuments()
            .then(data => res.json(data))
            .catch(err => res.json(err))
})

//logout

app.get('/logout', (req, res) => {
      // Clear the session data
      req.session = null;
      // Redirect the user to the login page or send a success message
      res.status(200).json({ message: 'Logout successful' });
});


app.listen(3009, () => {
      console.log("server is running")
})