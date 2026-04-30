

const btns = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".content");

const startSection = document.querySelector("#start");
const navbar = document.querySelector(".navbar");


// Start Screen
window.addEventListener("scroll", function(){
    const scrollHeight = window.pageYOffset;
    const navbarHeight = startSection.getBoundingClientRect().height;
    if(scrollHeight > navbarHeight){
        navbar.classList.add("fixed-nav");
    }else{
        navbar.classList.remove("fixed-nav");
    }
})


// Navbar
btns.forEach(function(btn){
    btn.addEventListener("click", function(e){
        const id = e.currentTarget.dataset.id;
        // toggle buttons
        btns.forEach(function(b){
            b.classList.remove("active");
        })
        e.currentTarget.classList.add("active");

        // Toggle contents
        contents.forEach(function(c){
            if(c.id === id){
                c.classList.add("active");
            }else{
                c.classList.remove("active");
            }
        })

    })
})