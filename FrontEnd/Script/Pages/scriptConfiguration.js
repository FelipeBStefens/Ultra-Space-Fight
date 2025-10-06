document.addEventListener("DOMContentLoaded", () => {
    
    const user = JSON.parse(sessionStorage.getItem("user"));
    const configuration = JSON.parse(sessionStorage.getItem("configurations"));
    if (!user) window.location.href = "../../index.html";

    const inputs = ["username","password","language","soundtrack","soundEffects"];
    const buttons = ["save","logout","delete"];

    // Inicializa valores
    document.getElementById("username").value = configuration.username;
    document.getElementById("password").value = configuration.password;
    document.getElementById("language").value = configuration.language;
    document.getElementById("soundtrack").value = user.soundtrack;
    document.getElementById("soundEffects").value = user.soundEffects;

    function setDisabledAll(state = true, exceptButton = null) {
        inputs.forEach(id => document.getElementById(id).disabled = state);
        buttons.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (el === exceptButton && state) {
                el.classList.add("loading");
                el.disabled = false; // mantém spinner visível
            } else {
                if (state) el.classList.add("disabled-others");
                else el.classList.remove("disabled-others");
                el.disabled = state;
            }
        });
    }

    // ------------------ SAVE ------------------
    const saveButton = document.getElementById("save");
    saveButton.addEventListener("click", async () => {
        setDisabledAll(true, saveButton);

        try {
            const configurations = {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                language: document.getElementById("language").value,
                soundtrack: document.getElementById("soundtrack").value,
                soundEffects: document.getElementById("soundEffects").value
            };

            const response = await fetch(`http://localhost:8080/configuration/update/values/${user.idUser}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(configurations)
            });

            if (!response.ok) throw new Error("Erro ao salvar configurações!");
            const result = await response.json();
            console.log("Configurações salvas com sucesso:", result);

        } catch (err) {
            console.error(err);
            alert("Erro ao salvar configurações!");
        } finally {
            // Remove loading e reativa tudo
            saveButton.classList.remove("loading");
            setDisabledAll(false);
        }
    });

    // ------------------ LOGOUT ------------------
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", () => {
        setDisabledAll(true, logoutButton);

        setTimeout(() => {
            sessionStorage.clear();
            window.location.href = "../../index.html";
        }, 500);
    });

    // ------------------ DELETE ------------------
    const deleteButton = document.getElementById("delete");
    deleteButton.addEventListener("click", async () => {
        if (!confirm("Tem certeza que deseja deletar sua conta?")) return;

        setDisabledAll(true, deleteButton);

        try {
            const response = await fetch(`http://localhost:8080/user/delete/${user.idUser}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Erro ao deletar usuário!");
            sessionStorage.clear();
            window.location.href = "../../index.html";

        } catch (err) {
            console.error(err);
            alert("Erro ao deletar usuário!");
        } finally {
            deleteButton.classList.remove("loading");
            setDisabledAll(false);
        }
    });
});