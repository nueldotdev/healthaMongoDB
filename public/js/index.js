// Page logic

var navbar = document.querySelector(".landing-nav");

let prevScrollPos = window.scrollY;

// Event listener for scroll event
window.onscroll = function() {
    if (window.scrollY > 5) {
        let currentScrollPos = window.scrollY;

        if (prevScrollPos > currentScrollPos || currentScrollPos === 0) {
            navbar.style.top = "0";
            navbar.classList.add('sticky');
        } else {
            navbar.style.top = "-500px"; 
            navbar.classList.remove('sticky');
        }
        
        prevScrollPos = currentScrollPos;
    } else {
        navbar.style.top = "0";
        navbar.classList.remove('sticky');
    }
}



