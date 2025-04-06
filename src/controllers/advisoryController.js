const axios = require("axios");
const config = require("../config/config");
const { generateAdvisory, generateSoilAdvisory } = require("../services/geminiService");

const BASE_URL = "http://api.weatherapi.com/v1/forecast.json";

const getCropAdvisory = async (req, res) => {
    try {
        const { location, cropType, cropName, activity } = req.body;
        if (!location || !cropType || !cropName || !activity) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const response = await axios.get(BASE_URL, {
            params: { key: config.weatherApiKey, q: location, days: 5 }
        });

        const forecast = response.data.forecast.forecastday.map(day => ({
            date: day.date,
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            humidity: day.day.avghumidity,
            rainfall: day.day.daily_chance_of_rain,
            condition: day.day.condition.text
        }));

        const advisory = await generateAdvisory(cropType, cropName, activity, forecast);

        res.json({ location: response.data.location.name, cropName, forecast, advisory });

    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
};

const getSoilAdvisory = async (req, res) => {
    try {
        const { location, soilType, soilPH, nitrogen, phosphorus, potassium, moisture, concern } = req.body;
        if (!location || !soilType || !soilPH || !nitrogen || !phosphorus || !potassium || !moisture) {
            return res.status(400).json({ error: "Missing required soil parameters" });
        }

        const advisory = await generateSoilAdvisory(soilType, soilPH, nitrogen, phosphorus, potassium, moisture, location, concern);
        res.json({ location, soilType, advisory });

    } catch (error) {
        console.error("Error generating soil advisory:", error);
        res.status(500).json({ error: "Failed to generate soil advisory" });
    }
};

module.exports = { getCropAdvisory, getSoilAdvisory };