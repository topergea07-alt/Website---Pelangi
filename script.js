// ========================================
// MENU MOBILE
// ========================================

function toggleMenu() {
    const menu = document.querySelector(".nav-menu");

    menu.classList.toggle("active");
}


// ========================================
// TUTUP MENU SETELAH LINK DIKLIK
// ========================================

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        const menu = document.querySelector(".nav-menu");

        menu.classList.remove("active");

    });

});


// ========================================
// FORM KONTAK
// ========================================

const contactForm = document.querySelector(".contact-form form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "Terima kasih! Pesan kamu berhasil dikirim."
        );

        contactForm.reset();

    });

}


// ========================================
// ANIMASI SAAT SCROLL
// ========================================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(

    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);


sections.forEach(function(section) {

    section.classList.add("hidden");

    observer.observe(section);

});


// ========================================
// TAHUN OTOMATIS DI FOOTER
// ========================================

const footerText = document.querySelector(
    ".footer-bottom p"
);

if (footerText) {

    const currentYear = new Date().getFullYear();

    footerText.innerHTML =
        "© " +
        currentYear +
        " Nama Organisasi. All Rights Reserved.";

}