import getTranslation from "../../Utils/scriptTranslation.js";

const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "../../index.html";
}

const language = user.language;
const translation = getTranslation(user?.language);

document.getElementById("titleText").textContent = translation.titleText;
document.getElementById("controls").textContent = translation.controls;

if (language === "English") {

    document.getElementById("rulesText").textContent = `
        In Ultra Space Fight, you take control of a powerful spaceship and engage in intense battles against enemies coming from every direction of the galaxy.

        There are 5 different spaceship types, each with unique abilities and characteristics, along with individual health, speed, and damage attributes. Choosing the right ship is key to your survival.

        Enemies spawn outside the screen and move toward you, each with distinct behaviors, strengths, and resistances.
        From time to time, bosses will appear — each equipped with special abilities that demand strategy and skill to defeat.
    `;

    document.getElementById("constrolsText").textContent = `
W / A / S / D — Move your ship

Q / E — Rotate your ship

Spacebar — Shoot

Console Controller is also supported
    `;
}
else if (language === "Portuguese") {

    document.getElementById("rulesText").textContent = `
        Em Ultra Space Fight, você assume o controle de uma poderosa nave espacial em batalhas intensas contra inimigos que surgem de todos os lados do espaço.

        Há 5 tipos de naves disponíveis, e cada uma possui habilidades e propriedades únicas, além de atributos específicos de vida, velocidade e dano. Escolher a nave certa pode ser decisivo para a sua sobrevivência.

        Durante a partida, inimigos aparecem fora da tela e avançam em direção à sua nave. Cada tipo de inimigo tem comportamento, força e resistência diferentes.
        De tempos em tempos, chefes (bosses) poderosos surgem — cada um com habilidades especiais que exigem estratégia e precisão para derrotar.
    `;

    document.getElementById("constrolsText").textContent = `
W / A / S / D — Movimentação da nave

Q / E — Rotação da nave

Barra de Espaço (Space) — Atirar

Controle de Console também é compatível
    `;
}