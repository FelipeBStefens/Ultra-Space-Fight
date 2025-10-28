
const translations = {
    
    English: {
        score: "Score",
        scoreMatch: "Score Match",
        
        totalButton: "Total Score Ranking",
        matchButton: "Match Score Ranking",
        
        titleText: "Game Rules",
        controls: "Controls",
        
        score: "Score Master",
        match: "Perfect Match",
        enemies: "Enemies Destroyer",
        elite: "Elite Person",
        boss: "A Real Boss"
    },

    Portuguese: {
        score: "Pontos",
        scoreMatch: "Pontos Partida",
        
        totalButton: "Ranking Pontos Totais",
        matchButton: "Ranking Pontos Partida",
        
        titleText: "Regras do Jogo",
        controls: "Controles",

        score: "Mestre dos Pontos",
        match: "Partida Perfeita",
        enemies: "Destruidor de Inimigos",
        elite: "Pessoa de Elite",
        boss: "O Verdadeiro Chefe"
    }
};

export default function getTranslation(language = "English") {
    return translations[language] || translations["English"];
}