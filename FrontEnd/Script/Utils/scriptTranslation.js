
const translations = {
    
    English: {
        score: "Score",
        scoreMatch: "Score Match"
    },

    Portuguese: {
        score: "Pontos",
        scoreMatch: "Pontos Partida"
    }
};

export default function getTranslation(language = "English") {
    return translations[language] || translations["English"];
}