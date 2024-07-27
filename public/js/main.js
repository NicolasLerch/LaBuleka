

//Next and prev controls

const plusSlides = (n) => {
    showSlides(slideIndex += n);
}

// CONTROL DE MENU HAMBURGUESA
document.addEventListener("DOMContentLoaded", function() {
    var dropdown = document.getElementsByClassName("dropdown");
    var i;

    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var dropdownContent = this.getElementsByClassName("dropdown-content")[0];
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
});


// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

const showSlides = (n) => {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length){
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i=0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

let slideIndex = 1;
showSildes(slideIndex);