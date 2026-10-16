/* =========================================================
   AURA SPA MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       LUCIDE ICONS
    ===================================================== */

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }


    /* =====================================================
       AOS ANIMATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 850,

            easing: "ease-out-cubic",

            once: true,

            offset: 70,

            delay: 0

        });

    }


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");

    const body =
        document.body;


    const savedTheme =
        localStorage.getItem("aura-theme");


    if (savedTheme === "dark") {

        body.classList.add("dark-mode");

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("[data-lucide]");

        if (!icon) return;

        if (body.classList.contains("dark-mode")) {

            icon.setAttribute(
                "data-lucide",
                "sun"
            );

        } else {

            icon.setAttribute(
                "data-lucide",
                "moon"
            );

        }

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                body.classList.toggle("dark-mode");


                if (body.classList.contains("dark-mode")) {

                    localStorage.setItem(
                        "aura-theme",
                        "dark"
                    );

                } else {

                    localStorage.setItem(
                        "aura-theme",
                        "light"
                    );

                }


                updateThemeIcon();

            }
        );

    }


    /* =====================================================
       RTL TOGGLE
    ===================================================== */

    const rtlToggle =
        document.getElementById("rtlToggle");

    const html =
        document.documentElement;


    const savedDirection =
        localStorage.getItem("aura-direction");


    if (savedDirection === "rtl") {

        html.setAttribute("dir", "rtl");

    } else {

        html.setAttribute("dir", "ltr");

    }


    if (rtlToggle) {

        rtlToggle.addEventListener(
            "click",
            function () {

                const currentDirection =
                    html.getAttribute("dir");


                if (currentDirection === "rtl") {

                    html.setAttribute(
                        "dir",
                        "ltr"
                    );

                    localStorage.setItem(
                        "aura-direction",
                        "ltr"
                    );

                } else {

                    html.setAttribute(
                        "dir",
                        "rtl"
                    );

                    localStorage.setItem(
                        "aura-direction",
                        "rtl"
                    );

                }

            }
        );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.querySelector(".main-nav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            function () {

                mainNav.classList.toggle("active");


                const icon =
                    menuToggle.querySelector(
                        "[data-lucide]"
                    );


                if (icon) {

                    if (
                        mainNav.classList.contains(
                            "active"
                        )
                    ) {

                        icon.setAttribute(
                            "data-lucide",
                            "x"
                        );

                    } else {

                        icon.setAttribute(
                            "data-lucide",
                            "menu"
                        );

                    }

                    if (typeof lucide !== "undefined") {
                        lucide.createIcons();
                    }

                }

            }
        );

    }


    /* =====================================================
       MOBILE NAV CLOSE
    ===================================================== */

    document
        .querySelectorAll(".main-nav a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (
                        window.innerWidth <= 768 &&
                        mainNav
                    ) {

                        mainNav.classList.remove(
                            "active"
                        );

                    }

                }
            );

        });


    /* =====================================================
       ACTIVE NAV LINK
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(".nav-link")
        .forEach(function (link) {

            const href =
                link.getAttribute("href");

            if (!href) return;


            const linkPage =
                href.split("/")
                    .pop()
                    .toLowerCase();


            link.classList.remove("active");


            if (
                linkPage === currentPage ||
                (
                    currentPage === "" &&
                    linkPage === "index.html"
                )
            ) {

                link.classList.add("active");

            }

        });


    /* =====================================================
       HOME DROPDOWN ACTIVE STATE
    ===================================================== */

    const homeDropdown =
        document.querySelector(".nav-dropdown");


    if (
        homeDropdown &&
        (
            currentPage === "index.html" ||
            currentPage === "" ||
            currentPage === "home-2.html"
        )
    ) {

        const homeLink =
            homeDropdown.querySelector(".nav-link");

        if (homeLink) {

            homeLink.classList.add("active");

        }

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(".site-header");


    if (header) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 30) {

                    header.classList.add(
                        "header-scrolled"
                    );

                } else {

                    header.classList.remove(
                        "header-scrolled"
                    );

                }

            }
        );

    }


});