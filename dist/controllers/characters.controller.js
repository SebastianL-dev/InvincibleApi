import { findAllCharacters, findCharacterById, } from "../services/characters.service.js";
import { BadRequestError, NotFoundError, } from "../utils/errors/custom/client.errors.js";
export async function getAllCharacters(req, res, next) {
    try {
        const characters = await findAllCharacters();
        if (!characters || characters.length === 0)
            throw new NotFoundError("Oops!! No characters found");
        res.status(200).json(characters);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}
export async function getCharacterById(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id) || id <= 0)
            throw new BadRequestError("Oops! You entered an invalid character Id");
        const character = await findCharacterById(id);
        if (!character)
            throw new NotFoundError("Oops! No character found");
        res.status(200).json(character);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}
