const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const EmployeeSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true,
            unique: true
      },
      password: {
            type: String,
            required: true
      }

})
// Hash password before saving to the database
EmployeeSchema.pre('save', async function (next) {
      const user = this;
      if (!user.isModified('password')) {
            return next();
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      next();
});

const EmployeeModel = mongoose.model("employeeMs", EmployeeSchema)
module.exports = EmployeeModel


