document.getElementById('search-button').addEventListener('click', async () => {
  const query = document.getElementById('search-input').value;
  const apiKey = 'AIzaSyA227ykrmObYmz19kT80CayebloBSTrnmk'; // Reemplaza con tu clave de API
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data.items);
  } catch (error) {
    console.error('Error al buscar videos:', error);
  }
});

function displayResults(videos) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

  videos.forEach(video => {
    const videoItem = document.createElement('div');
    videoItem.classList.add('video-item');
    videoItem.innerHTML = `
            <h4>${video.snippet.title}</h4>
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}">
            <button onclick="playVideo('${video.id.videoId}')">Reproducir</button>
            <button onclick="addToPlaylist('${video.id.videoId}', '${video.snippet.title}', '${video.snippet.thumbnails.high.url}')">Agregar a Playlist</button>
        `;
    resultsContainer.appendChild(videoItem);
  });
}

function playVideo(videoId) {
  const playerContainer = document.getElementById('player-container');
  const currentVideo = document.getElementById('current-video');

  currentVideo.innerHTML = `
        <iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
    `;

  playerContainer.style.display = 'block';
}

function addToPlaylist(videoId, title, thumbnail) {
  const playlist = document.getElementById('playlist');
  const listItem = document.createElement('li');
  listItem.innerHTML = `
        <img src="${thumbnail}" alt="${title}" style="width: 30px; height: auto;">
        ${title} 
        <button onclick="removeFromPlaylist(this)">Eliminar</button>
    `;
  playlist.appendChild(listItem);
}

function removeFromPlaylist(button) {
  const listItem = button.parentElement;
  listItem.remove();
}

document.getElementById('close-player').addEventListener('click', () => {
  const playerContainer = document.getElementById('player-container');
  const currentVideo = document.getElementById('current-video');
  currentVideo.innerHTML = ''; // Limpiar el video actual
  playerContainer.style.display = 'none';
});

document.getElementById('clear-playlist').addEventListener('click', () => {
  const playlist = document.getElementById('playlist');
  playlist.innerHTML = ''; // Limpiar la lista de reproducción
});