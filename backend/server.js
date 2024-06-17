const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Employee");


app.post("/register", (req, res) => {
  const { name, email, password, companyName, projectName, role } = req.body;
  console.log(req.body)

  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(409).json("Email already registered");
      } else {
        EmployeeModel.create({ name, email, password, companyName, projectName, role })
          .then((employee) => res.status(201).json("Registration successful" , employee))
          .catch((err) => {
            console.error("Error during registration:", err);
            res.status(500).json("Internal server error");
          });
      }
    })
    .catch((err) => {
      console.error("Error during registration:", err);
      res.status(500).json("Internal server error");
    });
});



app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("The Password is incorrect");
        }
      } else {
        res.json("User does not exist");
      }
    })
    .catch((err) => {
      console.error("Error during login:", err);
      res.status(500).json("Internal server error");
    });
});




app.get("/home", async (req, res) => {
  const { emailID } = req.body; 
  console.log("text",req.body)

  try {
    const user = await EmployeeModel.findOne({ emailID });
    console.log("user",user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const { name, companyName, projectName, email } = user;

   
    res.status(200).json({ name, companyName, projectName, email });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
