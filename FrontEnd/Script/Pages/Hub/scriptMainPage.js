import { getRankingScore, getRankingScoreMatch, getAchievements, getConfigurations, getSpaceships } from "../../Utils/scriptFetch.js";
import getTranslation from "../../Utils/scriptTranslation.js";

document.addEventListener("DOMContentLoaded", () => {
    
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "../../../index.html";
    }

    const translation = getTranslation(user?.language);

    document.getElementById("score").textContent = `${translation.score}: ${user.score}`;
    document.getElementById("scoreMatch").textContent = `${translation.scoreMatch}: ${user.scoreMatch}`;

    document.getElementById("gameplay").addEventListener("click", function(event) {
        event.preventDefault(); 

        if (window.parent?.stopAudio) window.parent.stopAudio();

        if (window.parent?.navigateToGame) window.parent.navigateToGame('Pages/Gameplay/gameplay.html');
    });

    const links = [
        {
            id: "ranking",
            fetches: async () => {
                const scoreRanking = await getRankingScore();
                const scoreMatchRanking = await getRankingScoreMatch();
                localStorage.setItem("rankings", JSON.stringify({ scoreRanking, scoreMatchRanking }));
            }
        },
        {
            id: "configurations",
            fetches: async () => {
                const configurations = await getConfigurations(user.idUser);
                localStorage.setItem("configurations", JSON.stringify(configurations));
            }
        },
        {
            id: "rules",
            fetches: async () => {}
        },
        {
            id: "achievements",
            fetches: async () => {
                const achievements = await getAchievements(user.idUser);
                localStorage.setItem("achievements", JSON.stringify(achievements));
            }
        },
        {
            id: "spaceships",
            fetches: async () => {
                const spaceships = await getSpaceships(user.idUser);
                localStorage.setItem("spaceships", JSON.stringify(spaceships));
            }
        },
        {
            id: "gameplay",
            fetches: async () => {}
        }
    ];

    links.forEach(linkObject => {

        const link = document.getElementById(linkObject.id);

        link.addEventListener("click", async (event) => {
            event.preventDefault();

            links.forEach(otherLink => {

                const element = document.getElementById(otherLink.id);
                if (element !== link) {
                    element.classList.add("disabledOthers");
                } 
            });

            link.classList.add("loading");

            try {
                await linkObject.fetches();
                if (window.parent?.navigateToGame) window.parent.navigateToGame(link.href);
            } 
            catch (error) {
                alert(`Loading error ${link.dataset.originalText}`);
            } 
            finally {
                links.forEach(link => {
                    const element = document.getElementById(link.id);
                    element.classList.remove("loading", "disabledOthers");
                });
            }
        });
    });
});