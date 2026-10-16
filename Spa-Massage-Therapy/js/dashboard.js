
document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const body = document.body;

    const sidebarToggle = document.querySelector("#dashboard-sidebar-toggle");
    const themeToggle = document.querySelector("#themeToggle");
    const rtlToggle = document.querySelector("#rtlToggle");

    const navItems = document.querySelectorAll(".dashboard-nav-item[data-section]");
    const sections = document.querySelectorAll(".dashboard-section");

    function showSection(sectionName) {
        const target = document.querySelector(`#section-${sectionName}`);
        if (!target) return;

        sections.forEach(section => {
            section.classList.toggle("active", section === target);
        });

        navItems.forEach(item => {
            item.classList.toggle("active", item.dataset.section === sectionName);
        });

        if (sidebarToggle) sidebarToggle.checked = false;

        document.querySelector(".dashboard-content")?.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    navItems.forEach(item => {
        item.addEventListener("click", event => {
            event.preventDefault();
            showSection(item.dataset.section);
        });
    });

    document.querySelectorAll("[data-page-link]").forEach(button => {
        button.addEventListener("click", () => {
            const sectionId = button.dataset.pageLink;
            if (sectionId?.startsWith("section-")) {
                showSection(sectionId.replace("section-", ""));
            }
        });
    });

    // Load the same saved theme/direction used by the rest of the website
    const savedTheme = localStorage.getItem("aura-theme");
    if (savedTheme === "dark") body.classList.add("dark-mode");
    else body.classList.remove("dark-mode");
    html.dataset.theme = savedTheme === "dark" ? "dark" : "light";

    const savedDirection = localStorage.getItem("aura-direction") || "ltr";
    html.setAttribute("dir", savedDirection);

    // Theme toggle
    function updateThemeIcon() {
        if (!themeToggle) return;
        const dark = body.classList.contains("dark-mode");
        themeToggle.innerHTML = dark
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';
        if (window.lucide) window.lucide.createIcons();
    }

    themeToggle?.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const theme = body.classList.contains("dark-mode") ? "dark" : "light";
        html.dataset.theme = theme;
        localStorage.setItem("aura-theme", theme);
        updateThemeIcon();
    });

    // RTL toggle
    rtlToggle?.addEventListener("click", () => {
        html.dir = html.dir === "rtl" ? "ltr" : "rtl";
        localStorage.setItem("aura-direction", html.dir);
    });

    // Demo booking buttons
    document.querySelectorAll(".book-treatment").forEach(button => {
        button.addEventListener("click", () => {
            const treatment = button.dataset.treatment || "your treatment";
            alert(`Selected: ${treatment}. Connect your booking form to confirm an appointment.`);
            showSection("bookings");
        });
    });

    // Demo cancellation
    document.querySelectorAll(".cancel-booking").forEach(button => {
        button.addEventListener("click", () => {
            const confirmed = confirm("Do you want to cancel this appointment?");
            if (confirmed) {
                alert("This is a demo. Connect your booking system to complete cancellation.");
            }
        });
    });

    // Demo profile form
    document.querySelector("#profileForm")?.addEventListener("submit", event => {
        event.preventDefault();
        alert("Profile details validated. Connect a backend to save changes.");
    });

    updateThemeIcon();
    if (window.lucide) window.lucide.createIcons();
});
