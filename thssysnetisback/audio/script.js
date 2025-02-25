// Your audio files go here—update with your actual files in /audio/
const audioFiles = [
  { name: "Badussy", src: "./badussy.mp3" },
  { name: "Effect", src: "./effect.wav" },
  // Example: { name: "Cool Beat", src: "./cool-beat.mp3" },
  // Add more as you drop files in /audio/
];

document.addEventListener('DOMContentLoaded', () => {
  // Format time (e.g., 0:45)
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  }

  // Elements
  const audioList = document.getElementById('audio-list');
  const searchBar = document.getElementById('audio-search');

  // Create audio item
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
          <div class="progress-thumb"></div>
        </div>
        <span class="time-display">0:00 / 0:00</span>
      </div>
    `;

    const audio = new Audio(file.src);
    const playBtn = item.querySelector('.play-btn');
    const rewindBtn = item.querySelector('.rewind-btn');
    const forwardBtn = item.querySelector('.forward-btn');
    const progressContainer = item.querySelector('.progress-container');
    const progressBar = item.querySelector('.progress-bar');
    const progressThumb = item.querySelector('.progress-thumb');
    const timeDisplay = item.querySelector('.time-display');

    let isDragging = false;

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playBtn.textContent = 'Pause';
      } else {
        audio.pause();
        playBtn.textContent = 'Play';
      }
    });

    rewindBtn.addEventListener('click', () => {
      audio.currentTime = Math.max(0, audio.currentTime - 5);
    });

    forwardBtn.addEventListener('click', () => {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    });

    audio.addEventListener('timeupdate', () => {
      if (!isDragging) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        progressThumb.style.left = `${progress}%`;
        timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
      }
    });

    function updateProgress(e) {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * audio.duration;
      audio.currentTime = newTime;
    }

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

    audio.addEventListener('ended', () => {
      playBtn.textContent = 'Play';
      progressBar.style.width = '0%';
      progressThumb.style.left = '0%';
    });

    return item;
  }

  // Load audio files
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

  // Sidebar toggle
  const menuBtn = document.getElementById('menu-btn');
  menuBtn.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    if (sidebar.style.left === '0px') {
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
  });

  // Header/footer scroll behavior
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
});
