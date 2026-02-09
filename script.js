const scores = {
  home: 0,
  away: 0,
};

const scoreHome = document.querySelector("#score-home");
const scoreAway = document.querySelector("#score-away");
const matchStatus = document.querySelector("#match-status");
const resetButton = document.querySelector("#reset-score");
const scoreButtons = document.querySelectorAll("button[data-action='add']");

const playerForm = document.querySelector("#player-form");
const playerInput = document.querySelector("#player-name");
const playerList = document.querySelector("#player-list");
const playerFeedback = document.querySelector("#player-feedback");

const players = new Set();

const updateScores = () => {
  scoreHome.textContent = scores.home;
  scoreAway.textContent = scores.away;
  updateStatus();
};

const updateStatus = () => {
  if (scores.home === 0 && scores.away === 0) {
    matchStatus.textContent = "El partido está empezando. ¡Anota el primer punto!";
    return;
  }

  if (scores.home === scores.away) {
    matchStatus.textContent = `Empate a ${scores.home}. ¡Partido igualado!`;
    return;
  }

  const leader = scores.home > scores.away ? "Equipo Azul" : "Equipo Rojo";
  matchStatus.textContent = `${leader} va ganando.`;
};

const addPoint = (team) => {
  scores[team] += 1;
  updateScores();
};

const resetScores = () => {
  scores.home = 0;
  scores.away = 0;
  updateScores();
  matchStatus.textContent = "Marcador reiniciado. ¡A jugar de nuevo!";
};

const showPlayerFeedback = (message, type) => {
  playerFeedback.textContent = message;
  playerFeedback.className = `feedback ${type}`.trim();
};

const renderPlayers = () => {
  playerList.innerHTML = "";
  if (players.size === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Aún no hay jugadores añadidos.";
    emptyItem.className = "player-item";
    playerList.appendChild(emptyItem);
    return;
  }

  [...players].forEach((player) => {
    const item = document.createElement("li");
    item.className = "player-item";

    const name = document.createElement("span");
    name.textContent = player;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "btn remove-btn";
    removeButton.textContent = "Eliminar";
    removeButton.addEventListener("click", () => {
      players.delete(player);
      renderPlayers();
      showPlayerFeedback(`Se eliminó a ${player}.`, "success");
    });

    item.append(name, removeButton);
    playerList.appendChild(item);
  });
};

scoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const team = button.dataset.team;
    addPoint(team);
  });
});

resetButton.addEventListener("click", resetScores);

playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = playerInput.value.trim();

  if (!name) {
    showPlayerFeedback("Escribe un nombre válido.", "error");
    return;
  }

  const normalized = name.toLowerCase();
  const alreadyExists = [...players].some(
    (player) => player.toLowerCase() === normalized
  );

  if (alreadyExists) {
    showPlayerFeedback("Ese jugador ya está en la lista.", "error");
    return;
  }

  players.add(name);
  playerInput.value = "";
  renderPlayers();
  showPlayerFeedback(`Añadido: ${name}.`, "success");
});

renderPlayers();
updateScores();
