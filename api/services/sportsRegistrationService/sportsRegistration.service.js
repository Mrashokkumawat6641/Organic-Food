import CustomError from "../../../utils/response.js";
import { SportsRegistraionPlayer } from "../../models/sportsregistrationModels/sportsRegistration.model.js";


export const registerSportsPlayer = async ({
    coachname,
    middleName,
    photo,
    age,
    gender,
    city,
    state,
    mobile,
    altMobile,
    selectedGameType,
    selectedGame,
    playerName,
    playerAge,
    playerGender,
    playerCity,
    playerState,
    playerPhoto,
    playerAdharPhoto
}) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
        throw new CustomError("Please enter a valid 10-digit mobile number", 400);
    }
    if (altMobile && !mobileRegex.test(altMobile)) {
        throw new CustomError("Please enter a valid 10-digit alterna    te mobile number", 400);
    }
    if (!selectedGameType || !["indoor", "outdoor"].includes(selectedGameType)) {
        throw new CustomError("Selected game type must be either 'indoor' or 'outdoor'", 400);
    }
    if (!selectedGame || !["Badminton", "Table Tennis", "Chess", "Carrom", "Wrestling", "Cricket"].includes(selectedGame)) {
        throw new CustomError("Selected game must be one of the predefined games", 400);
    }
    if (mobile === altMobile) {
        throw new CustomError("Mobile and alternate mobile numbers cannot be the same", 400);
    }
    // Validate player age
    if (playerAge < 5 || playerAge > 100) {
        throw new Error("Player age must be between 5 and 100", 400);
    }

    const newPlayer = new SportsRegistraionPlayer({

        coachname,
        middleName,
        photo,
        age,
        gender,
        city,
        state,
        mobile,
        altMobile,
        selectedGameType,
        selectedGame,
        playerName,
        playerAge,
        playerGender,
        playerCity,
        playerState,
        playerPhoto,
        playerAdharPhoto
    });

    await newPlayer.save();
    return {
        message: "Sports player registered successfully",
        newPlayer
    };
}