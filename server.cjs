const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv")

dotenv.config();

const uri = process.env.MONGODB_URI;

const app = express();

app.use(bodyParser.json());

// Register น่ะจะ
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    try {
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("users");
        const user = await collection.insertOne({ username: username, password: password });
        res.json({
            success: true,
            message: "Register successful",
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Register failed",
            });
    } finally {
        await client.close();
    }
});


// Login น่ะจะ
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const mockUsername = "admin";
    const mockPassword = "admin";

    if (username === mockUsername && password === mockPassword) {
        res.json({
            success: true,
            message: "Login sucessful",
        });
    } else {
        res.json({
        success: false,
        message: "Login failed",
    });
}
});


app.listen(8080, () => {
  console.log("Server running on port http://localhost:8080");
});
