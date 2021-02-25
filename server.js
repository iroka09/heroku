const express = require("express");
const path = require("path");

const port = process.env.PORT || 8080;
const app = express();

app.listen(port, (e)=>{
console.log(e||"Listening on port: "+port)
})


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static("./client", {
    dotFiles: "ignore",
    index: ["index.html", "index.htm"],
    redirect: false,
}));



app.get("/ejs", (req,res)=>{
    res.header("text/html");
    res.status(201)
    .render("hello")
})

app.get("/:name/:year", (req,res)=>{
    res.render("myejs", {
        req, 
        age: new Date().getFullYear() - req.params.year,
        exported: process.env.exported,
        heroku: process.env.heroku,
        redis: process.env.REDIS_URL,
        mongo: process.env.MONGODB_URI
    })
})
