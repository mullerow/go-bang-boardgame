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

function getPlayer(id) {
  return document.getElementById(id) ? document.getElementById(id).player : 0;
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
        substractionField = getPlayer(substractionID);
      }
      // suche nach allen relevanten feldern für die siegeskette
      const searchedID = "-" + z + "-" + yCoordinate;
      const searchedField = getPlayer(searchedID);
      if (!substractionField) {
        result += searchedField;
      } else {
        result += searchedField - substractionField;
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
        substractionField = getPlayer(substractionID);
      }
      // suche nach allen relevanten feldern für die siegeskette
      const searchedID = "-" + xCoordinate + "-" + z;
      const searchedField = getPlayer(searchedID);
      if (!substractionField) {
        result += searchedField;
      } else {
        result += searchedField - substractionField;
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
        substractionField = getPlayer(substractionID);
      }
      // suche nach allen relevanten feldern für die siegeskette
      const searchedID = "-" + xx + "-" + yy;
      const searchedField = getPlayer(searchedID);
      if (!substractionField) {
        result += searchedField;
      } else {
        result += searchedField - substractionField;
      }
      checkForWinner();
    }
  }
  /////// check 4:  Diagnonal von links unten nach rechts oben /////////////////////////////////////////
  result = 0;
  counter = 0;
  yy = yCoordinate + 4;
  xx = xCoordinate - 4;
  for (; yy >= yCoordinate - 4 && xx <= xCoordinate + 4; yy-- && xx++) {
    if (yy < 1 || yy > fieldsize || xx < 1 || xx > fieldsize) {
      continue;
    } else {
      let substractionField = 0;
      counter++;
      // suche nach dem ersten feld welches wieder aus der berechnung der siegeskette fliegt (z-5)
      if (counter > 5) {
        const substractionID = "-" + (xx - 5) + "-" + (yy + 5);
        substractionField = getPlayer(substractionID);
      }
      // suche nach allen relevanten feldern für die siegeskette
      const searchedID = "-" + xx + "-" + yy;
      const searchedField = getPlayer(searchedID);
      if (!substractionField) {
        result += searchedField;
      } else {
        result += searchedField - substractionField;
      }
      checkForWinner();
    }
  }
  result = 0;
}

function checkForWinner() {
  if (result === 5 || result === -5) {
    // das alternative result = -5 ist nötig, da bei der subtraktion des -5. felds auch -10 gerechnet werden könnte
    console.warn("PLAYER 1 WINS!!!");
    winnerText.textContent = "BLACK WINS!!!🤪";
    winnerText.classList.remove("hide-winner");
  } else if (result === 50 || result === 49) {
    // das alternative result = 49 ist nötig, da bei der subtraktion des -5. felds auch -1 gerechnet werden könnte
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
  let blockDelete = false;
  // Check for encircling enemy figures
  ///// check MinusX direction /////////////////////////////////////////////////////////////////////////
  let minusXPairID = "-" + (xCoordinate - 3) + "-" + yCoordinate;
  let minusXpair = getPlayer(minusXPairID);

  let minusXFirstdeleteID = "-" + (xCoordinate - 1) + "-" + yCoordinate;
  let minusXFirstdeleteField = getPlayer(minusXFirstdeleteID);

  let minusXSeconddeleteID = "-" + (xCoordinate - 2) + "-" + yCoordinate;
  let minusXSeconddeleteField = getPlayer(minusXSeconddeleteID);

  // Abfrage ob eine selbsteinkesselung erfolgt und ob der zug dadurch verboten werden muss (block)
  let minusXblockID = "-" + (xCoordinate + 1) + "-" + yCoordinate;
  let minusXblock = getPlayer(minusXblockID);
  /*
  if (
    e.target.player === minusXFirstdeleteField &&
    minusXblock === minusXSeconddeleteField
  ) {
    console.log("blockdelete=true");
    blockDelete = true;
    e.target.classList.remove("white");
    e.target.classList.remove("black");
    e.target.classList.add("transparent");
    e.target.player = 0;
    return;
  }
*/
  if (
    minusXpair === e.target.player &&
    minusXFirstdeleteField === minusXSeconddeleteField &&
    e.target.player !== minusXFirstdeleteField
    // && blockDelete === false
  ) {
    neutralizeFields(minusXFirstdeleteID, minusXSeconddeleteID);
  }

  ///// check PlusX direction ///////////////////////////////////////////////////////////////////////////////
  let plusXPairID = "-" + (xCoordinate + 3) + "-" + yCoordinate;
  let plusXpair = getPlayer(plusXPairID);

  let plusXFirstdeleteID = "-" + (xCoordinate + 1) + "-" + yCoordinate;
  let plusXFirstdeleteField = getPlayer(plusXFirstdeleteID);

  let plusXSeconddeleteID = "-" + (xCoordinate + 2) + "-" + yCoordinate;
  let plusXSeconddeleteField = getPlayer(plusXSeconddeleteID);

  if (
    plusXpair === e.target.player &&
    plusXFirstdeleteField === plusXSeconddeleteField &&
    e.target.player !== plusXFirstdeleteField
  ) {
    neutralizeFields(plusXFirstdeleteID, plusXSeconddeleteID);
  }
  ///// check MinusY direction /////////////////////////////////////////////////////////////////////////////////
  let minusYPairID = "-" + xCoordinate + "-" + (yCoordinate - 3);
  let minusYpair = getPlayer(minusYPairID);

  let minusYFirstdeleteID = "-" + xCoordinate + "-" + (yCoordinate - 1);
  let minusYFirstdeleteField = getPlayer(minusYFirstdeleteID);

  let minusYSeconddeleteID = "-" + xCoordinate + "-" + (yCoordinate - 2);
  let minusYSeconddeleteField = getPlayer(minusYSeconddeleteID);

  if (
    minusYpair === e.target.player &&
    minusYFirstdeleteField === minusYSeconddeleteField &&
    e.target.player !== minusYFirstdeleteField
  ) {
    neutralizeFields(minusYFirstdeleteID, minusYSeconddeleteID);
  }
  ///// check PlusY direction /////////////////////////////////////////////////////////////////////////////////////////
  let plusYPairID = "-" + xCoordinate + "-" + (yCoordinate + 3);
  let plusYpair = getPlayer(plusYPairID);

  let plusYFirstdeleteID = "-" + xCoordinate + "-" + (yCoordinate + 1);
  let plusYFirstdeleteField = getPlayer(plusYFirstdeleteID);

  let plusYSeconddeleteID = "-" + xCoordinate + "-" + (yCoordinate + 2);
  let plusYSeconddeleteField = getPlayer(plusYSeconddeleteID);

  if (
    plusYpair === e.target.player &&
    plusYFirstdeleteField === plusYSeconddeleteField &&
    e.target.player !== plusYFirstdeleteField
  ) {
    neutralizeFields(plusYFirstdeleteID, plusYSeconddeleteID);
  }
  ///// check Minus Diagonal-top-left-to-bottom-right direction (minusTLBR)  ////////////////////////////////////////
  let minusTLBRPairID = "-" + (xCoordinate - 3) + "-" + (yCoordinate - 3);
  let minusTLBRpair = getPlayer(minusTLBRPairID);

  let minusTLBRFirstdeleteID =
    "-" + (xCoordinate - 1) + "-" + (yCoordinate - 1);
  let minusTLBRFirstdeleteField = getPlayer(minusTLBRFirstdeleteID);

  let minusTLBRSeconddeleteID =
    "-" + (xCoordinate - 2) + "-" + (yCoordinate - 2);
  let minusTLBRSeconddeleteField = getPlayer(minusTLBRSeconddeleteID);

  if (
    minusTLBRpair === e.target.player &&
    minusTLBRFirstdeleteField === minusTLBRSeconddeleteField &&
    e.target.player !== minusTLBRFirstdeleteField
  ) {
    neutralizeFields(minusTLBRFirstdeleteID, minusTLBRSeconddeleteID);
  }
  ///// check Minus Diagonal-bottom-left-to-top-right direction (minusBLTR)  ////////////////////////////////////////
  let minusBLTRPairID = "-" + (xCoordinate - 3) + "-" + (yCoordinate + 3);
  let minusBLTRpair = getPlayer(minusBLTRPairID);

  let minusBLTRFirstdeleteID =
    "-" + (xCoordinate - 1) + "-" + (yCoordinate + 1);
  let minusBLTRFirstdeleteField = getPlayer(minusBLTRFirstdeleteID);

  let minusBLTRSeconddeleteID =
    "-" + (xCoordinate - 2) + "-" + (yCoordinate + 2);
  let minusBLTRSeconddeleteField = getPlayer(minusBLTRSeconddeleteID);

  if (
    minusBLTRpair === e.target.player &&
    minusBLTRFirstdeleteField === minusBLTRSeconddeleteField &&
    e.target.player !== minusBLTRFirstdeleteField
  ) {
    neutralizeFields(minusBLTRFirstdeleteID, minusBLTRSeconddeleteID);
  }
  ///// check plus Diagonal-top-left-to-bottom-right direction (plusTLBR)  ////////////////////////////////////////
  let plusTLBRPairID = "-" + (xCoordinate + 3) + "-" + (yCoordinate + 3);
  let plusTLBRpair = getPlayer(plusTLBRPairID);

  let plusTLBRFirstdeleteID = "-" + (xCoordinate + 1) + "-" + (yCoordinate + 1);
  let plusTLBRFirstdeleteField = getPlayer(plusTLBRFirstdeleteID);

  let plusTLBRSeconddeleteID =
    "-" + (xCoordinate + 2) + "-" + (yCoordinate + 2);
  let plusTLBRSeconddeleteField = getPlayer(plusTLBRSeconddeleteID);

  if (
    plusTLBRpair === e.target.player &&
    plusTLBRFirstdeleteField === plusTLBRSeconddeleteField &&
    e.target.player !== plusTLBRFirstdeleteField
  ) {
    neutralizeFields(plusTLBRFirstdeleteID, plusTLBRSeconddeleteID);
  }
  ///// check plus Diagonal-bottom-left-to-top-right direction (plusBLTR)  ////////////////////////////////////////
  let plusBLTRPairID = "-" + (xCoordinate + 3) + "-" + (yCoordinate - 3);
  let plusBLTRpair = getPlayer(plusBLTRPairID);

  let plusBLTRFirstdeleteID = "-" + (xCoordinate + 1) + "-" + (yCoordinate - 1);
  let plusBLTRFirstdeleteField = getPlayer(plusBLTRFirstdeleteID);

  let plusBLTRSeconddeleteID =
    "-" + (xCoordinate + 2) + "-" + (yCoordinate - 2);
  let plusBLTRSeconddeleteField = getPlayer(plusBLTRSeconddeleteID);

  if (
    plusBLTRpair === e.target.player &&
    plusBLTRFirstdeleteField === plusBLTRSeconddeleteField &&
    e.target.player !== plusBLTRSeconddeleteField
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
