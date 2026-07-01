const express = require("express");
const router = express.Router();
const Contact = require("../model/contactmodel");

// ==========================
// Common Function (Register/Create)
// ==========================
const createUser = async (req, res) => {
  try {
    const { name, email, password, phoneno, city, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Password are required",
      });
    }

    const existingUser = await Contact.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const newUser = new Contact({
      name,
      email,
      password,
      phoneno: phoneno || "",
      city: city || "",
      address: address || "",
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Contact Saved Successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Register
// ==========================
router.post("/register", createUser);

// ==========================
// Create Contact
// ==========================
router.post("/create", createUser);

// ==========================
// Login
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Contact.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneno: user.phoneno,
        city: user.city,
        address: user.address,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================
// Get All Contacts
// ==========================
router.get("/contact-list", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================
// Get Contact By ID
// ==========================
router.get("/find-by/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact Not Found",
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================
// Update Contact
// ==========================
router.put("/update-contact-by-id/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Updated Successfully",
      contact: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================
// Delete Contact
// ==========================
router.delete("/delete-contact-by-id/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;