document.addEventListener("DOMContentLoaded", () => {
        
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {     
        window.location.href = "../../index.html";
    }

    const saveButton = document.getElementById("save");

    saveButton.addEventListener("click", () => {
           
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const language = document.getElementById("language").value;
        const soundtrack = document.getElementById("soundtrack").value;
        const soundEffects = document.getElementById("soundEffects").value;

        const configurations = {
            username: username,
            password: password,
            language: language,
            soundtrack: soundtrack,
            soundEffects: soundEffects
        };

        console.log("Configurações a enviar:", configurations);

            
        fetch(`http://localhost:8080/configuration/update/values/${user.idUser}`, {  
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(configurations) 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao salvar configurações!");
            }
            return response.json();
        })
        .then(result => {
            console.log("Configurações salvas com sucesso:", result);
        })
        .catch(error => {
            console.error(error);
        });
    });
        
    document.getElementById("logout").addEventListener("click", () => {
            
        sessionStorage.clear();
        window.location.href = "../../index.html";
    });

    document.getElementById("delete").addEventListener("click", () => {
        
        fetch(`http://localhost:8080/user/delete/${user.idUser}`, { 
            method: "DELETE" })
        .then(() => {
            sessionStorage.clear();
            window.location.href = "../../index.html";
        });
    });    
});