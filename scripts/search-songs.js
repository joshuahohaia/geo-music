// Script to search for songs on Deezer and get their track IDs

const searches = [
  // Requested artists
  { query: "Kokoroko Abusey Junction", artist: "Kokoroko", location: "London, UK" },
  { query: "Pale Jay Bewilderment", artist: "Pale Jay", location: "Los Angeles, USA" },
  { query: "Olivia Dean Dive", artist: "Olivia Dean", location: "London, UK" },
  // Multi-language songs from around the world
  { query: "Khruangbin Maria También", artist: "Khruangbin", location: "Houston, Texas" },
  { query: "Fela Kuti Zombie", artist: "Fela Kuti", location: "Lagos, Nigeria" },
  { query: "Tinariwen Sastanàqqàm", artist: "Tinariwen", location: "Kidal, Mali" },
  { query: "Sigur Rós Hoppípolla", artist: "Sigur Rós", location: "Reykjavik, Iceland" },
  { query: "Gipsy Kings Bamboleo", artist: "Gipsy Kings", location: "Arles, France" },
  { query: "Amadou & Mariam Beaux Dimanches", artist: "Amadou & Mariam", location: "Bamako, Mali" },
  { query: "Anitta Envolver", artist: "Anitta", location: "Rio de Janeiro, Brazil" },
  { query: "Bad Bunny Tití Me Preguntó", artist: "Bad Bunny", location: "San Juan, Puerto Rico" },
  { query: "Stromae Papaoutai", artist: "Stromae", location: "Brussels, Belgium" },
  { query: "Cesária Évora Sodade", artist: "Cesária Évora", location: "Mindelo, Cape Verde" },
  { query: "Youssou N'Dour 7 Seconds", artist: "Youssou N'Dour", location: "Dakar, Senegal" },
];

async function searchSongs() {
  console.log("Searching for songs on Deezer...\n");

  const results = [];

  for (const search of searches) {
    try {
      const response = await fetch(
        `https://api.deezer.com/search?q=${encodeURIComponent(search.query)}`
      );
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const track = data.data[0];
        results.push({
          title: track.title,
          artist: track.artist.name,
          album: track.album.title,
          deezer_id: track.id.toString(),
          preview_url: track.preview,
          cover_url: track.album.cover_medium,
          search_location: search.location,
        });
        console.log(`✓ ${track.title} - ${track.artist.name} (ID: ${track.id})`);
      } else {
        console.log(`✗ No results for: ${search.query}`);
      }

      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      console.log(`✗ Error searching: ${search.query} - ${err.message}`);
    }
  }

  console.log("\n\nResults JSON:");
  console.log(JSON.stringify(results, null, 2));
}

searchSongs();
