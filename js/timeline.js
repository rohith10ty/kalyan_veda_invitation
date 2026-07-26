gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {

    const section = document.querySelector(".timeline-section");
    const svg = document.querySelector(".journey-svg");
    const progress = document.querySelector("#journeyProgress");
    const base = document.querySelector("#journeyBase");
    const heart = document.querySelector("#journeyHeart");
    const cards = document.querySelectorAll(".journey-card");

    if (!section || !svg || !progress || !base || !heart) return;

    // ------------------------------------
    // Draw line
    // ------------------------------------

    const totalLength = base.getTotalLength();

    progress.style.strokeDasharray = totalLength;
    progress.style.strokeDashoffset = totalLength;

    // ------------------------------------
    // Card Animation
    // ------------------------------------

    cards.forEach((card, index) => {

        gsap.from(card, {

            opacity: 0,
            y: 80,
            duration: 0.8,
            ease: "power3.out",

            scrollTrigger: {

                trigger: card,
                start: "top 85%"

            }

        });

    });

    // ------------------------------------
    // Timeline Animation
    // ------------------------------------

    ScrollTrigger.create({

        trigger: section,

        start: "top top",

        end: "bottom bottom",

        scrub: 1,

        invalidateOnRefresh: true,

        onUpdate: self => {

            const progressValue = self.progress;

            // Draw Gold Line

            progress.style.strokeDashoffset =
                totalLength * (1 - progressValue);

            // Heart Position

            const point = base.getPointAtLength(totalLength * progressValue);

const svgRect = svg.getBoundingClientRect();
const sectionRect = section.getBoundingClientRect();

const viewBox = svg.viewBox.baseVal;

const scaleX = svg.clientWidth / viewBox.width;
const scaleY = svg.clientHeight / viewBox.height;

const x = svgRect.left - sectionRect.left + point.x * scaleX;
const y = point.y * scaleY;

gsap.set(heart, {
    x: x,
    y: y,
    xPercent: -50,
    yPercent: -50
});

        }

    });

});

window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});

window.addEventListener("orientationchange", () => {
    ScrollTrigger.refresh();
});