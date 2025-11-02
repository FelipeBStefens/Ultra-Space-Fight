// Imports the function used to fetch translated strings from the scriptTranslation utility file;
import getTranslation from "../Utils/scriptTranslation.js";

// Function to dynamically create and update the HTML list of rankings;
function updateList(rankingData, scoreField, rankingList) {

    // Clears all existing content inside the ranking list container;
    rankingList.innerHTML = "";

    // Iterates through each item (user) in the ranking data array;
    rankingData.forEach((item, index) => {

        // Creates a new <div> element to hold a single ranking entry;
        const div = document.createElement("div");

        // Adds a base CSS class for styling the ranking item;
        div.classList.add("rankingItem");

        // Conditional checks to assign special classes for the top 3 positions;
        if (index === 0) {

            // Adds a 'gold' class for the 1st place item;
            div.classList.add("gold");
        }
        else if (index === 1) {

            // Adds a 'silver' class for the 2nd place item;
            div.classList.add("silver");
        }
        else if (index === 2) {

            // Adds a 'bronze' class for the 3rd place item;
            div.classList.add("bronze");
        }

        // Sets the inner HTML of the <div>, including position, username, and score;
        div.innerHTML = `
            <span class="rankingPosition">#${index + 1}</span>
            <span class="rankingUser">${item.username}</span>
            <span class="rankingScore">${item[scoreField]}</span>
        `;

        // Adds the newly created ranking item (div) to the main ranking list container;
        rankingList.appendChild(div);
    });
}

// Event listener that executes when the entire HTML document is loaded;
document.addEventListener("DOMContentLoaded", () => {
    
    // Invoked Async Function Expression to handle async operations at load time;
    (async () => {

        // Retrieves and parses the user object from Local Storage;
        const user = JSON.parse(localStorage.getItem("user"));
        // Checks if the user object is null;
        if (!user) {     
            // Redirects the browser to the application's main index page if no user is found;
            window.location.href = "../../index.html";
        }

        // Retrieves and parses the rankings data (fetched previously) from Local Storage;
        const rankings = JSON.parse(localStorage.getItem("rankings"));
        // Assigns the total score ranking data;
        const totalRanking = rankings.scoreRanking;
        // Assigns the match score ranking data;
        const matchRanking = rankings.scoreMatchRanking;

        // Gets a reference to the button for the total ranking view;
        const totalButton = document.getElementById("totalButton");
        // Gets a reference to the button for the match ranking view;
        const matchButton = document.getElementById("matchButton");

        // Fetches the translated strings based on the user's preferred language;
        const translation = getTranslation(user?.language);

        // Updates the button text content using translations;
        totalButton.textContent = translation.totalButton;
        // Updates the button text content using translations;
        matchButton.textContent = translation.matchButton;

        // Gets a reference to the main container element where ranking items will be appended;
        const rankingList = document.getElementById("rankingList");

        // Adds a click event listener to the Total Ranking Button; 
        totalButton.addEventListener("click", () => {

            // Sets the total button as active for styling purposes;
            totalButton.classList.add("active");

            // Removes the active class from the match button;
            matchButton.classList.remove("active");

            // Calls the update function to display the total ranking data, using "score" as the field name; 
            updateList(totalRanking, "score", rankingList);
        });

        // Adds a click event listener to the Match Ranking Button; 
        matchButton.addEventListener("click", () => {

            // Sets the match button as active for styling purposes;
            matchButton.classList.add("active");

            // Removes the active class from the total button;
            totalButton.classList.remove("active");

            // Calls the update function to display the match ranking data, using "scoreMatch" as the field name;
            updateList(matchRanking, "scoreMatch", rankingList);
        });

        // Initializes the ranking list by displaying the Total Ranking data by default on page load;
        updateList(totalRanking, "score", rankingList);
    })()
});