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
    response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {Accept: "application/json"}
    });
    backendJoke = response.data.joke;
    console.log(response);
    res.render("home.ejs", {
        joke: backendJoke,
    })
});

app.get("/generate", async (req, res) => {
    response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {Accept: "application/json"}
    });
    backendJoke = response.data.joke;
    console.log(response);
    res.render("home.ejs", {
        joke: backendJoke,
    })
});

app.post("/save", (req, res) => {
    let retreivedJoke = req.body.jokeKey;
    savedJokes.push(retreivedJoke);
    console.log("Saved Jokes: ", savedJokes);
    res.status(200);
});

app.post("/filter", (req, res) => {
    choice = req.body.choose_category;
    console.log("Choice: ", choice);
    if (choice == 1) {
        data = "Cat joke";
    }
    else if (choice == 2) {
        data = "Dog joke";
    }
    else if (choice  == 3) {
        data = "Sport joke";
    }
    res.render("home.ejs", {
        joke: data,
    })
});






















app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})