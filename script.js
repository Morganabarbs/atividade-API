const form = document.getElementById("search-form");
const input = document.getElementById("artist-input");
const resultsSection = document.getElementById("results");

const API_KEY = "447a5eb13cff8143bb57acc07c678833"; // coloque sua chave do Last.fm
const API_URL = "https://ws.audioscrobbler.com/2.0/";

async function buscarAlbuns(artista) {
  try {
    const response = await fetch(
      `${API_URL}?method=artist.gettopalbums&artist=${encodeURIComponent(artista)}&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();

    resultsSection.innerHTML = "";

    if (data.topalbums && data.topalbums.album.length > 0) {
      // Filtrar apenas álbuns válidos (com imagem e nome)
      const albunsValidos = data.topalbums.album.filter(album => {
        return album.name && album.image[2]["#text"];
      });

      albunsValidos.forEach(album => {
        const albumDiv = document.createElement("div");
        albumDiv.classList.add("album-card"); // classe para estilizar com background

        const img = document.createElement("img");
        img.src = album.image[2]["#text"];
        img.alt = album.name;

        const title = document.createElement("h3");
        title.textContent = album.name;

        const artistName = document.createElement("p");
        artistName.textContent = `Artista: ${album.artist.name}`;

        albumDiv.appendChild(img);
        albumDiv.appendChild(title);
        albumDiv.appendChild(artistName);

        resultsSection.appendChild(albumDiv);
      });
    } else {
      resultsSection.innerHTML = "<p>Nenhum álbum encontrado.</p>";
    }
  } catch (error) {
    console.error("Erro ao buscar álbuns:", error);
    resultsSection.innerHTML = "<p>Ocorreu um erro na busca.</p>";
  }
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const artista = input.value.trim();
  if (artista) {
    buscarAlbuns(artista);
  }
});
