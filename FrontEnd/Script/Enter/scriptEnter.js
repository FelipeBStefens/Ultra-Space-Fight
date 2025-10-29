document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    
    if (user) {
        if (window.parent?.navigateToGame) {
            window.parent.navigateToGame("Pages/Hub/mainPage.html");
        }
    }
});