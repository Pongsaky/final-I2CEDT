import Food from "../models/foodModel.js";

/** @type {import("express").RequestHandler} */
export const createItem = async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

/** @type {import("express").RequestHandler} */
export const getItems = async (req, res) => {
  const foods = await Food.find();

  res.status(200).json(foods);
};

/** @type {import("express").RequestHandler} */
export const editItem = async (req, res) => {
  try {
    const updated = await Food.findByIdAndUpdate(req.params.id, req.body);

    if (updated) {
      res.status(200).json({ message: "OK" });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

/** @type {import("express").RequestHandler} */
export const deleteItem = async (req, res) => {
  // TODO: Student's Work - Implement Delete Food
  try {
    const deleted = await Food.findByIdAndDelete(req.params.id);

    if (deleted) {
      res.status(200).json({ message: "OK" });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};
