const boardField = document.querySelector(".board-field");
const restartButton = document.querySelector(".restart-game-button");
const sizeInput = document.querySelector("#field-size-input");
const playersTurn = document.querySelector(".display-players-turn");
const winnerText = document.querySelector(".winner-text");

let fieldsize = 19;
let result = 0;
let counter = 0;
let playerRotation = 0;

function renderGame() {
  winnerText.classList.add("hide-winner");
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
  checkDeleteStones(e);
  counter = 0;
  xCoordinate = e.target.xCoordinate;
  yCoordinate = e.target.yCoordinate;
  console.log(
    "new klick -------------------------------",
    xCoordinate,
    yCoordinate
  );
  // untersuche die Siegbedingungen (5 in eine reihe)
  /////// check 1:  nur X-achse ///////////////////////////////////////////////////////////////////////////
  for (let z = xCoordinate - 4; z <= xCoordinate + 4; z++) {
    if (z < 1 || z > fieldsize) {
      continue;
    } else {
      let substractionField = 0;
      counter++;
      // suche nach dem ersten feld welches wieder aus der berechnung der siegeskette fliegt (z-5)
      if (counter > 5) {
        const substractionID = "-" + (z - 5) + "-" + yCoordinate;
        substractionField = document.getElementById(substractionID);
      }
      // suche nach allen relevanten feldern für die siegeskette
      const searchedID = "-" + z + "-" + yCoordinate;
      const searchedField = document.getElementById(searchedID);
      if (!substractionField) {
        result += searchedField.player;
      } else {
        result += searchedField.player - substractionField.player;
      }
      checkForWinner();
    }
  }
  /////// check 2:  nur Y-achse ///////////////////////////////////////////////////////////////////////////
  result = 0;
  counter = 0;
  for (let z = yCoordinate - 4; z <= yCoordinate + 4; z++) {
    if (z < 1 || z > fieldsize) {
      continue;
    } else {
      let substractionField = 0;
      counter++;
      // suche nach dem ersten feld welches wieder aus der berechnung der siegeskette fliegt (z-5)
      if (counter > 5) {
        const substractionID = "-" + xCoordinate + "-" + (z - 5);
        substractionField = document.getElementById(substractionID);
      }
      // suche nach allen relevanten feldern für die siegeskette
      const searchedID = "-" + xCoordinate + "-" + z;
      const searchedField = document.getElementById(searchedID);
      if (!substractionField) {
        result += searchedField.player;
      } else {
        result += searchedField.player - substractionField.player;
      }
      checkForWinner();
    }
  }
  /////// check 3:  Diagnonal von links oben nach rechts unten /////////////////////////////////////////
  result = 0;
  counter = 0;
  let yy = yCoordinate - 4;
  let xx = xCoordinate - 4;
  for (; yy <= yCoordinate + 4 && xx <= xCoordinate + 4; yy++ && xx++) {
    if (yy < 1 || yy > fieldsize || xx < 1 || xx > fieldsize) {
      continue;
    } else {
      let substractionField = 0;
      counter++;
      // suche nach dem ersten feld welches wieder aus der berechnung der siegeskette fliegt (z-5)
      if (counter > 5) {
        const substractionID = "-" + (xx - 5) + "-" + (yy - 5);
        substractionField = document.getElementById(substractionID);
      }
      // suche nach allen relevanten feldern für die siegeskette
      const searchedID = "-" + xx + "-" + yy;
      const searchedField = document.getElementById(searchedID);
      if (!substractionField) {
        result += searchedField.player;
      } else {
        result += searchedField.player - substractionField.player;
      }
      checkForWinner();
    }
  }
  /////// check 4:  Diagnonal von links unten nach rechts oben /////////////////////////////////////////
  result = 0;
  counter = 0;
  yy = yCoordinate + 4;
  xx = xCoordinate - 4;
  //console.log("xx", xx, "yy", yy);
  //console.log("xCoordinate", xCoordinate, "yCoordinate", yCoordinate);
  for (; yy >= yCoordinate - 4 && xx <= xCoordinate + 4; yy-- && xx++) {
    if (yy < 1 || yy > fieldsize || xx < 1 || xx > fieldsize) {
      continue;
    } else {
      let substractionField = 0;
      counter++;
      // suche nach dem ersten feld welches wieder aus der berechnung der siegeskette fliegt (z-5)
      if (counter > 5) {
        const substractionID = "-" + (xx - 5) + "-" + (yy + 5);
        substractionField = document.getElementById(substractionID);
      }
      // suche nach allen relevanten feldern für die siegeskette
      const searchedID = "-" + xx + "-" + yy;
      const searchedField = document.getElementById(searchedID);
      if (!substractionField) {
        result += searchedField.player;
      } else {
        result += searchedField.player - substractionField.player;
      }
      checkForWinner();
    }
  }
  result = 0;
}

function checkForWinner() {
  if (result === 5 || result === -5) {
    console.warn("PLAYER 1 WINS!!!");
    winnerText.textContent = "BLACK WINS!!!🤪";
    winnerText.classList.remove("hide-winner");
  } else if (result === 50 || result === 49) {
    console.warn("PLAYER 2 WINS!!!");
    winnerText.textContent = "WHITE WINS!!!🤪";
    winnerText.classList.remove("hide-winner");
  }
}

function neutralizeFields(field1ID, field2ID) {
  let field1 = document.getElementById(field1ID);
  let field2 = document.getElementById(field2ID);
  field1.classList.remove("white");
  field1.classList.remove("black");
  field1.classList.add("transparent");
  field1.player = 0;
  field2.classList.remove("white");
  field2.classList.remove("black");
  field2.classList.add("transparent");
  field2.player = 0;
}

function checkDeleteStones(e) {
  xCoordinate = e.target.xCoordinate;
  yCoordinate = e.target.yCoordinate;
  // Check for encircling enemy figures
  ///// check MinusX direction ////////////////////////////////////////
  let minusXPairID = "-" + (xCoordinate - 3) + "-" + yCoordinate;
  let minusXpair = document.getElementById(minusXPairID).player;
  let minusXFirstdeleteID = "-" + (xCoordinate - 1) + "-" + yCoordinate;
  let minusXFirstdeleteField =
    document.getElementById(minusXFirstdeleteID).player;
  let minusXSeconddeleteID = "-" + (xCoordinate - 2) + "-" + yCoordinate;
  let minusXSeconddeleteField =
    document.getElementById(minusXSeconddeleteID).player;
  if (
    minusXpair === e.target.player &&
    minusXFirstdeleteField === minusXSeconddeleteField
  ) {
    neutralizeFields(minusXFirstdeleteID, minusXSeconddeleteID);
  }
  ///// check PlusX direction ////////////////////////////////////////
  let plusXPairID = "-" + (xCoordinate + 3) + "-" + yCoordinate;
  let plusXpair = document.getElementById(plusXPairID).player;
  let plusXFirstdeleteID = "-" + (xCoordinate + 1) + "-" + yCoordinate;
  let plusXFirstdeleteField =
    document.getElementById(plusXFirstdeleteID).player;
  let plusXSeconddeleteID = "-" + (xCoordinate + 2) + "-" + yCoordinate;
  let plusXSeconddeleteField =
    document.getElementById(plusXSeconddeleteID).player;
  if (
    plusXpair === e.target.player &&
    plusXFirstdeleteField === plusXSeconddeleteField
  ) {
    neutralizeFields(plusXFirstdeleteID, plusXSeconddeleteID);
  }
  ///// check MinusY direction ////////////////////////////////////////
  let minusYPairID = "-" + xCoordinate + "-" + (yCoordinate - 3);
  let minusYpair = document.getElementById(minusYPairID).player;
  let minusYFirstdeleteID = "-" + xCoordinate + "-" + (yCoordinate - 1);
  let minusYFirstdeleteField =
    document.getElementById(minusYFirstdeleteID).player;
  let minusYSeconddeleteID = "-" + xCoordinate + "-" + (yCoordinate - 2);
  let minusYSeconddeleteField =
    document.getElementById(minusYSeconddeleteID).player;
  if (
    minusYpair === e.target.player &&
    minusYFirstdeleteField === minusYSeconddeleteField
  ) {
    neutralizeFields(minusYFirstdeleteID, minusYSeconddeleteID);
  }
  ///// check PlusY direction ////////////////////////////////////////
  let plusYPairID = "-" + xCoordinate + "-" + (yCoordinate + 3);
  let plusYpair = document.getElementById(plusYPairID).player;
  let plusYFirstdeleteID = "-" + xCoordinate + "-" + (yCoordinate + 1);
  let plusYFirstdeleteField =
    document.getElementById(plusYFirstdeleteID).player;
  let plusYSeconddeleteID = "-" + xCoordinate + "-" + (yCoordinate + 2);
  let plusYSeconddeleteField =
    document.getElementById(plusYSeconddeleteID).player;
  if (
    plusYpair === e.target.player &&
    plusYFirstdeleteField === plusYSeconddeleteField
  ) {
    neutralizeFields(plusYFirstdeleteID, plusYSeconddeleteID);
  }
  ///// check Minus Diagonal-top-left-to-bottom-right direction (minusTLBR)  ////////////////////////////////////////
  let minusTLBRPairID = "-" + (xCoordinate - 3) + "-" + (yCoordinate - 3);
  let minusTLBRpair = document.getElementById(minusTLBRPairID).player;
  let minusTLBRFirstdeleteID =
    "-" + (xCoordinate - 1) + "-" + (yCoordinate - 1);
  let minusTLBRFirstdeleteField = document.getElementById(
    minusTLBRFirstdeleteID
  ).player;
  let minusTLBRSeconddeleteID =
    "-" + (xCoordinate - 2) + "-" + (yCoordinate - 2);
  let minusTLBRSeconddeleteField = document.getElementById(
    minusTLBRSeconddeleteID
  ).player;
  if (
    minusTLBRpair === e.target.player &&
    minusTLBRFirstdeleteField === minusTLBRSeconddeleteField
  ) {
    neutralizeFields(minusTLBRFirstdeleteID, minusTLBRSeconddeleteID);
  }
  ///// check Minus Diagonal-bottom-left-to-top-right direction (minusBLTR)  ////////////////////////////////////////
  let minusBLTRPairID = "-" + (xCoordinate - 3) + "-" + (yCoordinate + 3);
  let minusBLTRpair = document.getElementById(minusBLTRPairID).player;
  let minusBLTRFirstdeleteID =
    "-" + (xCoordinate - 1) + "-" + (yCoordinate + 1);
  let minusBLTRFirstdeleteField = document.getElementById(
    minusBLTRFirstdeleteID
  ).player;
  let minusBLTRSeconddeleteID =
    "-" + (xCoordinate - 2) + "-" + (yCoordinate + 2);
  let minusBLTRSeconddeleteField = document.getElementById(
    minusBLTRSeconddeleteID
  ).player;
  if (
    minusBLTRpair === e.target.player &&
    minusBLTRFirstdeleteField === minusBLTRSeconddeleteField
  ) {
    neutralizeFields(minusBLTRFirstdeleteID, minusBLTRSeconddeleteID);
  }
  ///// check plus Diagonal-top-left-to-bottom-right direction (plusTLBR)  ////////////////////////////////////////
  let plusTLBRPairID = "-" + (xCoordinate + 3) + "-" + (yCoordinate + 3);
  let plusTLBRpair = document.getElementById(plusTLBRPairID).player;
  let plusTLBRFirstdeleteID = "-" + (xCoordinate + 1) + "-" + (yCoordinate + 1);
  let plusTLBRFirstdeleteField = document.getElementById(
    plusTLBRFirstdeleteID
  ).player;
  let plusTLBRSeconddeleteID =
    "-" + (xCoordinate + 2) + "-" + (yCoordinate + 2);
  let plusTLBRSeconddeleteField = document.getElementById(
    plusTLBRSeconddeleteID
  ).player;
  if (
    plusTLBRpair === e.target.player &&
    plusTLBRFirstdeleteField === plusTLBRSeconddeleteField
  ) {
    neutralizeFields(plusTLBRFirstdeleteID, plusTLBRSeconddeleteID);
  }
  ///// check plus Diagonal-bottom-left-to-top-right direction (plusBLTR)  ////////////////////////////////////////
  let plusBLTRPairID = "-" + (xCoordinate + 3) + "-" + (yCoordinate - 3);
  let plusBLTRpair = document.getElementById(plusBLTRPairID).player;
  let plusBLTRFirstdeleteID = "-" + (xCoordinate + 1) + "-" + (yCoordinate - 1);
  let plusBLTRFirstdeleteField = document.getElementById(
    plusBLTRFirstdeleteID
  ).player;
  let plusBLTRSeconddeleteID =
    "-" + (xCoordinate + 2) + "-" + (yCoordinate - 2);
  let plusBLTRSeconddeleteField = document.getElementById(
    plusBLTRSeconddeleteID
  ).player;
  if (
    plusBLTRpair === e.target.player &&
    plusBLTRFirstdeleteField === plusBLTRSeconddeleteField
  ) {
    neutralizeFields(plusBLTRFirstdeleteID, plusBLTRSeconddeleteID);
  }
}

function setCharacter(e) {
  const clickedField = e.target;
  if (playerRotation % 2 === 0) {
    playersTurn.textContent = "Spieler Weiß ist an der Reihe!";
  } else {
    playersTurn.textContent = "Spieler Schwarz ist an der Reihe!";
  }
  if (clickedField.classList.contains("transparent")) {
    if (playerRotation % 2 === 0) {
      clickedField.classList.remove("transparent");
      clickedField.classList.add("white");
      e.target.player = 1; //  player 1 (white) bekommt 1 punkt pro feld, wenn 5 felder in einer reihe = 5 sind, dann gewinnt player 1
      playerRotation++;
    } else {
      clickedField.classList.remove("transparent");
      clickedField.classList.add("black");
      e.target.player = 10; //  player 2 (schwarz) bekommt 10 punkte pro feld, wenn 5 felder in einer reihe = 50 sind, dann gewinnt player 2
      playerRotation++;
    }
  }
  checkrules(e);
}

restartButton.addEventListener("click", renderGame);
boardField.addEventListener("click", setCharacter);
