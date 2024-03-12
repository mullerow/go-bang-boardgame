const boardField = document.querySelector(".board-field");
const restartButton = document.querySelector(".restart-game-button");
const sizeInput = document.querySelector("#field-size-input");
let fieldsize = 19;

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
      //field.textContent = field.id;
      //console.log("field-id", field.id);
      FieldColumn.appendChild(field);
      field.classList.add("field-basic-style");
      field.classList.add("transparent");
    }
  }
}

function checkrules(e) {
  console.log("geklickt", e.target.id);
  xCoordinate = e.target.xCoordinate;
  yCoordinate = e.target.yCoordinate;
  console.log("fieldsite", fieldsize);
  // untersuche die Siegbedingungen (5 in eine reihe)
  for (let y = yCoordinate - 4; y < yCoordinate + 5; y++) {
    for (let x = xCoordinate - 4; x < xCoordinate + 5; x++) {
      if (x < 1 || y < 1 || y > fieldsize || x > fieldsize) {
        continue;
      } else {
        console.log(x, y);
      }
    }
  }
}

function setCharacter(e) {
  const clickedField = e.target;
  if (clickedField.classList.contains("transparent")) {
    if (playerRotation % 2 === 0) {
      clickedField.style.backgroundColor = "silver";
      clickedField.classList.remove("transparent");
      clickedField.classList.add("white");
      playerRotation++;
    } else {
      clickedField.style.backgroundColor = "white";
      clickedField.classList.remove("transparent");
      clickedField.classList.add("silver");
      playerRotation++;
    }
  }
  checkrules(e);
}

restartButton.addEventListener("click", renderGame);
boardField.addEventListener("click", setCharacter);
