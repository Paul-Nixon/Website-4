const toggleButton = document.querySelector(".fa-bars");
const headerLinks = document.querySelector(".mobile-links");

toggleButton.addEventListener("click", () => {
    toggleButton.classList.toggle("active-fa-bars");
    headerLinks.classList.toggle("active-header-menu");
})