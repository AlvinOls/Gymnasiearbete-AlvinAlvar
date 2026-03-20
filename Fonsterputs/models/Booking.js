
document.addEventListener("DOMContentLoaded", function() {

    window.addEventListener("scroll", function() {
        const nav = document.querySelector("nav");
        if (window.scrollY > 50) {
            nav.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        } else {
            nav.style.backgroundColor = "#ffffff";
        }
    });
});