document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic greeting by time
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        const hour = new Date().getHours();
        if (hour < 12) {
            greetingElement.textContent = "🌅 Good Morning";
        } else if (hour < 18) {
            greetingElement.textContent = "☀️ Good Afternoon";
        } else {
            greetingElement.textContent = "🌙 Good Evening";
        }
    }

    // 2. Switch between Dark mode and Light mode
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const currentTheme = document.body.getAttribute("data-theme");
            if (currentTheme === "dark") {
                document.body.removeAttribute("data-theme");
                themeBtn.textContent = "🌙 สลับธีม";
            } else {
                document.body.setAttribute("data-theme", "dark");
                themeBtn.textContent = "☀️ สลับธีม";
            }
        });
    }
});