const boardField = document.querySelector(".board-field");
const restartButton = document.querySelector(".restart-game-button");
const fieldsize = 19;
let playerRotation = 0;

function renderGame() {
  boardField.innerHTML = "";
  console.log("render me!");

  for (let y = 1; y < fieldsize + 1; y++) {
    FieldColumn = document.createElement("div");
    FieldColumn.classList.add("field-column");
    boardField.appendChild(FieldColumn);

    for (let x = 1; x < fieldsize + 1; x++) {
      const field = document.createElement("div");
      field.id = "-" + x + "-" + y;
      field.textContent = field.id;
      console.log("field-id", field.id);
      FieldColumn.appendChild(field);
      field.classList.add("field-basic-style");
      field.classList.add("darkSalmon");
    }
  }
}

function setCharacter(e) {
  const clickedField = e.target;
  console.log("target", e.target);
  console.log(" playerRotation", playerRotation);
  if (clickedField.classList.contains("darkSalmon")) {
    if (playerRotation % 2 === 0) {
      clickedField.style.backgroundColor = "silver";
      clickedField.classList.remove("darkSalmon");
      clickedField.classList.add("green");
      playerRotation++;
    } else {
      clickedField.style.backgroundColor = "green";
      clickedField.classList.remove("darkSalmon");
      clickedField.classList.add("silver");
      playerRotation++;
    }
  }
}

restartButton.addEventListener("click", renderGame);
boardField.addEventListener("click", setCharacter);
