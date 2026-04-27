const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-bar");
const volumeSlider = document.getElementById("volume");
const speedSelect = document.getElementById("speed");

const songs = [
  {
    title:
      "AI Ayaa Shaqadaada La Wareegi Doonta...",
    artist: "Dugsiiye",
    videoId: "pQuz7QmSmxM",
  },
  { title: "Hadda Baro Xirfadahaan 2026", artist: "Dugsiiye", videoId: "iZcRCEVeKao" },
  {
    title: "Sidee Ayaad U Baran Kartaa AI 2026",
    artist: "Dugsiiye",
    videoId: "iylK9IjiTNI",
  },
  {
    title: "Vibe Coding Iyo Agentic Coding",
    artist: "Dugsiiye",
    videoId: "JmwPGeHCW84",
  },
];

let songIndex = 0;
let isPlaying = false;
let speed = 1;
let ytPlayer = null; 
let ticker = null; 
let playerReady = false;

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("ytFrame", {
    videoId: songs[songIndex].videoId,
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
      controls: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady() {
  playerReady = true; 
  ytPlayer.setVolume(Math.round(volumeSlider.value * 100));
  title.textContent = songs[songIndex].title;
  artist.textContent = songs[songIndex].artist;
}

function onPlayerStateChange(e) {
  if (e.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    setPlayIcon(true);
    startTicker();
  } else if (e.data === YT.PlayerState.PAUSED) {
    isPlaying = false;
    setPlayIcon(false);
    stopTicker();
  } else if (e.data === YT.PlayerState.ENDED) {
    nextSong();
  }
}

function startTicker() {
  stopTicker();
  ticker = setInterval(updateProgress, 500);
}

function stopTicker() {
  clearInterval(ticker);
  ticker = null;
}

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  if (!ytPlayer || !playerReady) return; 
  ytPlayer.loadVideoById(song.videoId);
}

title.textContent = songs[songIndex].title;
artist.textContent = songs[songIndex].artist;

function playSong() {
  if (!ytPlayer || !playerReady) return; 
  ytPlayer.playVideo();
}

function pauseSong() {
  if (!ytPlayer || !playerReady) return;
  ytPlayer.pauseVideo();
}

function prevSong() {
  pauseSong();
  setTimeout(() => {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
  }, 300);
}

function nextSong() {
  pauseSong();
  setTimeout(() => {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  }, 300);
}

function updateProgress() {
  if (!ytPlayer || !playerReady || !ytPlayer.getDuration) return; 
  const duration = ytPlayer.getDuration();
  const currentTime = ytPlayer.getCurrentTime();
  if (!duration) return;

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
  durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}

function setProgress(e) {
  if (!ytPlayer || !playerReady || !ytPlayer.getDuration) return; 
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = ytPlayer.getDuration();
  if (!duration) return;
  const newTime = (clickX / width) * duration;

  if (isFinite(newTime)) {
    ytPlayer.seekTo(newTime, true);
  }
}

function setPlayIcon(playing) {
  const icon = playBtn.querySelector("i");
  icon.classList.toggle("fa-pause", playing);
  icon.classList.toggle("fa-play", !playing);
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

progressContainer.addEventListener("click", setProgress);

volumeSlider.addEventListener("input", (e) => {
  if (ytPlayer && playerReady && ytPlayer.setVolume) {
    ytPlayer.setVolume(Math.round(e.target.value * 100));
  }
});

speedSelect.addEventListener("change", (e) => {
  speed = parseFloat(e.target.value);
  if (ytPlayer && playerReady && ytPlayer.setPlaybackRate) {
    ytPlayer.setPlaybackRate(speed);
  }
});
