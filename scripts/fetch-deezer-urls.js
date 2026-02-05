// Script to fetch real Deezer preview URLs for seed songs

const songs = [
  { id: "1", query: "empire state of mind jay-z", title: "Empire State of Mind" },
  { id: "2", query: "london calling the clash", title: "London Calling" },
  { id: "3", query: "viva las vegas elvis presley", title: "Viva Las Vegas" },
  { id: "4", query: "waka waka shakira", title: "Waka Waka" },
  { id: "5", query: "gangnam style psy", title: "Gangnam Style" },
  { id: "6", query: "la vie en rose edith piaf", title: "La Vie en Rose" },
  { id: "7", query: "hotel california eagles", title: "Hotel California" },
  { id: "8", query: "despacito luis fonsi", title: "Despacito" },
  { id: "9", query: "havana camila cabello", title: "Havana" },
  { id: "10", query: "budapest george ezra", title: "Budapest" },
  { id: "11", query: "africa toto", title: "Africa" },
  { id: "12", query: "day-o banana boat harry belafonte", title: "Day-O (Banana Boat)" },
  { id: "13", query: "take me home country roads john denver", title: "Take Me Home, Country Roads" },
  { id: "14", query: "bella ciao", title: "Bella Ciao" },
  { id: "15", query: "waterloo abba", title: "Waterloo" },
  { id: "16", query: "cotton eye joe rednex", title: "Cotton Eye Joe" },
  { id: "17", query: "moskau dschinghis khan", title: "Moskau" },
  { id: "18", query: "copacabana barry manilow", title: "Copacabana" },
  { id: "19", query: "sweet child o mine guns n roses", title: "Sweet Child O' Mine" },
  { id: "20", query: "walk like an egyptian bangles", title: "Walk Like an Egyptian" },
];

async function fetchDeezerData(query) {
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.data && data.data.length > 0) {
    const track = data.data[0];
    return {
      preview_url: track.preview,
      cover_url: track.album.cover_medium,
      deezer_id: track.id.toString(),
    };
  }
  return null;
}

async function main() {
  console.log("Fetching Deezer preview URLs...\n");

  const results = [];

  for (const song of songs) {
    try {
      const data = await fetchDeezerData(song.query);
      if (data) {
        results.push({
          id: song.id,
          title: song.title,
          ...data,
        });
        console.log(`✓ ${song.title}`);
      } else {
        console.log(`✗ ${song.title} - NOT FOUND`);
      }
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.log(`✗ ${song.title} - ERROR: ${error.message}`);
    }
  }

  console.log("\n--- Results JSON ---\n");
  console.log(JSON.stringify(results, null, 2));
}

main();
