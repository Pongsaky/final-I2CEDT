import express from "express";

import * as itemController from "../controllers/foodController.js";

const router = express.Router();

router.get("/", itemController.getItems);
router.post("/", itemController.createItem);
router.delete("/:id", itemController.deleteItem);

export default router;
