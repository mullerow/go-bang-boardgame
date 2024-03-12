const boardField = document.querySelector(".board-field");
const restartButton = document.querySelector(".restart-game-button");
const fieldsize = 8;

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
    }
  }
}

restartButton.addEventListener("click", renderGame);
