const express = require("express");
const app = express();
const morgan = require ("morgan");
const mongoose = require("mongoose");
const port = 5000;

// Din unika länk från Atlas (glöm inte att skriva in ditt lösenord!)
const dbURI = 'mongodb+srv://alvols238_db_user:AlvinAlvarGA@fonsterputs.nqcsayp.mongodb.net/fonsterputs';

mongoose.connect(dbURI)
  .then(() => console.log('Kontakt med molndatabasen Atlas upprättad!'))
  .catch((err) => console.error('Kunde inte ansluta till Atlas:', err));

app.set("view engine", "pug");
app.set("views", "./views")

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.listen(port, () =>{
    console.log("hej");
});

app.get("/", (req,res) => {
res.render("index");
});

app.post("/form", async (req,res)=>{
    console.log(req.body)
    res.send("Bullseye")
})

app.get("/omoss", (req,res) => {
    res.render("omoss");
});

app.post("/tack", (req,res) => {
  console.log("Kontaktformulär skickat:", req.body);
    res.render("tack");
});


app.post('/boka', async (req, res) => {
    try {
        const nyBokning = new Booking({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            propertyType: req.body.propertyType
        });

        // Här sparar vi den till MongoDB Atlas
        await nyBokning.save();
        
        res.send('Bokningen är nu sparad i databasen!');
    } catch (err) {
        res.status(500).send('Ett fel uppstod: ' + err.message);
    }
});