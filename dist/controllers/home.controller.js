export default async function (req, res, next) {
    try {
        // Get current base url
        const baseUrl = `${req.protocol}://${req.get("host")}/api`;
        // Routes availables to use
        const routes = {
            characters: `${baseUrl}/characters`,
            species: `${baseUrl}/species`,
            locations: `${baseUrl}/locations`,
        };
        res.status(200).json(routes);
    }
    catch (error) {
        const typedError = error;
        console.error(typedError);
        next(typedError);
    }
}
