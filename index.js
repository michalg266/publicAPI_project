// needed imports
import express from "express";
import axios  from "axios";
import bodyParser from "body-parser";


const port = 3000;
const app=express();

let choice;
let data;
let response;
let backendJoke;

let toSave;
let savedJokes = [];

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    const response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {Accept: "application/json"}
    });
    const backendJoke = response.data.joke;
    res.render("home.ejs", {
        joke: backendJoke,
    })
});

app.get("/generate", async (req, res) => {
    try {
        response = await axios.get("https://icanhazdadjoke.com/", {
            headers: {Accept: "application/json"}
        });
        backendJoke = response.data.joke;
        res.json({backendJoke});
    } catch(error) {
        console.error("Could not fetch a joke: ", error);
        res.status(500).json({error: "Could not fetch a joke"})
    }
});

app.post("/save", (req, res) => {
    let retreivedJoke = req.body.jokeKey;
    if (savedJokes.length == 0) {
        savedJokes.push(retreivedJoke);
    }
    else if (retreivedJoke == savedJokes[savedJokes.length - 1]) {
        console.log("Trying to save a joke that has been already saved");
    }
    else {
        savedJokes.push(retreivedJoke);
    }
    res.status(200).send("Saved!!!");
});

app.post("/filter", async (req, res) => {
    try {
    choice = req.body.choose_category;
    response = await axios.get(`https://icanhazdadjoke.com/search?term=${choice}`, {
        headers: {Accept: "application/json"}
    });
    response = response.data.results;
    let randomNumber = Math.floor(Math.random()*response.length);
    backendJoke = response[randomNumber].joke;
    res.json({backendJoke});

    } catch(error) {
        console.log("Could not fetch a joke from that category");
        res.status(500).json({error: "Could not fetch a joke from that category"});
    }

});

app.get("/saved", (req, res) => {
    res.render("saved_jokes.ejs", {
        savedJokesBackend: savedJokes,
    });


});






















app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})