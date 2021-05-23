const express = require("express");
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet.referrerPolicy({ policy: "same-origin"}));
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", "'unsafe-eval'"],
            connectSrc: ["'self'", "https://ya-praktikum.tech/api/v2/", "wss://ya-praktikum.tech/ws/chats/"],
            fontSrc: ["'self'"],
            imgSrc: ["'self'", "https://ya-praktikum.tech/api/v2/resources/"],
            manifestSrc: ["'self'"],
            mediaSrc: ["'self'"],
            objectSrc: ["'none'"],
            scriptSrc: ["'self'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"]
        }
    })
);

app.use(express.static(__dirname + "/dist"));

app.get('/*', (req, res) => {
    res.sendFile(__dirname +"/dist/index.html");
});


app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}!`);
});