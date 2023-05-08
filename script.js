const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let currentIndex = 0;

// prev song
function prevSong() {
    currentIndex--;
    if (currentIndex === -1) {
      currentIndex=songs.length-1;
    }
  loadSong(songs[currentIndex]);
  playSong();
}
// next song
function nextSong() {
    currentIndex++;
    if (currentIndex === songs.length) {
      currentIndex=0;
    }
  loadSong(songs[currentIndex]);
  playSong();
}
// on load select first song
loadSong(songs[currentIndex]);




// update progress bar
function updateProgressBar(e){
    const{duration,currentTime}=e.srcElement;
    const progressPercent=(currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
    // calculate duration
    const durationMinutes=Math.floor(duration/60);
    let durationSeconds=Math.floor(duration%60);
    if(durationSeconds<10){
        durationSeconds=`0${durationSeconds}`
    }
    if(durationSeconds){
        durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
    }
    // calculate current
    const currentMinutes=Math.floor(currentTime/60);
    let currentSeconds=Math.floor(currentTime%60);
    if(currentSeconds<10){
        currentSeconds=`0${currentSeconds}`
    }
    if(currentSeconds){
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
    }
    
}
// set progressbar
function setProgressBar(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const{duration}=music;
    music.currentTime=(clickX/width)*duration;
}
// events

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar)