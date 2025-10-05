
document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {     
        window.location.href = "../../index.html";
    }

    const scoreText = document.getElementById("score");
    const scoreMatchText = document.getElementById("scoreMatch");

    scoreText.textContent = `Score: ${user.score}`;
    scoreMatchText.textContent = `Score Match: ${user.scoreMatch}`;
});
