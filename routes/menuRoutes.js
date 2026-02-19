const express = require("express");
const router = express.Router();

const MenuItem = require("../models/menuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);

    const savedMenuItem = await newMenuItem.save();
    console.log("Data Saved");
    res.status(200).json(savedMenuItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (tasteType == "Sweet" || tasteType == "Sour" || tasteType == "Spicy") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("Respone Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid TasteType" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updatedMenuItem = req.body;

    const response = await MenuItem.findByIdAndUpdate(
      menuItemId,
      updatedMenuItem,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!response) {
      return res.status(404).json({ message: "Menu Item Not Found" });
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
    const menuItemId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuItemId);
    if (!response) {
      return res.status(404).json({ message: "Menu Item Not Found" });
    }
    console.log("Data Deleted");
    res.status(200).json({message:"Data Deleted Succesfully"});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
