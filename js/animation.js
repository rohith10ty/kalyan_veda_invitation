gsap.registerPlugin(ScrollTrigger);

// Animate all sections
gsap.utils.toArray(".section").forEach((section) => {

    gsap.from(section.children, {

        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",

        scrollTrigger: {

            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none"

        }

    });

});