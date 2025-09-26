const rankingTotal = [
  { username: "Player1", score: 5200 },
  { username: "Player2", score: 4800 },
  { username: "Player3", score: 4600 },
  { username: "Player4", score: 4000 },
  { username: "Player5", score: 3800 },
  { username: "Player6", score: 3500 },
  { username: "Player7", score: 3000 },
  { username: "Player8", score: 2500 }
];

const rankingUnico = [
  { username: "Player2", score: 2100 },
  { username: "Player1", score: 2000 },
  { username: "Player4", score: 1800 },
  { username: "Player3", score: 1600 },
  { username: "Player5", score: 1400 },
  { username: "Player6", score: 1200 }
];

const btnTotal = document.getElementById("totalButton");
const btnUnico = document.getElementById("uniqueButton");
const rankingList = document.getElementById("ranking-list");

function atualizarLista(dados) {
  rankingList.innerHTML = "";
  dados.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("ranking-item");

    // aplica cores especiais no top 3
    if (index === 0) div.classList.add("gold");
    else if (index === 1) div.classList.add("silver");
    else if (index === 2) div.classList.add("bronze");

    div.innerHTML = `
      <span class="ranking-pos">#${index + 1}</span>
      <span class="ranking-user">${item.username}</span>
      <span class="ranking-score">${item.score}</span>
    `;
    rankingList.appendChild(div);
  });
}

btnTotal.addEventListener("click", () => {
  btnTotal.classList.add("active");
  btnUnico.classList.remove("active");
  atualizarLista(rankingTotal);
});

btnUnico.addEventListener("click", () => {
  btnUnico.classList.add("active");
  btnTotal.classList.remove("active");
  atualizarLista(rankingUnico);
});

// inicial
atualizarLista(rankingTotal);
