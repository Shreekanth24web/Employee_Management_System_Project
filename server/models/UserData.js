const mongoose = require('mongoose')

const EmployeeDataSchema = new mongoose.Schema({
      name:String,
      email:String,
      mobile:Number,
      desg:String,
      gen:String,
      courses:[String],
      image: String,
      date:String,
})

const UserModel =mongoose.model("EmployeeData", EmployeeDataSchema)
module.exports=UserModel