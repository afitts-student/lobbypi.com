// Audio files list (update this with your actual files)
const audioFiles = [
  { name: "Track 1", src: "./track1.mp3" },
  { name: "Effect", src: "./effect.wav" },
  // Add your .mp3/.wav files here
];

// Format time (e.g., 0:45)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

// Create audio item
function createAudioItem(file) {
  const item = document.createElement('div');
  item.className = 'audio-item';
  item.innerHTML = `
    <h2>${file.name}</h2>
    <div class="audio-player">
      <div class="audio-controls">
        <button class="audio-btn play-btn">▶</button>
        <button class="audio-btn rewind-btn">⏪</button>
        <button class="audio-btn forward-btn">⏩</button>
      </div>
      <div class="scrub-island">
        <div class="progress-container">
          <div class="progress-symbols">⋮⋮⋮⋮⋮</div>
          <div class="progress-bar"><span class="progress-handle"></span></div>
        </div>
        <span class="time-display">0:00 / 0:00</span>
      </div>
    </div>
  `;

  const audio = new Audio(file.src);
  const playBtn = item.querySelector('.play-btn');
  const rewindBtn = item.querySelector('.rewind-btn');
  const forwardBtn = item.querySelector('.forward-btn');
  const progressContainer = item.querySelector('.progress-container');
  const progressBar = item.querySelector('.progress-bar');
  const progressHandle = item.querySelector('.progress-handle');
  const timeDisplay = item.querySelector('.time-display');

  // Play/Pause
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = '⏸';
    } else {
      audio.pause();
      playBtn.textContent = '▶';
    }
  });

  // Rewind/Forward
  rewindBtn.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 5);
  });

  forwardBtn.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
  });

  // Progress Update
  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
  });

  // Scrubbing
  let isDragging = false;
  progressContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateProgress(e);
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) updateProgress(e);
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  progressHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  function updateProgress(e) {
    if (!isDragging) return;
    const rect = progressContainer.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const progress = clickX / rect.width;
    audio.currentTime = progress * audio.duration;
  }

  audio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
    progressBar.style.width = '0%';
  });

  return item;
}

// Load audio files
const audioList = document.getElementById('audio-list');
const searchBar = document.getElementById('audio-search');

function loadAudioFiles() {
  audioList.innerHTML = '';
  audioFiles.forEach(file => audioList.appendChild(createAudioItem(file)));
}

// Search functionality
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  audioList.innerHTML = '';
  audioFiles
    .filter(file => file.name.toLowerCase().includes(query))
    .forEach(file => audioList.appendChild(createAudioItem(file)));
});

// Initial load
loadAudioFiles();

// Header/footer scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');
  if (window.scrollY > 50) {
    header.classList.add('shrink');
    footer.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
    footer.classList.remove('shrink');
  }
});

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('content');
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');
  if (sidebar.style.left === '0px' || sidebar.style.left === '') {
    sidebar.style.left = '-250px';
    content.style.marginLeft = '0';
    header.style.marginLeft = '0';
    footer.style.marginLeft = '0';
  } else {
    sidebar.style.left = '0px';
    content.style.marginLeft = '250px';
    header.style.marginLeft = '250px';
    footer.style.marginLeft = '250px';
  }
}
