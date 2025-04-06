require("dotenv").config();

const config = {
    geminiApiKey: process.env.GEMINI_API_KEY,
    weatherApiKey: process.env.WEATHER_API_KEY,
    port: process.env.PORT || 5000
};

module.exports = config;

