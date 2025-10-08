// ===============================
// ===== SPACESHIP.JS FINAL ======
// ===============================
async function updateSpaceship(spaceship, values, id) {
    try {
        const response = await fetch(`http://localhost:8080/spaceship/update/${spaceship}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        });

        if (!response.ok) {
            switch(response.status) {
                case 400:
                    alert("Erro 400: Dados inválidos enviados ao servidor.");
                    break;
                case 404:
                    alert(`Erro 404: Nave ${spaceship} não encontrada.`);
                    break;
                case 409:
                    alert("Erro 409: Conflito detectado ao atualizar a nave.");
                    break;
                default:
                    alert(`Erro inesperado: ${response.status}`);
            }
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Falha na conexão com o servidor:", error);
        alert("Falha na conexão com o servidor.");
        return null;
    }
}

async function updateSelectedSpaceship(spaceship, id) {
    try {
        const response = await fetch(`http://localhost:8080/spaceship/update/selected/spaceship/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ spaceship }) // Certifique-se de enviar como JSON
        });

        if (!response.ok) {
            switch(response.status) {
                case 400:
                    alert("Erro 400: Dados inválidos enviados ao servidor.");
                    break;
                case 404:
                    alert("Erro 404: Usuário ou nave não encontrados.");
                    break;
                case 409:
                    alert("Erro 409: Conflito ao selecionar a nave.");
                    break;
                default:
                    alert(`Erro inesperado: ${response.status}`);
            }
            return null;
        }

        return await response.text();
    } catch (error) {
        console.error("Falha na conexão com o servidor:", error);
        alert("Falha na conexão com o servidor.");
        return null;
    }
}

// ================================
// Requisitos de pontuação das naves
// ================================
const spaceshipRequirements = {
  standart_ship: 0,
  speed_ship: 500,
  destroyer_ship: 1000,
  freighter_ship: 2000,
  elite_ship: 4000
};

const upgradeCosts = {
  standart_ship: 50,
  speed_ship: 75,
  destroyer_ship: 100,
  freighter_ship: 125,
  elite_ship: 200
};

const maxStats = {
    life: 100,
    speed: 10,
    damage: 15
};

function setLoadingState(isLoading, activeButton = null, isGray = false, selectedShipIndex = null) {
  const allButtons = document.querySelectorAll("button");

  if (isLoading) {
    // 1. Desabilita todos e adiciona 'disabled-others'
    allButtons.forEach(btn => {
      btn.classList.add("disabled-others");
      btn.disabled = true;
    });

    // 2. Configura o botão ativo com o spinner de loading
    if (activeButton) {
      activeButton.classList.remove("disabled-others");
      activeButton.classList.add("loading");
      activeButton.disabled = true;

      const spinnerClass = isGray ? "loading-spinner-gray" : "loading-spinner";
      const originalText = activeButton.textContent.trim();
      activeButton.dataset.originalText = originalText;

      activeButton.innerHTML = `
        <span>${originalText}</span>
        <div class="${spinnerClass}"></div>
      `;
    }
  } else {
    // 3. Reseta o estado de carregamento para todos os botões
    allButtons.forEach(btn => {
      btn.classList.remove("disabled-others", "loading");
      btn.disabled = false;

      // Restaura o texto original, se estiver salvo
      if (btn.dataset.originalText) {
          btn.innerHTML = btn.dataset.originalText;
      }
      delete btn.dataset.originalText;

      // ✅ Se for um botão de upgrade, remove selected-button temporariamente para evitar
      // conflitos, pois o 'update' vai re-aplicar o estado correto.
      if (btn.classList.contains("upgrade-button")) {
          btn.classList.remove("selected-button");
      }
    });
  }
}

function updateCashDisplay(newCashValue, coinText, data) {

    if (data && coinText) {
        // Atualiza o objeto user
        data.cash = newCashValue;
        localStorage.setItem("spaceships", JSON.stringify(data));
        
        // Atualiza o display na tela
        coinText.textContent = newCashValue;
    }
}

// ================================
// Inicialização automática
// ================================
(async function () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "../../enter.html";
  }
  const data = JSON.parse(localStorage.getItem("spaceships"));

  const spaceships = document.querySelectorAll(".spaceship");
  const actionButton = document.getElementById("actionButton");
  const coinValueText = document.getElementById("coin-value");
  const upgradeCostDisplay = document.getElementById("upgrade-cost-display");
  const costValueSpan = document.getElementById("cost-value");

  updateCashDisplay(data.cash, coinValueText, data);

  const ships = [
    { name: "standart_ship", life: data.standartShip.life, speed: data.standartShip.speed, damage: data.standartShip.damage },
    { name: "speed_ship", life: data.speedShip.life, speed: data.speedShip.speed, damage: data.speedShip.damage },
    { name: "destroyer_ship", life: data.destroyerShip.life, speed: data.destroyerShip.speed, damage: data.destroyerShip.damage },
    { name: "freighter_ship", life: data.freighterShip.life, speed: data.freighterShip.speed, damage: data.freighterShip.damage },
    { name: "elite_ship", life: data.eliteShip.life, speed: data.eliteShip.speed, damage: data.eliteShip.damage }
  ];

  let active = ships.findIndex(ship => ship.name === user.selectedSpaceship);
  if (active === -1) active = 0;

  let selected = ships.findIndex(ship => ship.name === user.selectedSpaceship);
  if (selected === -1) selected = 0;

  const statMap = { life: "life", speed: "speed", damage: "damage" };

  function update() {
    spaceships.forEach((spaceship, i) => {
      spaceship.classList.remove("active", "left", "right", "blocked");

      const currentShip = ships[i];
      const requiredScore = spaceshipRequirements[currentShip.name];
      const isLocked = user.score < requiredScore;

      if (i === active) {
        spaceship.classList.add("active");

        document.getElementById("lifeValue").textContent = currentShip.life;
        document.getElementById("speedValue").textContent = currentShip.speed;
        document.getElementById("damageValue").textContent = currentShip.damage;

        if (isLocked) {
          actionButton.textContent = `Locked: Need ${requiredScore} scores`;
          actionButton.disabled = true;
          spaceship.classList.add("blocked");
          upgradeCostDisplay.style.display = 'none';
        } else {
          const cost = upgradeCosts[currentShip.name];
          costValueSpan.textContent = cost;
          upgradeCostDisplay.style.display = 'flex';

          if (i === selected) {
            actionButton.textContent = "Selected Spaceship";
            actionButton.disabled = true;
            actionButton.classList.add("selected-button");
          } else {
            actionButton.textContent = "Select Spaceship";
            actionButton.disabled = false;
            actionButton.classList.remove("selected-button");

            actionButton.onclick = async () => {
              // Spinner cinza (para Select)
              setLoadingState(true, actionButton, true);

              try {
                selected = i;
                user.selectedSpaceship = ships[i].name;
                localStorage.setItem("user", JSON.stringify(user));

                const result = await updateSelectedSpaceship(ships[i].name, user.idUser);
                if (result) {
                  console.log(`✅ Nave selecionada: ${ships[i].name}`);
                  
                  // Atualiza visualmente e força o texto correto
                  actionButton.textContent = "Selected Spaceship";
                  actionButton.disabled = true;
                  update();
                } else {
                  console.error("❌ Erro ao atualizar nave selecionada no servidor");
                  alert("Erro ao selecionar a nave!");
                }
              } catch (err) {
                console.error(err);
                alert("Falha ao conectar ao servidor.");
              } finally {
                // Não sobrescreve o texto do botão selecionado
                setLoadingState(false);
                actionButton.textContent = "Selected Spaceship";
                actionButton.disabled = true;
              }
            };
          }
        }
      } else if (i < active) {
        spaceship.classList.add("left");
      } else if (i > active) {
        spaceship.classList.add("right");
      }
    });

    document.querySelectorAll(".upgrade-button").forEach(button => {
        const currentShip = ships[active];
        const requiredScore = spaceshipRequirements[currentShip.name];
        const isLocked = user.score < requiredScore;
        const stat = statMap[button.dataset.stat];
        
        // 1. CHECAGEM DE LIMITE MÁXIMO
        const isMaxed = currentShip[stat] >= maxStats[stat];

        // 2. Desabilita se estiver LOCKED ou MAXED
        button.disabled = isLocked || isMaxed;
        
        // 3. Aplica o estilo de desabilitado (cinza) se estiver no limite
        if (isMaxed) {
            button.style.backgroundColor = 'gray';
            button.textContent = 'MAXED';
        } else {
            // Garante que o estado normal/cor seja restaurado
            button.style.backgroundColor = ''; // Remove o override inline
            button.textContent = 'Upgrade'; // Restaura o texto original
        }
        
        // Lógica de desabilitar por Score continua a funcionar via `button.disabled`
    });
  }

  document.getElementById("leftButton").addEventListener("click", () => {
    if (active > 0) active--;
    update();
  });

  document.getElementById("rightButton").addEventListener("click", () => {
    if (active < spaceships.length - 1) active++;
    update();
  });

  document.querySelectorAll(".upgrade-button").forEach(button => {
    button.addEventListener("click", async () => {
      
      const currentShip = ships[active];
      const requiredScore = spaceshipRequirements[currentShip.name];
      const userScore = user.score;
      
      // ✅ CORREÇÃO 1: Define 'stat' antes de usá-lo
      const stat = statMap[button.dataset.stat];

      if (userScore < requiredScore) {
        console.warn(`❌ Upgrade bloqueado. Score (${userScore}) insuficiente para a nave ${currentShip.name} (requer ${requiredScore}).`);
        update(); // Garante o estado visual (se o score tiver mudado)
        return; 
      }
      
      if (currentShip[stat] >= maxStats[stat]) {
          console.warn(`❌ Upgrade bloqueado. ${stat} já está no nível máximo (${maxStats[stat]}).`);
          alert(`O upgrade de ${stat} atingiu o nível máximo.`);
          
          // ✅ CORREÇÃO 2: Chama update() aqui para aplicar o estilo MAXED imediatamente
          update(); 
          return;
      }
      
      // Spinner rosa/branco padrão
      setLoadingState(true, button, false);

      try {
        const cost = upgradeCosts[ships[active].name];

        if (user.cash < cost) {
            console.log(`Você precisa de ${cost} cash para este upgrade! Cash atual: ${user.cash}`);
            // Garantir que o loading seja removido se falhar na validação local
            setLoadingState(false); 
            return; 
        }

        // Aumenta o valor localmente (será revertido se o servidor falhar)
        ships[active][stat] += 1;

        update(); // Atualiza a UI para refletir o novo valor

        const body = {
          cash: cost,
          spaceshipValuesTDO: {
            life: ships[active].life,
            speed: ships[active].speed,
            damage: ships[active].damage
          }
        };

        const result = await updateSpaceship(ships[active].name, body, user.idUser);
        
        if (result && result.cash !== undefined) {
          console.log(`✅ Nave ${ships[active].name} atualizada. Novo Cash: ${result.cash}`);
          
          updateCashDisplay(result.cash, coinValueText, data);
          
        } else if (result && result.cash === undefined) {
            console.error("❌ Resposta do servidor não contém o novo valor de cash.");
            alert("Upgrade realizado, mas o saldo não foi atualizado. Recarregue a página.");
        } 
        else {
          console.error("❌ Erro ao atualizar a nave no servidor");
          alert("Erro ao atualizar a nave!");
          
          // Reverte o incremento em caso de falha da API
          ships[active][stat] -= 1; 
          update();
        }

      } catch (err) {
        console.error(err);
        alert("Falha na conexão com o servidor.");
        
        ships[active][stat] -= 1; 
        update();
      } finally {
        setLoadingState(false);
        
        update(); 
      }
    });
  });

  update();
})();