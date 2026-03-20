const { Router } = require("express");
const { pool } = require("./db");

const router = Router();

// GET all
router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM products ORDER BY id");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET one
router.get("/:id", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST
router.post("/", async (req, res) => {
    const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;

    if (
        campo1 === undefined || campo2 === undefined || campo3 === undefined ||
        campo4 === undefined || campo5 === undefined || campo6 === undefined
    ) {
        return res.status(422).json({ error: "All fields are required" });
    }

    if (typeof campo1 !== "string" || typeof campo2 !== "string" || typeof campo3 !== "string") {
        return res.status(422).json({ error: "campo1, campo2, campo3 must be strings" });
    }
    if (!Number.isInteger(campo4)) {
        return res.status(422).json({ error: "campo4 must be an integer" });
    }
    if (typeof campo5 !== "number") {
        return res.status(422).json({ error: "campo5 must be a number" });
    }
    if (typeof campo6 !== "boolean") {
        return res.status(422).json({ error: "campo6 must be a boolean" });
    }

    try {
        const { rows } = await pool.query(
            `INSERT INTO products (campo1, campo2, campo3, campo4, campo5, campo6)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [campo1, campo2, campo3, campo4, campo5, campo6]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT
router.put("/:id", async (req, res) => {
    const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;

    if (
        campo1 === undefined || campo2 === undefined || campo3 === undefined ||
        campo4 === undefined || campo5 === undefined || campo6 === undefined
    ) {
        return res.status(422).json({ error: "All fields are required" });
    }

    if (typeof campo1 !== "string" || typeof campo2 !== "string" || typeof campo3 !== "string") {
        return res.status(422).json({ error: "campo1, campo2, campo3 must be strings" });
    }
    if (!Number.isInteger(campo4)) {
        return res.status(422).json({ error: "campo4 must be an integer" });
    }
    if (typeof campo5 !== "number") {
        return res.status(422).json({ error: "campo5 must be a number" });
    }
    if (typeof campo6 !== "boolean") {
        return res.status(422).json({ error: "campo6 must be a boolean" });
    }

    try {
        const { rows } = await pool.query(
            `UPDATE products SET campo1=$1, campo2=$2, campo3=$3, campo4=$4, campo5=$5, campo6=$6
       WHERE id=$7 RETURNING *`,
            [campo1, campo2, campo3, campo4, campo5, campo6, req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const { rows } = await pool.query("DELETE FROM products WHERE id = $1 RETURNING id", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;