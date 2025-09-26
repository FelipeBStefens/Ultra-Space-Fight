(function(){
  const cards = document.querySelectorAll('.spaceship');
  const actionButton = document.getElementById('actionButton');

  // valores simulados (depois você puxa do servidor)
  const ships = [
    { name: "Nave Alfa", vida: 100, velocidade: 50, dano: 30 },
    { name: "Nave Beta", vida: 80,  velocidade: 70, dano: 40 },
    { name: "Nave Gama", vida: 120, velocidade: 40, dano: 50 }
  ];

  let active = 0;
  let selected = 0;

  function update(){
    cards.forEach((card, i) => {
      card.classList.remove('active', 'left', 'right');
      if(i === active) {
        card.classList.add('active');

        // Atualiza stats
        document.getElementById("lifeValue").textContent = ships[i].vida;
        document.getElementById("speedValue").textContent = ships[i].velocidade;
        document.getElementById("damageValue").textContent = ships[i].dano;

        // Botão de seleção
        if(i === selected) {
          actionButton.textContent = "Selected Spaceship";
          actionButton.disabled = true;
        } else {
          actionButton.textContent = "Select Spaceship";
          actionButton.disabled = false;
          actionButton.onclick = () => {
            selected = i;
            update();
          };
        }
      }
      else if(i < active) card.classList.add('left');
      else if(i > active) card.classList.add('right');
    });
  }

  // botões de navegação
  document.getElementById('leftButton').addEventListener('click', () => {
    if(active > 0) active--;
    update();
  });

  document.getElementById('rightButton').addEventListener('click', () => {
    if(active < cards.length - 1) active++;
    update();
  });

  const statMap = {
    life: "vida",
    speed: "velocidade",
    damage: "dano"
  };

  document.querySelectorAll('.upgrade-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const stat = statMap[btn.dataset.stat];
      ships[active][stat] += 10;
      update();
    });
  });

  update();
})();
