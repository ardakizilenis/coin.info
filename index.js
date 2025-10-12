import express, { response } from "express";

const app = express();
const port = 3030;
const baseUrl = 'https://api.coinranking.com/v2';
const options = {
        headers: {
            'x-access-token': 'coinranking346cf11fbefb313ffedb6e7cf7c883379b422f8336b4bb4d'
        }
    };

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        currentPage : "index"
    });
})

app.get("/coins", (req, res) => {
    const query = (req.query.q || "").toLowerCase();
    if(query) {
        fetch(`${baseUrl}/search-suggestions?query=${query}&limit=5`, options)
            .then((response) => response.json())
            .then((result) => {
                res.render("search.ejs", {
                    currentPage : "search",
                    coinlist : JSON.stringify(result.data.coins)
                });
                console.log(result.data.coins);
            })
    }
    else{
        fetch(`${baseUrl}/coins?limit=100`, options)
            .then((response) => response.json())
            .then((result) => {
                res.render("coins.ejs", {
                    currentPage : "coins",
                    coinlist : JSON.stringify(result.data.coins)
                });
            });
    }
})

app.get("/search", (req, res) => {
    const query = (req.query.q || "").toLowerCase();
    fetch(`${baseUrl}/search-suggestions?query=${query}`, options)
            .then((response) => response.json())
            .then((result) => {
                res.render("search.ejs", {
                    currentPage : "search",
                    coinlist : JSON.stringify(result.data.coins)
                });
                console.log(result.data.coins);
            })
})

app.get("/coinpage/:uuid", (req, res) => {
    fetch(`${baseUrl}/coin/${req.params.uuid}`, options)
        .then((response) => response.json())
        .then((result) => {
            console.log(result.data.coin);
            res.render("coinpage.ejs", {
                currentPage : "coinpage",
                coin : JSON.stringify(result.data.coin)
            })
        });

})

app.listen(port, () => {
    console.log("Listening on port "+port);
})