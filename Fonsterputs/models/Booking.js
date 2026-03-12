


document.addEventListener("DOMContentLoaded", function() {
    
    const contactForm = document.getElementById("contactForm");
    const responseMessage = document.getElementById("formResponse");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

       
        contactForm.style.display = "none";
        responseMessage.classList.remove("hidden");
        
        console.log("Formulär skickat!");
    });

    window.addEventListener("scroll", function() {
        const nav = document.querySelector("nav");
        if (window.scrollY > 50) {
            nav.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        } else {
            nav.style.backgroundColor = "#ffffff";
        }
    });
}); 



const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  adress: String,
  timeSlot: String,
  isConfirmed: { type: Boolean, default: false }
});