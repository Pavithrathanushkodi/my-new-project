const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee"); // Assuming Employee model is defined
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection options
mongoose.connect("mongodb://127.0.0.1:27017/Employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Endpoint to fetch user details based on email
app.post('/home', async (req, res) => {
  const { email } = req.body;
  try {
    // Find user in the database based on email
    const user = await EmployeeModel.findOne({ email });
    if (user) {
      // Respond with user details from database
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to handle sending messages (assuming it updates messages in a chat system)
app.post('/sendMessage', (req, res) => {
  const { message, userEmail } = req.body;
  // Example logic: updating messages array
  // Replace with actual logic to handle messages in your application
  try {
    // Update messages or process message here
    // For simplicity, just returning the received message
    res.json({ message: `Message received: ${message}` });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post("/register", (req, res) => {
  const { name, email, password, companyName, projectName, role } = req.body;
  console.log(req.body)

  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(409).json("Email already registered");
      } else {
        EmployeeModel.create({ name, email, password, companyName, projectName, role })
          .then((employee) => res.status(201).json("Registration successful"))
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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
