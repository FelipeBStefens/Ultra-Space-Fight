const translations = {
    English: {
        titleText: "Game Rules"
    },
    Portuguese: {
        titleText: "Regras do Jogo"
    }
}

const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "../../enter.html";
}

const lang = user.language in translations ? user.language : "English";
const t = translations[lang];

document.getElementById("titleText").textContent = t.titleText;