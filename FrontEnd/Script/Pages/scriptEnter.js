document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    
    if (user) {
        // Se o usuário está logado, navega para o Hub (mainPage.html)
        // Você usa o window.parent para pedir ao pai (index.html) para mudar o SRC
        if (window.parent?.navigateToGame) {
            window.parent.navigateToGame("Pages/Hub/mainPage.html");
        }
    }
    
    // Se não estiver logado, o Enter/Launch Page permanece carregado
    // e o usuário pode interagir (ex: clicar no link para a tela de login)
});