import express, { response } from "express";
import ejs from "ejs";
import axios from "axios";

const app = express();
const port = 3030;
const baseUrl = 'https://api.coinranking.com/v2';
const apiToken = 'coinranking346cf11fbefb313ffedb6e7cf7c883379b422f8336b4bb4d';

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.redirect("/home");
})

app.get("/home", (req, res) => {
    res.render("index.ejs", {
        currentPage : "index"
    });
})

app.get("/coins", (req, res) => {
    const options = {
        headers: {
            'x-access-token': apiToken
        }
    };
    fetch('https://api.coinranking.com/v2/coins', options)
        .then((response) => response.json())
        .then((result) => {
            res.render("coins.ejs", {
                currentPage : "coins",
                coinlist : JSON.stringify(result.data.coins)
            });
        });
});



app.listen(port, () => {
    console.log("Listening on port "+port);
})