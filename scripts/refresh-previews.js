const fs = require('fs');
const path = require('path');

const songsPath = path.join(__dirname, '..', 'src', 'data', 'seed-songs.json');

async function refreshPreviews() {
  const songs = JSON.parse(fs.readFileSync(songsPath, 'utf-8'));

  console.log(`Refreshing preview URLs for ${songs.length} songs...\n`);

  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const deezerId = song.deezer_id;

    try {
      const response = await fetch(`https://api.deezer.com/track/${deezerId}`);
      const data = await response.json();

      if (data.error) {
        console.log(`[${i + 1}/${songs.length}] ERROR: ${song.title} - ${data.error.message}`);
        continue;
      }

      if (data.preview) {
        songs[i].preview_url = data.preview;
        console.log(`[${i + 1}/${songs.length}] OK: ${song.title}`);
      } else {
        console.log(`[${i + 1}/${songs.length}] NO PREVIEW: ${song.title}`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (err) {
      console.log(`[${i + 1}/${songs.length}] FETCH ERROR: ${song.title} - ${err.message}`);
    }
  }

  fs.writeFileSync(songsPath, JSON.stringify(songs, null, 2));
  console.log('\nDone! Updated seed-songs.json');

  // Regenerate migration file
  console.log('\nRegenerating migration.sql...');
  require('./generate-migration.js');
}

refreshPreviews();
