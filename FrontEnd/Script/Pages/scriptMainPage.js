document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
        window.location.href = "../../index.html";
    }

    document.getElementById('gameplay').addEventListener('click', function(event) {
        event.preventDefault(); 

        if (window.parent?.stopAudio) window.parent.stopAudio();

        if (window.parent?.navigateToGame)
            window.parent.navigateToGame('Pages/Gameplay/gameplay.html');
    });

    const scoreText = document.getElementById("score");
    const scoreMatchText = document.getElementById("scoreMatch");
    scoreText.textContent = `Score: ${user.score}`;
    scoreMatchText.textContent = `Score Match: ${user.scoreMatch}`;

    // -------------------------------
    // Funções de fetch específicas
    // -------------------------------
    async function getRankingScore() {
        try {
            const response = await fetch("http://localhost:8080/data/achievement/get/ranking/score");
            if (!response.ok) {
                switch (response.status) {
                    case 500:
                        alert("Server error while fetching ranking score.");
                        break;
                    default:
                        alert(`Unexpected error: ${response.status}`);
                }
                return null;
            }
            return await response.json();
        } catch (error) {
            alert("Connection error while fetching ranking score.");
            return null;
        }
    }

    async function getRankingScoreMatch() {
        try {
            const response = await fetch("http://localhost:8080/data/achievement/get/ranking/score/match");
            if (!response.ok) {
                switch (response.status) {
                    case 500:
                        alert("Server error while fetching ranking score match.");
                        break;
                    default:
                        alert(`Unexpected error: ${response.status}`);
                }
                return null;
            }
            return await response.json();
        } catch (error) {
            alert("Connection error while fetching ranking score match.");
            return null;
        }
    }

    async function getAchievement(id) {
        try {
            const response = await fetch(`http://localhost:8080/data/achievement/get/achievements/${id}`);
            if (!response.ok) {
                switch (response.status) {
                    case 401:
                        alert("Achievements ID unauthorized!");
                        break;
                    case 404:
                        alert("Achievements not found!");
                        break;
                    case 500:
                        alert("Server error while fetching achievements.");
                        break;
                    default:
                        alert(`Unexpected error: ${response.status}`);
                }
                return null;
            }
            return await response.json();
        } catch (error) {
            alert("Connection error while fetching achievements.");
            return null;
        }
    }

    async function fetchSpaceships(id) {
        try {
            const response = await fetch(`http://localhost:8080/spaceship/get/spaceships/${id}`);
            if (!response.ok) {
                switch (response.status) {
                    case 401:
                        alert("Spaceships ID unauthorized!");
                        break;
                    case 404:
                        alert("Spaceships not found!");
                        break;
                    case 500:
                        alert("Server error while fetching spaceships.");
                        break;
                    default:
                        alert(`Unexpected error: ${response.status}`);
                }
                return null;
            }
            return await response.json();
        } catch (error) {
            alert("Connection error while fetching spaceships.");
            return null;
        }
    }

    async function getConfiguration(id) {
        try {
            const response = await fetch(`http://localhost:8080/configuration/get/values/${id}`);
            if (!response.ok) {
                switch (response.status) {
                    case 401:
                        alert("Configuration ID unauthorized!");
                        break;
                    case 404:
                        alert("Configuration not found!");
                        break;
                    case 500:
                        alert("Server error while fetching configuration.");
                        break;
                    default:
                        alert(`Unexpected error: ${response.status}`);
                }
                return null;
            }
            return await response.json();
        } catch (error) {
            alert("Connection error while fetching configuration.");
            return null;
        }
    }

    // -------------------------------
    // Lista completa de botões
    // -------------------------------
    const links = [
        {
            id: "ranking",
            fetches: async () => {
                const scoreRanking = await getRankingScore();
                const scoreMatchRanking = await getRankingScoreMatch();
                sessionStorage.setItem("rankings", JSON.stringify({ scoreRanking, scoreMatchRanking }));
            }
        },
        {
            id: "configurations",
            fetches: async () => {
                const configurations = await getConfiguration(user.idUser);
                sessionStorage.setItem("configurations", JSON.stringify(configurations));
            }
        },
        {
            id: "rules",
            fetches: async () => {}
        },
        {
            id: "achievements",
            fetches: async () => {
                const achievements = await getAchievement(user.idUser);
                sessionStorage.setItem("achievements", JSON.stringify(achievements));
            }
        },
        {
            id: "spaceships",
            fetches: async () => {
                const spaceships = await fetchSpaceships(user.idUser);
                sessionStorage.setItem("spaceships", JSON.stringify(spaceships));
            }
        },
        {
            id: "gameplay",
            fetches: async () => {}
        }
    ];

    // -------------------------------
    // Adiciona click event para cada link
    // -------------------------------
    const linkIds = ["ranking","configurations","rules","achievements","spaceships","gameplay"];
    linkIds.forEach(id => {
    const a = document.getElementById(id);
    if (!a) return;

    // btn-inner
    if (!a.querySelector('.btn-inner')) {
        const span = document.createElement('span');
        span.className = 'btn-inner';
        while (a.firstChild) span.appendChild(a.firstChild);
        a.appendChild(span);
    }

    // btn-spinner
    if (!a.querySelector('.btn-spinner')) {
        const spinner = document.createElement('span');
        spinner.className = 'btn-spinner';
        a.appendChild(spinner);
    }
    });

    links.forEach(linkObj => {
        const link = document.getElementById(linkObj.id);
        link.dataset.originalText = link.textContent;

        link.addEventListener("click", async (e) => {
            e.preventDefault();

            // Desativa todos os links (cinza)
            links.forEach(l => document.getElementById(l.id).classList.add("disabled-others"));

            // Ativa loading no clicado
            link.classList.remove("disabled-others");
            link.classList.add("loading");

            try {
                await linkObj.fetches();
                window.open(link.href, link.target);
            } catch (err) {
                console.error(`Erro ao carregar ${linkObj.id}:`, err);
                alert(`Erro ao carregar ${link.dataset.originalText}`);
            } finally {
                // Restaura estados
                links.forEach(l => {
                    const el = document.getElementById(l.id);
                    el.classList.remove("loading", "disabled-others");
                });
            }
        });
    });


    // -------------------------------
    // Bloqueio do botão voltar do navegador
    // -------------------------------
    history.pushState(null, null, location.href);
    window.addEventListener("popstate", () => history.pushState(null, null, location.href));
});