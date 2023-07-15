const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'music.json');
class Music {
    static findAll() {
        const data = fs.readFileSync(filePath, 'utf8');
        const musicList = JSON.parse(data);
      
        musicList.forEach((music) => {
          if (!music.hasOwnProperty('count')) {
            music.count = 0;
          }
        });
        
        return musicList;
      }

    static mostPlayed() {
        const musicList = Music.findAll();
      
        musicList.sort((a, b) => b.count - a.count);
        
        return musicList;
      }

  static create(title, artist1, artist2, url) {
    const musicList = Music.findAll();
    const music = {
      id: generateId(), // Generate a unique ID for the music entry
      title,
      artist1,
      artist2,
      url,
      count: 0, // Initialize the count property with 0
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    musicList.push(music);
    saveData(musicList);
    return music;
  }

  static findById(id) {
    const musicList = Music.findAll();
    const music = musicList.find((music) => music.id === id);
  
    if (!music) {
      return null;
    }
  
    // Check if the music object has the count property
    if (!music.hasOwnProperty('count')) {
      // If count property doesn't exist, initialize it with 0
      music.count = 0;
    }
  
    // Increment the count property by 1
    music.count++;
  
    // Save the updated music list to the file
    saveData(musicList);
  
    return music;
  }

  static update(id, updatedData) {
    const musicList = Music.findAll();
    const musicIndex = musicList.findIndex(music => music.id === id);
    if (musicIndex !== -1) {
      musicList[musicIndex] = { ...musicList[musicIndex], ...updatedData, updatedAt: new Date() };
      saveData(musicList);
      return musicList[musicIndex];
    }
    return null;
  }

  static delete(id) {
    let musicList = Music.findAll();
    const initialLength = musicList.length;
    musicList = musicList.filter(music => music.id !== id);
    if (musicList.length < initialLength) {
      saveData(musicList);
      return true;
    }
    return false;
  }
}

// Generate a unique ID for the music entry
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Save the music data to the JSON file
function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = Music;
