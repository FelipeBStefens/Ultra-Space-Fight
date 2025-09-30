
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");

    button.addEventListener("click", async (event) => {
        event.preventDefault(); 

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log("Email:", email);
        console.log("Password:", password);

        fetch(`http://localhost:8080/user/get/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`) 
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
    });
});