// Variables
const musicPieces = document.querySelectorAll(".music-pieces img"),
  dropZones = document.querySelectorAll(".drop-zone"),
  musicPieceDiv = document.querySelector(".music-pieces"),
  resetButton = document.querySelector("#ResetButton");

const move = document.querySelectorAll(".move-hero-container"),
  theAudio = document.querySelector("#move-image #move"),
  playButton = document.querySelector("#playButton"),
  pauseButton = document.querySelector("#pauseButton"),
  volSlider = document.querySelector("#volumeControl");

let draggedPiece;
const initialPositions = [];

// Store initial positions
musicPieces.forEach((piece) => {
  initialPositions.push(piece.parentNode);
});

// Functions
function handleStartDrag() {
  console.log(`started dragging ${this.alt}`);
  draggedPiece = this;
}

function handleDragOver(e) {
  e.preventDefault();
  console.log("Dragged Over");
}

function handleDrop() {
  // Check if the drop zone already has a piece
  const innerBox = this.querySelector(".inner-box");
  if (innerBox.children.length > 0) {
    console.log("Drop zone is already occupied");

    // Swap the pieces
    const existingPiece = innerBox.children[0];
    initialPositions[existingPiece.dataset.index].appendChild(existingPiece); // Move the existing piece back to its initial container
    innerBox.appendChild(draggedPiece); // Place the dragged piece in the drop zone
  } else {
    console.log("Dropped");
    innerBox.appendChild(draggedPiece); // Place the dragged piece in the drop zone
  }

  console.log(draggedPiece);
  // loadAudio();
  console.log(`audio#${draggedPiece.dataset.audio}`);
  document.querySelector(`audio#${draggedPiece.dataset.audio}`).play();
}

function resetpic() {
  // Move all pieces back to their initial container
  musicPieces.forEach((piece, index) => {
    initialPositions[index].appendChild(piece);
  });

  // Clear the drop zones
  dropZones.forEach((zone) => {
    const innerBox = zone.querySelector(".inner-box");
    while (innerBox.firstChild) {
      innerBox.removeChild(innerBox.firstChild);
    }
  });
}
//Audio functions

function playAudio() {
  theAudio.play();
}
function pauseAudio() {
  theAudio.pause();
}
function restartAudio() {
  theAudio.currentTime = 0;
  playAudio();
}
function setVolume() {
  console.log(this.value);
  theAudio.volume = this.value / 100;
}
function loadAudio() {
  console.log(this.dataset.trackref);
  let currentSrc = `audio/${this.dataset.trackref}.mp3`;
  theAudio.src = currentSrc;
  theAudio.load();

  playAudio();
}

// Drag and Drop Event Listeners
musicPieces.forEach((piece, index) => {
  piece.dataset.index = index; // Store the index as a data attribute
  piece.addEventListener("dragstart", handleStartDrag);
});

dropZones.forEach((zone) => zone.addEventListener("dragover", handleDragOver));
dropZones.forEach((zone) => zone.addEventListener("drop", handleDrop));

musicPieceDiv.addEventListener("dragover", handleDragOver);
musicPieceDiv.addEventListener("drop", handleDrop);

resetButton.addEventListener("click", resetpic);

// Audio Event listener
// move.forEach((move) => move.addEventListener("click", loadAudio));
playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
resetButton.addEventListener("click", restartAudio);
volSlider.addEventListener("change", setVolume);
