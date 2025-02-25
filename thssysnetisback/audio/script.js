// Sample audio files (update this list manually for static sites)
const audioFiles = [
  { name: "Track 1", src: "./track1.mp3" },
  { name: "Effect", src: "./effect.wav" },
  // Add more files here as you drop them in /audio/
];

// Function to format time (e.g., 0:45)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

// Build audio items
const audioList = document.getElementById('audio-list');
const searchBar = document.getElementById('audio-search');

function createAudioItem(file) {
  const item = document.createElement('div');
  item.className = 'audio-item';
  item.innerHTML = `
    <h2>${file.name}</h2>
    <div class="audio-player">
      <button class="audio-btn play-btn">Play</button>
      <button class="audio-btn rewind-btn">-5s</button>
      <button class="audio-btn forward-btn">+5s</button>
      <div class="progress-container">
        <div class="progress-bar"></div>
      </div>
      <span​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
