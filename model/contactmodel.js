const mongoose = require("mongoose");

const contactDetailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneno: {
      type: String,
      default: ""
    },

    city: {
      type: String,
      default: ""
    },

    address: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactDetailSchema);