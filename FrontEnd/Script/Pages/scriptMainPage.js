
document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {     
        window.location.href = "../../index.html";
    }

    const scoreText = document.getElementById("score");
    const scoreMatch = document.getElementById("scoreMatch");


    fetch(`http://localhost:8080/data/achievement/get/score/${user.idUser}`) 
        .then(response => response.json())
        .then(data => {
            console.log(data);

            scoreText.textContent = `score: ${data.score}`;
            scoreMatch.textContent = `score match: ${data.scoreMatch}`;
        })
        .catch(error => console.error(error));
});
