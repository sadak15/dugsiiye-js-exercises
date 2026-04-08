

const toggleButton = document.querySelector(".toggle-button");

const navbar = document.querySelector(".navbar");

const navLinks = document.querySelectorAll(".nav-links a");


toggleButton.addEventListener("click", function(){
    navbar.classList.toggle("active")
})


navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault(); // stop default jump

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: "smooth"
        });

        navbar.classList.remove("active");
    });
});