async function getRankingScore() {
    try {
        const response = await fetch("http://localhost:8080/data/achievement/get/ranking/score");
        if (!response.ok) {
            throw new Error("");
        }
        const ranking = await response.json(); 
        return ranking;
    } catch (error) {
        console.error("Erro no fetch:", error);
        return [];
    }
}

async function getRankingScoreMatch() {
    try {
        const response = await fetch("http://localhost:8080/data/achievement/get/ranking/score/match");
        if (!response.ok) {
            throw new Error("");
        }
        const ranking = await response.json(); 
        return ranking;
    } catch (error) {
        console.error("Erro no fetch:", error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
  
  // Example list with total Score;
  const totalRanking = getRankingScore();

  // Example list with Score in a match;
  const matchRanking = getRankingScoreMatch();

  // The Button to access the Total Ranking;
  const totalButton = document.getElementById("totalButton");

  // The Button to access the Match Ranking;
  const matchButton = document.getElementById("matchButton");

  // The Ranking List Div to put the values;
  const rankingList = document.getElementById("ranking-list");

  // Function to update the List;
  function updateList(data) {

    // Restart the HTML inside the List;
    rankingList.innerHTML = "";

    // For loop in each item of the data;
    data.forEach((item, index) => {

      // Creating a new Div Element;
      const div = document.createElement("div");

      // Add the class item to the Ranking;
      div.classList.add("ranking-item");

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
        <span class="ranking-position">#${index + 1}</span>
        <span class="ranking-user">${item.username}</span>
        <span class="ranking-score">${item.score}</span>
      `;

      // Append that Div to the List of the Rankings;
      rankingList.appendChild(div);
    });
  }

  // Add an Event Listener on the Total Button; 
  totalButton.addEventListener("click", () => {

    // Add a new class on the Total Button;
    totalButton.classList.add("active");

    // Remove the class on the Match Button;
    matchButton.classList.remove("active");

    // Update the Ranking; 
    updateList(totalRanking);
  });

  // Add an Event Listener on the Match Button; 
  matchButton.addEventListener("click", () => {

    // Add a new class on the Match Button;
    matchButton.classList.add("active");

    // Remove the class on the Total Button;
    totalButton.classList.remove("active");

    // Update the Ranking;
    updateList(matchRanking);
  });

  // Update the Ranking;
  updateList(totalRanking);
});