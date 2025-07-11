import express from 'express';
import { sportsRegistrationController } from "../../controllers/SportsController/sportsRegistration.controller.js";


const router = express.Router();


// Route to register a sports player
router.post('/registerPlayer', sportsRegistrationController);

export default router;