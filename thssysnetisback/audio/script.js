document.addEventListener("DOMContentLoaded", () => {
  const audioLibrary = document.getElementById('audioLibrary');
  const audioElement = document.getElementById('audioElement');
  let currentSrc = '';

  // Example audio files array
  const audioFiles = [
    { title: 'Sample Audio 1', src: 'audio/sample1.mp3' },
    { title: 'Sample Audio 2', src: 'audio/sample2.wav' }
  ];

  // Display audio files
  audioFiles.forEach(file => {
    const audioItem = document.createElement('div');
    audioItem.classList.add('audio-item');
    audioItem.innerHTML = `<p>${file.title}</p><button onclick="playAudio('${file.src}')">Play</button>`;
    audioLibrary.appendChild(audioItem);
  });

  // Set up audio player controls
  function playAudio(src) {
    if (currentSrc === src && !audioElement.paused) {
      audioElement.pause();
    } else {
      audioElement.src = src;
      audioElement.play();
      currentSrc = src;
    }
  }

  window.playPauseAudio = function() {
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  };

  window.skipAudio = function(seconds) {
    audioElement.currentTime += seconds;
  };

  window.downloadAudio = function() {
    if (currentSrc) {
      const link = document.createElement('a');
      link.href = currentSrc;
      link.download = currentSrc.split('/').pop();
      link.click();
    }
  };

  window.filterAudioFiles = function() {
    const searchBar = document.getElementById('searchBar');
    const filter = searchBar.value.toLowerCase();
    const audioItems = document.getElementsByClassName('audio-item');

    Array.from(audioItems).forEach(item => {
      const title = item.getElementsByTagName('p')[0];
      if (title.innerHTML.toLowerCase().indexOf(filter) > -1) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  };
});
