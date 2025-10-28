import getTranslation from "../../Utils/scriptTranslation.js";

// Function to update the List;
function updateList(rankingData, scoreField, rankingList) {

  // Restart the HTML inside the List;
  rankingList.innerHTML = "";

  // For loop in each item of the data;
  rankingData.forEach((item, index) => {

    // Creating a new Div Element;
    const div = document.createElement("div");

    // Add the class item to the Ranking;
    div.classList.add("rankingItem");

    // Conditional expressions;
    if (index === 0) {

      // Add a gold class on the first item;
      div.classList.add("gold");
    }
    else if (index === 1) {

      // Add a silver class on the first item;
      div.classList.add("silver");
    }
    else if (index === 2) {

      // Add a bronze class on the first item;
      div.classList.add("bronze");
    }

    // Add HTML Spans on that Div;
    div.innerHTML = `
      <span class="rankingPosition">#${index + 1}</span>
      <span class="rankingUser">${item.username}</span>
      <span class="rankingScore">${item[scoreField]}</span>
    `;

    // Append that Div to the List of the Rankings;
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

    // The Ranking List Div to put the values;
    const rankingList = document.getElementById("rankingList");

    // Add an Event Listener on the Total Button; 
    totalButton.addEventListener("click", () => {

      // Add a new class on the Total Button;
      totalButton.classList.add("active");

      // Remove the class on the Match Button;
      matchButton.classList.remove("active");

      // Update the Ranking; 
      updateList(totalRanking, "score", rankingList);
    });

    // Add an Event Listener on the Match Button; 
    matchButton.addEventListener("click", () => {

      // Add a new class on the Match Button;
      matchButton.classList.add("active");

      // Remove the class on the Total Button;
      totalButton.classList.remove("active");

      // Update the Ranking;
      updateList(matchRanking, "scoreMatch", rankingList);
    });

    // Update the Ranking;
    updateList(totalRanking, "score", rankingList);
  })()
});