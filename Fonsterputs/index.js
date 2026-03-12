const express = require("express");
const app = express();
const morgan = require ("morgan");

const port = 5000;

app.set("view engine", "pug");
app.set("views", "./views")

app.use(express.static("public"));
app.use(morgan("dev"));

app.listen(port, () =>{
    console.log("hej");
});

app.get("/", (req,res) => {
res.render("index");
});
