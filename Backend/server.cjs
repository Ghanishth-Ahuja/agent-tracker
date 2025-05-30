const express = require("express");
const multer = require("multer");
const path = require("path");
const fastcsv = require("fast-csv");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
app.use(cookieParser());
app.use(express.json());

//importing all the models and multer dependencies
const { upload } = require("./multer.cjs");
const { User } = require("./models/User.cjs");
const { Task } = require("./models/task.cjs");

//connecting to the mongodb atlas database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to atlas"))
  .catch(() => console.log("Error connecting to db"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//admin user created using this code for testing purpose

// (async () => {
//   mongoose
//     .connect(
//       "mongodb+srv://ahujaghanishth:root@cluster0.lnpjb.mongodb.net/users?retryWrites=true&w=majority"
//     )
//     .then(() => console.log("Connected to atlas"))
//     .catch(() => console.log("Error connecting to db"));
//   const pass = "admin";
//   const hashedpassword = await bcrypt.hash(pass, 10);
//   const adminuser = new User({
//     name: "Admin",
//     email: "adminagent@gmail.com",
//     phone: "915866912354",
//     password: hashedpassword,
//     isadmin: true,
//   });
//   adminuser
//     .save()
//     .then(() => console.log("Admin saved"))
//     .catch((err) => console.log(err));
// })();

//post router for adding an agent
app.post("/addagent", async (req, res) => {
  //extracting all requirements from body
  let { name, email, mobNo, password } = req.body;
  //checking if any field is empty
  if (!name || !email || !mobNo || !password) {
    return res.json({ message: "Some data field missing" });
  }
  //if the email or mobNo exists in the database, return the message
  if ((await User.findOne({ email })) || (await User.findOne({ mobNo }))) {
    return res.status(400).json({ message: "User Already exists" });
  }
  //encrypting the password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    //creating the new user
    let newUser = new User({
      name,
      email,
      phone: mobNo,
      password: hashedPassword,
    });
    //saving the user
    let resp = await newUser.save();
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
});

//login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //checking whether the user exists or not
  const AuthenticUser = await User.findOne({ email });
  //if the email is not registered, send error message
  if (!AuthenticUser) {
    return res.status(401).json({ message: "Invalid Email" });
  }
  //decrypting and checking sent password with the  encrypted one
  const AuthenticPassword = await bcrypt.compare(
    password,
    AuthenticUser.password
  );
  //if password doesn't match, send error
  if (!AuthenticPassword) {
    return res.status(401).json({ message: "Invalid Password" });
  }
  //creating a jwt to be sent to the client
  const token = jsonwebtoken.sign(
    { payload: AuthenticUser._id, email: AuthenticUser.email },
    process.env.JWT_SUPER_SECRET_KEY,
    { expiresIn: "1h" }
  );

  //setting the cookies once the user has been authenticated
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 3600000,
  });
  //if the user is an admin, send the isadmin key to be true
  if (AuthenticUser.isadmin) {
    res.json({ isadmin: true });
  } else {
    //else send the isadmin key to be true

    res.status(200).json({ isadmin: false, message: "Success" });
  }
});

//logout route
app.post("/logout", (req, res) => {
  //clearing the cookies
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.status(200).json({ message: "Logged out" });
});

//csv upload route
app.post("/upload", (req, res) => {
  //multer middleware being called with custom error handling
  upload.single("file_field")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // Multer-specific error
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // File type or unknown error
      return res.status(415).json({ message: err.message });
    }
    //if no file uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    //filepath
    const filepath = path.join(__dirname, file.destination, file.filename);
    //getting all users from db into an array
    const users = await User.find({ isadmin: false });
    let tasks = []; //tasks from csv
    //creating a stream of the csv
    fs.createReadStream(filepath)
      //converting the readable stream to writeable using pipe()
      .pipe(fastcsv.parse({ headers: true }))
      .on("data", (data) => {
        tasks.push(data);
      })
      .on("end", async () => {
        try {
          //the number of tasks to be assigned to everyone
          const basecount = Math.floor(tasks.length / users.length);
          //no of extra tasks
          const extracount = tasks.length % users.length;
          let taskIndex = 0;
          //assigning user wise tasks
          for (let i = 0; i < users.length; i++) {
            //if extra task left, assign it
            const nooftasks = basecount + (i < extracount ? 1 : 0);
            const finaltasks = tasks.slice(taskIndex, taskIndex + nooftasks);

            // Add userId to each task
            const tasksWithUser = finaltasks.map((task) => ({
              ...task,
              userId: users[i]._id,
            }));

            // Insert into MongoDB
            await Task.insertMany(tasksWithUser);

            taskIndex += nooftasks;
          }
          //deleting the csv after upload
          fs.unlink(filepath, (err) => {
            if (err) console.log("Error deleting csv", err);
          });
          return res.status(200).json({
            message: "CSV file uploaded and tasks assigned.",
          });
        } catch (e) {
          console.error("Error inserting tasks:", e.message);
          return res.status(500).json({ message: "Failed to insert tasks." });
        }
      })

      .on("error", (error) => {
        //on error
        console.error("CSV parse error:", error.message);
        return res.status(500).json({ message: "Failed to parse CSV file." });
      });
  });
});

//to send user/agent tasks to client
app.get("/api/tasks/me", (req, res) => {
  //extracting user info from cookies set while logging in
  const token = req.cookies.token;
  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).json({ message: "Unauthorized" });
  }
  //verifying whether jwt valid or not
  try {
    const decoded = jsonwebtoken.verify(
      token,
      process.env.JWT_SUPER_SECRET_KEY
    );
    // payload is the key for user mongodb id set while sending jwt
    const userId = decoded.payload;
    // converting the id, which was in string to mongoose ObjectId data type
    const { ObjectId } = mongoose.Types;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId in token" });
    }
    //getting the object id
    const objUserId = new ObjectId(userId);

    //finding the tasks for the particular user in the database
    Task.find({ userId: objUserId })
      .then((tasks) => res.json(tasks))
      .catch((err) => {
        res.status(500).json({ message: "Database error", err });
      });
  } catch (e) {
    console.log("JWT verify failed:", e);
    return res.status(401).json({ message: "Invalid token" });
  }
});

//listening the app at port 8080
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
