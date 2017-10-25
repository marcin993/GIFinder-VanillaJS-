/*!
GIFinder UI Scripts
*/

var navToggle = document.querySelector(".nav-toggle .fa-bars"),
    nav = document.querySelector("nav"),
    closeNav = nav.querySelector(".fa-times");

navToggle.addEventListener("click", function() {
    nav.classList.toggle("open");
});

closeNav.addEventListener("click", function() {
    nav.classList.remove("open");
});
