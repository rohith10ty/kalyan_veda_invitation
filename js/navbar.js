const header = document.getElementById("header");

function updateNavbar() {

    if (window.scrollY > 0) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

}

// Run immediately on page load
updateNavbar();

// Run whenever the page scrolls
window.addEventListener("scroll", updateNavbar);