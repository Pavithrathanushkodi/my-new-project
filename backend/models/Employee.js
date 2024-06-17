const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    companyName: String,
    projectName: String,
    role: String,

})

const EmployeeModel = mongoose.model("employees", EmployeeSchema)
module.exports = EmployeeModel



