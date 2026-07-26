// ================= LOADER =================

window.addEventListener("load", function () {

    setTimeout(() => {

        document.getElementById("loader").classList.add("loader-hide");

    }, 1500);

});


// ================= MUSIC =================

const music = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn.addEventListener("click", () => {

    if (playing) {

        music.pause();

        musicBtn.innerHTML = "🔇";

    } else {

        music.play();

        musicBtn.innerHTML = "🔊";

    }

    playing = !playing;

});


// ================= OPEN BUTTON =================

const openBtn = document.querySelector(".open-btn");

const hero = document.querySelector(".hero");

const main = document.getElementById("mainContent");

openBtn.addEventListener("click", () => {

    music.play();

    playing = true;

    musicBtn.innerHTML = "🔊";

    gsap.to(hero,{

        opacity:0,

        duration:1,

        scale:1.08,

        ease:"power2.out",

        onComplete: () => {

    hero.style.display = "none";

    main.style.display = "block";

    setTimeout(() => {

    window.dispatchEvent(new Event("resize"));

}, 100);

    window.scrollTo(0, 0);

    gsap.from("#mainContent", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power2.out"
    });

}

    });

});

// =============================
// Flower Petals
// =============================

// =============================
// Flower Petals
// =============================

const petalsContainer = document.getElementById("petals");

const petals = [
    "assets/images/petal1.png",
    "assets/images/petal2.png",
    "assets/images/petal3.png",
    "assets/images/petal4.png",
    "assets/images/petal5.png"
];

function createPetal(){

    const petal = document.createElement("img");

    const randomPetal =
        petals[Math.floor(Math.random()*petals.length)];

    petal.src = randomPetal;

    petal.classList.add("petal");

    petal.style.left =
        Math.random() * window.innerWidth + "px";

    petal.style.animationDuration =
        (6 + Math.random()*5) + "s";

    petal.style.opacity =
        Math.random() * 0.5 + 0.5;

    petal.style.width =
        (20 + Math.random()*25) + "px";

    petalsContainer.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    },11000);

}

setInterval(createPetal,700);

window.addEventListener("load", () => {

    gsap.from(".hero h4", {
        opacity: 0,
        y: -30,
        duration: 0.8,
        delay: 1.6
    });

    gsap.from(".hero h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.9,
        stagger: 0.2
    });

    gsap.from(".hero span", {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        delay: 2.2
    });

    gsap.from(".hero p", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 2.4
    });

});

/*=====================================
        PREMIUM SCRATCH CARD
======================================*/

const canvas = document.getElementById("scratchCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const gold = ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            canvas.height
        );

        gold.addColorStop(0, "#f7e28c");
        gold.addColorStop(.5, "#d4af37");
        gold.addColorStop(1, "#b8860b");

        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = gold;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255,255,255,.35)";
        ctx.font = "bold 34px Poppins";
        ctx.textAlign = "center";

        ctx.fillText(
            "Scratch Here",
            canvas.width / 2,
            canvas.height / 2 + 12
        );
    }

    setTimeout(() => {

    resizeCanvas();

}, 100);

window.addEventListener("resize", resizeCanvas);

    let scratching = false;

    function scratch(x, y) {

        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();

        ctx.arc(x, y, 22, 0, Math.PI * 2);

        ctx.fill();

    }

    function getPosition(e) {

        const rect = canvas.getBoundingClientRect();

        if (e.touches) {

            return {

                x: e.touches[0].clientX - rect.left,

                y: e.touches[0].clientY - rect.top

            };

        }

        return {

            x: e.clientX - rect.left,

            y: e.clientY - rect.top

        };

    }

    canvas.addEventListener("mousedown", () => {

        scratching = true;

    });

    canvas.addEventListener("mouseup", () => {

        scratching = false;

        revealCheck();

    });

    canvas.addEventListener("mouseleave", () => {

        scratching = false;

    });

    canvas.addEventListener("mousemove", e => {

        if (!scratching) return;

        const pos = getPosition(e);

        scratch(pos.x, pos.y);

    });

    canvas.addEventListener("touchstart", e => {

        scratching = true;

    });

    canvas.addEventListener("touchend", () => {

        scratching = false;

        revealCheck();

    });

    canvas.addEventListener("touchmove", e => {

        e.preventDefault();

        if (!scratching) return;

        const pos = getPosition(e);

        scratch(pos.x, pos.y);

    }, { passive:false });

    function revealCheck() {

        const pixels = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        ).data;

        let transparent = 0;

        for (let i = 3; i < pixels.length; i += 4) {

            if (pixels[i] === 0) {

                transparent++;

            }

        }

        const percent =
            transparent /
            (canvas.width * canvas.height);

        if (percent > 0.45) {

            canvas.style.transition = "opacity .7s";

            canvas.style.opacity = "0";

            setTimeout(() => {

                canvas.style.display = "none";

            },700);

        }

    }

}