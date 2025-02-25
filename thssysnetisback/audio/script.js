// List your audio filenames here—update this when you add new files
const audioFileNames = [
  "badussy.mp3",
  "chill-vibe.wav",
  // Add new filenames here as you upload them
];

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const audioList = document.getElementById('audio-list');
  const audioPlayer = document.getElementById('audio-player');
  const playBtn = audioPlayer.querySelector('.play-btn');
  const rewindBtn = audioPlayer.querySelector('.rewind-btn');
  const forwardBtn = audioPlayer.querySelector('.forward-btn');
  const progressContainer = audioPlayer.querySelector('.progress-container');
  const progressBar = audioPlayer.querySelector('.progress-bar');
  const progressThumb = audioPlayer.querySelector('.progress-thumb');
  const timeDisplay = audioPlayer.querySelector('.time-display');

  let currentAudio = new Audio();
  let isDragging = false;

  // Format time
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  }

  // Update player
  function updatePlayer() {
    currentAudio.addEventListener('timeupdate', () => {
      if (!isDragging) {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        progressThumb.style.left = `${progress}%`;
        timeDisplay.textContent = `${formatTime(currentAudio.currentTime)} / ${formatTime(currentAudio.duration || 0)}`;
      }
    });

    currentAudio.addEventListener('ended', () => {
      playBtn.textContent = 'Play';
      progressBar.style.width = '0%';
      progressThumb.style.left = '0%';
    });
  }

  // Player controls
  playBtn.addEventListener('click', () => {
    if (currentAudio.src) {
      if (currentAudio.paused) {
        currentAudio.play();
        playBtn.textContent = 'Pause';
      } else {
        currentAudio.pause();
        playBtn.textContent = 'Play';
      }
    }
  });

  rewindBtn.addEventListener('click', () => {
    currentAudio.currentTime = Math.max(0, currentAudio.currentTime - 5);
  });

  forwardBtn.addEventListener('click', () => {
    currentAudio.currentTime = Math.min(currentAudio.duration, currentAudio.currentTime + 5);
  });

  progressContainer.addEventListener('mousedown', (e) => {
    if (currentAudio.src) {
      isDragging = true;
      updateProgress(e);
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) updateProgress(e);
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  function updateProgress(e) {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    currentAudio.currentTime = (clickX / width) * currentAudio.duration;
  }

  // Load audio files as clickable links
  function loadAudioFiles() {
    audioList.innerHTML = '';
    audioFileNames.forEach(filename => {
      const item = document.createElement('div');
      item.className = 'audio-item';
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = filename.replace(/\.(mp3|wav)$/, '');
      link.addEventListener('click', (e) => {
        e.preventDefault();
        currentAudio.pause();
        currentAudio = new Audio(`./${filename}`);
        updatePlayer();
        currentAudio.play();
        playBtn.textContent = 'Pause';
      });
      item.appendChild(link);
      audioList.appendChild(item);
    });
  }

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
});
