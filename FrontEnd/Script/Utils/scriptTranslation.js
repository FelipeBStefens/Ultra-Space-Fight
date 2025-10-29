
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
        boss: "A Real Boss",

        title: "Configurations",
        username: "Username",
        password: "Password",
        language: "Language",
        portuguese: "Portuguese",
        english: "English",
        soundtrack: "Soundtrack",
        soundEffects: "Sound Effects",
        save: "Save new Configurations",
        logout: "Log Out Account",
        delete: "Delete Account",
        confirmDelete: "You really want to delete your Account?",
        invalidForm: "Invalid username or password!",
        errors: {
            usernameTooLong: "Username must be less than 15 characters",
            passwordInvalid: "Password must be at least 8 characters and contain uppercase, lowercase, and numbers"
        },

        selectSpaceship: "Select Spaceship",
        selectedSpaceship: "Selected Spaceship",
        locked: "Locked: Need",
        life: "Life",
        speed: "Speed",
        damage: "Damage",
        upgrade: "Upgrade",
        maxed: "MAXED",
        cost: "Cost",
        coins: "Coins"
    },

    Portuguese: {
        score: "Pontos",
        scoreMatch: "Pontos Partida",
        
        totalButton: "Ranking Pontos Totais",
        matchButton: "Ranking Pontos Partida",
        
        titleText: "Regras do Jogo",
        controls: "Controles",

        scoreAchievement: "Mestre dos Pontos",
        matchAchievement: "Partida Perfeita",
        enemiesAchievement: "Destruidor de Inimigos",
        eliteAchievement: "Pessoa de Elite",
        bossAchievement: "O Verdadeiro Chefe",

        title: "Configurações",
        username: "Usuário",
        password: "Senha",
        language: "Idioma",
        portuguese: "Português",
        english: "Inglês",
        soundtrack: "Trilha Sonora",
        soundEffects: "Efeitos Sonoros",
        save: "Salvar novas configurações",
        logout: "Sair da conta",
        delete: "Excluir conta",
        confirmDelete: "Você realmente quer excluir sua conta?",
        invalidForm: "Usuário ou senha inválidos!",
        errors: {
            usernameTooLong: "Usuário deve ter menos de 15 caracteres",
            passwordInvalid: "A senha deve ter pelo menos 8 caracteres e conter maiúsculas, minúsculas e números"
        },

        selectSpaceship: "Selecionar Nave",
        selectedSpaceship: "Nave Selecionada",
        locked: "Bloqueada: Precisa de",
        life: "Vida",
        speed: "Velocidade",
        damage: "Dano",
        upgrade: "Melhorar",
        maxed: "MÁXIMO",
        cost: "Custo",
        coins: "Moedas"
    }
};

export default function getTranslation(language = "English") {
    return translations[language] || translations["English"];
}