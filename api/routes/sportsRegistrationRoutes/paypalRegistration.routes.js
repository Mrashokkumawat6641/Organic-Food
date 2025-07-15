import express from "express";
import { createOrder, captureOrder } from "../../controllers/SportsController/paypalRegistration.controller.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/capture-order/:orderID", captureOrder);

export default router;
