const express = require("express");
const { initDB } = require("./db");
const productRoutes = require("./routes");

const app = express();
const PORT = process.env.APP_PORT || 3000;

// CORS — obligatorio para que el frontend pueda consumir la API
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
});

app.use(express.json());

app.use("/video-games", productRoutes);

initDB()
    .then(() => {
        app.listen(PORT, () => console.log(`API running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("Failed to initialize DB:", err.message);
        process.exit(1);
    });