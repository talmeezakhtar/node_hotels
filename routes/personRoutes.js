const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const { generateToken, jwtAuthMiddleware } = require("../jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("Data Saved");

    const payload = { username: response.username, id: response._id };
    const token = generateToken(payload);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const payLoad = {
      username: user.username,
      id: user.id,
    };

    const token = generateToken(payLoad);
    res.json({ token });

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile Route 
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try{
    const userData = req.user; // Extract user data from the request object set by jwtAuthMiddleware
    const userId = userData.id;
    console.log("User ID from token:", userData);

    const user  = await Person.findById(userId);
    res.status(200).json({ user });

  }catch(error){
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Response Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid WorkType" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPerson = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPerson, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json("Person Not Found");
    }

    console.log("Data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json("Person Not Found");
    }

    console.log("Data Deleted");
    res.status(200).json({ message: "Person Deleted Successfully" });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
