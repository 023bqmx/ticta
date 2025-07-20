const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

/*
const mockUserData = [{
    username: "admin",
    password: "admin"
},
{
    username: "guest",
    password: "guest"
}]
*/
    

//Login
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const mockUsername = "admin";
    const mockPassword = "admin";

    if (username === mockUsername && password === mockPassword) {
        res.json({
            success: true,
            message: "Login sucessful",
            token: "encrypted token goes here",
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
