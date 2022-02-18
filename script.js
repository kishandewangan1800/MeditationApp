const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".video-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".timer button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${(Math.floor(fakeDuration / 60)).toString().padStart(2,"0")}:${(Math.floor(
  fakeDuration % 60)).toString().padStart(2,"0")}`;

sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

play.addEventListener("click", function() {
  checkPlaying(song);
});

replay.addEventListener("click", function() {
    restartSong(song);
    
  });


const restartSong = song =>{
    let currentTime = song.currentTime;
    song.currentTime = 0;

}

timeSelect.forEach(option => {
  option.addEventListener("click", function() {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = `${(Math.floor(fakeDuration / 60)).toString().padStart(2,"0")}:${(Math.floor(
      fakeDuration % 60)).toString().padStart(2,"0")}`;
  });
});

const checkPlaying = song => {
  if (song.paused) {
    song.play();
    video.play();
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    song.pause();
    video.pause();
    play.innerHTML = '<i class="fa-solid fa-play"></i>'
  }
};

song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  timeDisplay.textContent = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    video.pause();
  }
};