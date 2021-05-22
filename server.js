const express = require("express");
const helmet = require("helmet");
const app = express();
const PORT = 3000;

app.use(helmet.referrerPolicy({ policy: "same-origin"}));
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "https://ya-praktikum.tech/api/v2/"],
            fontSrc: ["'self'"],
            imgSrc: ["'self'", "https://ya-praktikum.tech/api/v2/resources/"],
            manifestSrc: ["'self'"],
            mediaSrc: ["'self'"],
            objectSrc: ["'none'"],
            // TODO: Без 'unsafe-eval' ломается загрузка handlebars. Параметр будет удалён после добавления Webpack и установки hb
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js", "'unsafe-eval'"],
            styleSrc: ["'self'"],
        }
    })
);

app.use(express.static(__dirname + "/static"));
app.use("/static/assets", express.static(__dirname + "/static/assets"));
app.use("/dist", express.static(__dirname + "/dist"));

app.get('/*', (req, res) => {
    res.sendFile(__dirname +"/static/index.html");
});


app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}!`);
});