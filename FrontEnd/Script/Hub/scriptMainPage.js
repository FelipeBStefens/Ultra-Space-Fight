// Imports asynchronous functions for fetching different types of ranking data, achievements, configurations, and spaceships from the API;
import { getRankingScore, getRankingScoreMatch, getAchievements, getConfigurations, getSpaceships } from "../Utils/scriptFetch.js";
// Imports the function used to fetch translated strings based on the user's selected language;
import getTranslation from "../Utils/scriptTranslation.js";

// Attaches an event listener that executes the code once the entire DOM is loaded;
document.addEventListener("DOMContentLoaded", () => {
    
    // Parses the user data stored in Local Storage;
    const user = JSON.parse(localStorage.getItem("user"));
    // Checks if the user object is null or undefined;
    if (!user) {
        // If no user is found, redirects the browser to the application's main index page;
        window.location.href = "../../index.html";
    }

    // Fetches the set of translated strings based on the user's preferred language;
    const translation = getTranslation(user?.language);

    // Updates the element with ID "score" with the translated text and the user's score;
    document.getElementById("score").textContent = `${translation.score}: ${user.score}`;
    // Updates the element with ID "scoreMatch" with the translated text and the user's match score;
    document.getElementById("scoreMatch").textContent = `${translation.scoreMatch}: ${user.scoreMatch}`;

    // Attaches a click event listener specifically to the "gameplay" button/link;
    document.getElementById("gameplay").addEventListener("click", function(event) {
        // Prevents the default action of the element;
        event.preventDefault(); 

        // Checks if the parent window has the 'stopAudio' function and calls it to stop the background music;
        if (window.parent?.stopAudio) window.parent.stopAudio();

        // Checks if the parent window has the 'navigateToGame' function and uses it to load the main gameplay page;
        if (window.parent?.navigateToGame) window.parent.navigateToGame('Pages/Gameplay/gameplay.html');
    });

    // Array defining the various links/sections in the hub and the data fetching logic associated with each;
    const links = [
        {
            // ID of the HTML element for the link;
            id: "ranking",
            // Asynchronous function to execute before navigating to the ranking page;
            fetches: async () => {
                // Fetches the global score ranking data;
                const scoreRanking = await getRankingScore();
                // Fetches the score ranking data by match;
                const scoreMatchRanking = await getRankingScoreMatch();
                // Stores both ranking results in Local Storage;
                localStorage.setItem("rankings", JSON.stringify({ scoreRanking, scoreMatchRanking }));
            }
        },
        {
            // ID for the configurations link;
            id: "configurations",
            // Asynchronous function to fetch and store user configurations;
            fetches: async () => {
                // Fetches user configurations using the user's ID;
                const configurations = await getConfigurations(user.idUser);
                // Stores the configurations data in Local Storage;
                localStorage.setItem("configurations", JSON.stringify(configurations));
            }
        },
        {
            // ID for the rules link;
            id: "rules",
            // Empty async function, indicating no data fetching is required before navigation;
            fetches: async () => {}
        },
        {
            // ID for the achievements link;
            id: "achievements",
            // Asynchronous function to fetch and store user achievements;
            fetches: async () => {
                // Fetches user achievements using the user's ID;
                const achievements = await getAchievements(user.idUser);
                // Stores the achievements data in Local Storage;
                localStorage.setItem("achievements", JSON.stringify(achievements));
            }
        },
        {
            // ID for the spaceships link;
            id: "spaceships",
            // Asynchronous function to fetch and store user spaceships data;
            fetches: async () => {
                // Fetches user spaceships using the user's ID;
                const spaceships = await getSpaceships(user.idUser);
                // Stores the spaceships data in Local Storage;
                localStorage.setItem("spaceships", JSON.stringify(spaceships));
            }
        },
        {
            // ID for the gameplay link (included for completeness, though already handled separately);
            id: "gameplay",
            // Empty async function;
            fetches: async () => {}
        }
    ];

    // Iterates over each link object to attach an event listener;
    links.forEach(linkObject => {

        // Gets a reference to the actual HTML element using its ID;
        const link = document.getElementById(linkObject.id);

        // Attaches a click event listener to the link element;
        link.addEventListener("click", async (event) => {
            // Prevents the default action of the link;
            event.preventDefault();

            // Iterates over all links in the array;
            links.forEach(otherLink => {

                // Gets the HTML element for the other link;
                const element = document.getElementById(otherLink.id);
                // Checks if the current link is NOT the one that was clicked;
                if (element !== link) {
                    // Adds a class to visually disable/dim other links while data is loading;
                    element.classList.add("disabledOthers");
                } 
            });

            // Adds a "loading" class to the clicked link to show visual feedback;
            link.classList.add("loading");

            // Starts a try block to handle potential errors during data fetching;
            try {
                // Awaits the execution of the link's specific data fetching function;
                await linkObject.fetches();
                // If data fetching is successful, navigates to the URL specified in the link's href attribute;
                if (window.parent?.navigateToGame) window.parent.navigateToGame(link.href);
            } 
            // Catches any error that occurred during the 'fetches' operation;
            catch (error) {
                // Alerts the user about the loading error, using the original text stored in a data attribute (data-originalText);
                alert(`Loading error ${link.dataset.originalText}`);
            } 
            // Code block that always executes after try/catch, regardless of success or failure;
            finally {
                // Iterates over all links again;
                links.forEach(link => {
                    // Gets the element;
                    const element = document.getElementById(link.id);
                    // Removes the "loading" and "disabledOthers" classes from all links to reset the UI;
                    element.classList.remove("loading", "disabledOthers");
                });
            }
        });
    });
});