
import getTranslation from "../Utils/scriptTranslation.js";


function updateList(rankingData, scoreField, rankingList) {


    rankingList.innerHTML = "";


    rankingData.forEach((item, index) => {


        const div = document.createElement("div");


        div.classList.add("rankingItem");


        if (index === 0) {


            div.classList.add("gold");
        }
        else if (index === 1) {


            div.classList.add("silver");
        }
        else if (index === 2) {


            div.classList.add("bronze");
        }


        div.innerHTML = `
            <span class="rankingPosition">#${index + 1}</span>
            <span class="rankingUser">${item.username}</span>
            <span class="rankingScore">${item[scoreField]}</span>
        `;


        rankingList.appendChild(div);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    

    (async () => {


        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {     

            window.location.href = "../../index.html";
        }


        const rankings = JSON.parse(localStorage.getItem("rankings"));

        const totalRanking = rankings.scoreRanking;

        const matchRanking = rankings.scoreMatchRanking;


        const totalButton = document.getElementById("totalButton");

        const matchButton = document.getElementById("matchButton");


        const translation = getTranslation(user?.language);


        totalButton.textContent = translation.totalButton;

        matchButton.textContent = translation.matchButton;


        const rankingList = document.getElementById("rankingList");


        totalButton.addEventListener("click", () => {


            totalButton.classList.add("active");


            matchButton.classList.remove("active");


            updateList(totalRanking, "score", rankingList);
        });


        matchButton.addEventListener("click", () => {


            matchButton.classList.add("active");


            totalButton.classList.remove("active");


            updateList(matchRanking, "scoreMatch", rankingList);
        });


        updateList(totalRanking, "score", rankingList);
    })()
});