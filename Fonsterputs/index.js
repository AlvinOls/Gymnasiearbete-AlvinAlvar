// Vänta på att dokumentet laddats helt
document.addEventListener("DOMContentLoaded", function() {
    
    const contactForm = document.getElementById("contactForm");
    const responseMessage = document.getElementById("formResponse");

    // Hantera när formuläret skickas
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Hindra sidan från att laddas om

        // Här skulle man normalt skicka data till en server
        // För detta projekt döljer vi bara formuläret och visar ett tack-meddelande
        contactForm.style.display = "none";
        responseMessage.classList.remove("hidden");
        
        console.log("Formulär skickat!");
    });

    // Enkel effekt: Ändra transparens på nav-baren när man skrollar
    window.addEventListener("scroll", function() {
        const nav = document.querySelector("nav");
        if (window.scrollY > 50) {
            nav.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        } else {
            nav.style.backgroundColor = "#ffffff";
        }
    });
});