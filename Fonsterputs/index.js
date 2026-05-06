const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const port = 5001;

const Booking = require("./models/Booking");

const dbURI =
  "mongodb+srv://alvols238_db_user:AlvinAlvarGA@fonsterputs.nqcsayp.mongodb.net/fonsterputs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

mongoose
  .connect(dbURI)
  .then(() => console.log("Kontakt med molndatabasen Atlas upprättad!"))
  .catch((err) => console.error("Kunde inte ansluta till Atlas:", err));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.listen(port, () => {
  console.log("hej");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/tack", (req, res) => {
  res.render("tack");
});

app.get("/omoss", (req, res) => {
  res.render("omoss");
});

app.post("/form", async (req, res) => {
  console.log(req.body);
  res.redirect("/tack");
});

app.post("/tack", (req, res) => {
  console.log("Kontaktformulär skickat:", req.body);
  res.render("tack");
});

app.post("/boka", async (req, res) => {
  try {
    await Booking.create({
      name: req.body.name,
      email: req.body.email,
      adress: req.body.address,
      propertyType: req.body.propertyType,
      meddelande: req.body.meddelande,
    });

    const mailOptions = {
      from: "ungfonsterputs@gmail.com", // Ändra till din e-postadress
      to: "ungfonsterputs@gmail.com", // Skicka till den e-postadress som användaren angav
      subject: `Ny putsning bokad av ${req.body.name}`,
      text: `Namn: ${req.body.name}\nE-post: ${req.body.email}\nAdress: ${req.body.address}\nTyp av bostad: ${req.body.propertyType}\nMeddelande: ${req.body.meddelande}`,
    };

    await transporter.sendMail(mailOptions);
    res.redirect("/tack");
  } catch (err) {
    console.error("E-post eller bokning misslyckades:", err);
    res.status(500).send("Ett fel uppstod: " + err.message);
  }
});
