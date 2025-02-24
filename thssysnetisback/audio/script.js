document.addEventListener("DOMContentLoaded", () => {
  const audioLibrary = document.getElementById('audioLibrary');
  const audioElement = document.getElementById('audioElement');

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
});

function playAudio(src) {
  const audioElement = document.getElementById('audioElement');
  audioElement.src = src;
  audioElement.play();
}

function skipAudio(seconds) {
  const audioElement = document.getElementById('audioElement');
  audioElement.currentTime += seconds;
}

function filterAudioFiles() {
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
}
