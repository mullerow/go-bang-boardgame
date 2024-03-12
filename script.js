const boardField = document.querySelector(".board-field");
const restartButton = document.querySelector(".restart-game-button");
const sizeInput = document.querySelector("#field-size-input");
const playersTurn = document.querySelector(".display-players-turn");
const winnerText = document.querySelector(".winner-text");

let fieldsize = 19;
let result = 0;
let playerRotation = 0;

function renderGame() {
  boardField.innerHTML = "";

  fieldsize = Number(sizeInput.value);

  for (let y = 1; y < fieldsize + 1; y++) {
    FieldColumn = document.createElement("div");
    FieldColumn.classList.add("field-column");
    boardField.appendChild(FieldColumn);

    for (let x = 1; x < fieldsize + 1; x++) {
      const field = document.createElement("div");
      field.id = "-" + x + "-" + y;
      field.xCoordinate = x;
      field.yCoordinate = y;
      field.player = 0; // neutrales Feld
      FieldColumn.appendChild(field);
      field.classList.add("field-basic-style");
      field.classList.add("transparent");
    }
  }
}

function checkrules(e) {
  xCoordinate = e.target.xCoordinate;
  yCoordinate = e.target.yCoordinate;
  console.log(
    "new klick -------------------------------",
    xCoordinate,
    yCoordinate
  );
  // untersuche die Siegbedingungen (5 in eine reihe)
  // check 1:  nur x-achse
  for (let z = xCoordinate - 4; z <= xCoordinate + 4; z++) {
    if (z < 1 || z > fieldsize) {
      continue;
    } else {
      // suche nach dem ersten feld welches wieder aus der berechnung der siegeskette fliegt (z-5)
      const substractionID = "-" + (z - 5) + "-" + yCoordinate;
      const substractionField = document.getElementById(substractionID);
      console.log("substractionField", substractionField);

      // suche nach allen relevanten feldern für die siegeskette
      const searchedID = "-" + z + "-" + yCoordinate;
      const searchedField = document.getElementById(searchedID);
      if (!substractionField) {
        result += searchedField.player;
      } else {
        result += searchedField.player - substractionField.player;
      }
      console.log("result", result);

      if (result === 5 || result === -5) {
        console.warn("PLAYER 1 WINS!!!");
        winnerText.textContent = "PLAYER 1 WINS!!!🤪";
        winnerText.style.backgroundColor = "silver";
      } else if (result === 50 || result === 49) {
        console.warn("PLAYER 2 WINS!!!");
        winnerText.textContent = "PLAYER 2 WINS!!!🤪";
        winnerText.style.backgroundColor = "silver";
      }
    }
  }

  result = 0;
}

/*
  for (let y = yCoordinate - 4; y < yCoordinate + 5; y++) {
    for (let x = xCoordinate - 4; x < xCoordinate + 5; x++) {
      if (x < 1 || y < 1 || y > fieldsize || x > fieldsize) {
        continue;
      } */

function setCharacter(e) {
  const clickedField = e.target;
  if (playerRotation % 2 === 0) {
    playersTurn.textContent = "Spieler WEIß ist an der Reihe!";
  } else {
    playersTurn.textContent = "Spieler Schwarz ist an der Reihe!";
  }
  if (clickedField.classList.contains("transparent")) {
    if (playerRotation % 2 === 0) {
      clickedField.style.backgroundColor = "silver";
      clickedField.classList.remove("transparent");
      clickedField.classList.add("white");
      e.target.player = 1; //  player 1 (white) bekommt 1 punkt pro feld, wenn 5 felder in einer reihe = 5 sind, dann gewinnt player 1
      playerRotation++;
    } else {
      clickedField.style.backgroundColor = "white";
      clickedField.classList.remove("transparent");
      clickedField.classList.add("silver");
      e.target.player = 10; //  player 2 (schwarz) bekommt 10 punkte pro feld, wenn 5 felder in einer reihe = 50 sind, dann gewinnt player 2
      playerRotation++;
    }
  }
  checkrules(e);
}

restartButton.addEventListener("click", renderGame);
boardField.addEventListener("click", setCharacter);
