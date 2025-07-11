import { registerSportsPlayer } from "../../services/sportsRegistrationService/sportsRegistration.service.js";
import { successResponse, errorResponse } from "../../../utils/response.js";

export const sportsRegistrationController = async (req, res) => {
    // #swagger.tags = ['SportsAuth']
    // #swagger.summary = 'Sports user login'
    // #swagger.description = 'This endpoint allows sports users to log in using mobile and password.'
    /*  #swagger.parameters['body'] = {
          in: 'body',
          description: 'Sports user login details',
          required: true,
          schema: {
                $coachname: "John Doe",
                $middleName: "Michael",
                $photo: "https://example.com/photo.jpg",
                $age: "35",
                $gender: "male",
                $city: "Jaipur",
                $state: "Rajasthan",
                $mobile: "9876543210",
                $altMobile: "9876543211",
                $selectedGameType: "outdoor",
                $selectedGame: "Cricket",
                $playerName: "Rahul Sharma",
                $playerAge: "19",
                $playerCity: "Ajmer",
                $playerState: "Rajasthan",
                $playerPhoto: "https://example.com/player.jpg",
                $playerAdharPhoto: "https://example.com/adhar.jpg"
                 }
}
        */


    try {
        const result = await registerSportsPlayer(req.body);
        return successResponse(res, {
            message: result.message,
            newPlayer: result.newPlayer,
        }, 201);
    } catch (error) {
        console.error('Register error:', error);
        return errorResponse(res, error.message, 500);
    }
};