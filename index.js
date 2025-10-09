import express from "express";
import ejs from "ejs";
import axios from "axios";

const app = express();
const port = 3030;

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log("Listening on port "+port);
})