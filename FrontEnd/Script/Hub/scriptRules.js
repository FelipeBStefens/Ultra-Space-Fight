// Imports the function used to fetch translated strings from the scriptTranslation utility file;
import getTranslation from "../Utils/scriptTranslation.js";

// Retrieves and parses the user object from Local Storage;
const user = JSON.parse(localStorage.getItem("user"));
// Checks if the user object is null or undefined;
if (!user) {
    // If no user is found, redirects the browser to the application's main index page;
    window.location.href = "../../index.html";
}

// Stores the user's language preference in a dedicated variable;
const language = user.language;
// Fetches the set of translated strings based on the user's preferred language;
const translation = getTranslation(user?.language);

// Sets the text content of the element with ID "titleText" using the fetched translation;
document.getElementById("titleText").textContent = translation.titleText;
// Sets the text content of the element with ID "controls" using the fetched translation;
document.getElementById("controls").textContent = translation.controls;

// Conditional block to set the content based on the user's language being "English";
if (language === "English") {

    // Sets the detailed rules text content in English;
    document.getElementById("rulesText").textContent = `
        In Ultra Space Fight, you take control of a powerful spaceship and engage in intense battles against enemies coming from every direction of the galaxy.

        There are 5 different spaceship types, each with unique abilities and characteristics, along with individual health, speed, and damage attributes. Choosing the right ship is key to your survival.

        Enemies spawn outside the screen and move toward you, each with distinct behaviors, strengths, and resistances.
        From time to time, bosses will appear — each equipped with special abilities that demand strategy and skill to defeat.
    `;

    // Sets the detailed controls text content in English;
    document.getElementById("constrolsText").textContent = `
W / A / S / D — Move your ship

Arrow Left and Right — Rotate your ship

Spacebar — Shoot

Console Controller is also supported
    `;
}
// Conditional block for when the user's language is "Portuguese";
else if (language === "Portuguese") {

    // Sets the detailed rules text content in Portuguese;
    document.getElementById("rulesText").textContent = `
        Em Ultra Space Fight, você assume o controle de uma poderosa nave espacial em batalhas intensas contra inimigos que surgem de todos os lados do espaço.

        Há 5 tipos de naves disponíveis, e cada uma possui habilidades e propriedades únicas, além de atributos específicos de vida, velocidade e dano. Escolher a nave certa pode ser decisivo para a sua sobrevivência.

        Durante a partida, inimigos aparecem fora da tela e avançam em direção à sua nave. Cada tipo de inimigo tem comportamento, força e resistência diferentes.
        De tempos em tempos, chefes (bosses) poderosos surgem — cada um com habilidades especiais que exigem estratégia e precisão para derrotar.
    `;

    // Sets the detailed controls text content in Portuguese;
    document.getElementById("constrolsText").textContent = `
W / A / S / D — Movimentação da nave

Flecha Esquerda e Direita — Rotação da nave

Barra de Espaço (Space) — Atirar

Controle de Console também é compatível
    `;
}