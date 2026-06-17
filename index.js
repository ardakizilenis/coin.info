import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3030;
const baseUrl = 'https://api.coinranking.com/v2';
const newsApiKey = '8d7d57cbfa004157a69cf209b7339d14';
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

app.get("/trending", (req, res) => {
    if (req.query.timePeriod) {
        fetch(`${baseUrl}/coins/trending?timePeriod=${req.query.timePeriod}`, options)
            .then((response) => response.json())
            .then((result) => {
                res.render("trending.ejs", {
                    currentPage : "trending",
                    coinlist : JSON.stringify(result.data.coins)
                })
            })
    } else {
        fetch(`${baseUrl}/coins/trending`, options)
            .then((response) => response.json())
            .then((result) => {
                res.render("trending.ejs", {
                    currentPage : "trending",
                    coinlist : JSON.stringify(result.data.coins)
                })
            })
    }
})

app.get("/news", async (req, res) => {
    console.log(req.query.sortBy)
    try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=Crypto&sortBy=${req.query.sortBy}&language=en&apiKey=${newsApiKey}`);
    res.render("news.ejs", {
        currentPage : "news",
        news: JSON.stringify(response.data)
    })
  } catch (e) {
    console.error(e.message);
  }
})

app.get('/about', (req, res) => {
  res.render('about.ejs', { currentPage: 'about' });
});

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