/* =========================================================
   PELANGI
   WEBSITE ORGANISASI
   JAVASCRIPT
========================================================= */


/* =========================================================
   PAGE READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* Tandai bahwa JavaScript aktif */
    document.documentElement.classList.add("js-enabled");


    /* Jalankan semua fitur */
    initMobileMenu();
    initNavbarScroll();
    initScrollReveal();
    initActiveMenu();
    initBackToTop();
    initCurrentYear();
    initSmoothScroll();

});


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");


    if (!menuToggle || !navMenu) {
        return;
    }


    /* Buka / tutup menu */

    menuToggle.addEventListener("click", function () {

        const isOpen =
            navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* Tutup menu setelah memilih menu */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* Tutup jika klik di luar menu */

    document.addEventListener("click", function (event) {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedButton =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================================
   NAVBAR SAAT SCROLL
========================================================= */

function initNavbarScroll() {

    const navbar =
        document.querySelector(".navbar");


    if (!navbar) {
        return;
    }


    function updateNavbar() {

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* Jalankan sekali saat halaman dibuka */

    updateNavbar();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".section-title, " +
            ".about-text, " +
            ".about-highlight, " +
            ".vision-card, " +
            ".value-card, " +
            ".activity-card, " +
            ".structure-card, " +
            ".gallery-item, " +
            ".news-card, " +
            ".contact-card"
        );


    if (!elements.length) {
        return;
    }


    /*
       Jika browser tidak mendukung
       IntersectionObserver, tampilkan semua.
    */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(function (element) {

            element.classList.add("show");

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(function (element) {

        /*
           Gunakan class yang sudah
           didukung CSS.
        */

        element.classList.add("reveal");

        observer.observe(element);

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveMenu() {

    const sections =
        document.querySelectorAll(
            "header[id], section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    function updateActiveMenu() {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveMenu,
        { passive: true }
    );


    updateActiveMenu();

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const backToTop =
        document.querySelector(
            ".back-to-top"
        );


    if (!backToTop) {
        return;
    }


    function updateBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateBackToTop();

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const yearElement =
        document.getElementById(
            "current-year"
        );


    if (!yearElement) {
        return;
    }


    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


                /*
                   Kalau href cuma "#",
                   jangan melakukan apa-apa.
                */

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const navbar =
                    document.querySelector(
                        ".navbar"
                    );


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   ESCAPE KEY
   Menutup mobile menu dengan tombol ESC
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        const navMenu =
            document.querySelector(
                ".nav-menu"
            );

        const menuToggle =
            document.querySelector(
                ".menu-toggle"
            );


        if (!navMenu) {
            return;
        }


        navMenu.classList.remove(
            "active"
        );


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);
