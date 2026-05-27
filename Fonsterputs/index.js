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

app.get("/admin-bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.render("admin-bookings", { bookings });
  } catch (err) {
    console.error("Kunde inte hämta bokningar:", err);
    res.status(500).send("Ett fel uppstod vid hämtning av bokningar.");
  }
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
      from: "ungfonsterputs@gmail.com", 
      to: "ungfonsterputs@gmail.com", 
      subject: `Ny putsning bokad av ${req.body.name}`,
      text: `Namn: ${req.body.name}\nE-post: ${req.body.email}\nAdress: ${req.body.address}\nTyp av bostad: ${req.body.propertyType}\nMeddelande: ${req.body.meddelande}`,
    };


    const mailOptionsUser = {
  from: "ungfonsterputs@gmail.com",
  to: req.body.email,
  subject: `Bekräftelse på din bokning`,
  text: `Hej ${req.body.name},\n\nTack för din bokning av putsning. Vi har tagit emot din bokning och kommer att kontakta dig inom kort.\n\nVänliga hälsningar,\nUngFonsterputs`
};


    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptionsUser);
    res.redirect("/tack");
  } catch (err) {
    console.error("E-post eller bokning misslyckades:", err);
    res.status(500).send("Ett fel uppstod: " + err.message);
  }
});






