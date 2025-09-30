
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");

    button.addEventListener("click", async (event) => {
        event.preventDefault(); 

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const newUser = {
            username: username,
            email: email,
            password: password
        };

        fetch(`http://localhost:8080/user/create?`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        }) 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            sessionStorage.setItem("user", JSON.stringify(data));
            window.location.replace("../../Pages/Hub/mainPage.html");
        })
        .catch(error => console.error(error));
    });
});