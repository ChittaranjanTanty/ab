const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");
const advisoryRoutes = require("./routes/advisoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", advisoryRoutes);

app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
});

