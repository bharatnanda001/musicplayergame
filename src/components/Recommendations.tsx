import { useState } from 'react';

// Simulated music database
const MUSIC_DATABASE = [
  { id: 1, title: 'Summer Breeze', genre: 'Pop', mood: 'Happy' },
  { id: 2, title: 'Midnight Jazz', genre: 'Jazz', mood: 'Relaxed' },
  { id: 3, title: 'Rock Anthem', genre: 'Rock', mood: 'Energetic' },
  { id: 4, title: 'Chill Beats', genre: 'Electronic', mood: 'Relaxed' },
  { id: 5, title: 'Dance Party', genre: 'Pop', mood: 'Energetic' },
];

export default function Recommendations() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const getRecommendations = () => {
    return MUSIC_DATABASE.filter(song => 
      (!selectedGenre || song.genre === selectedGenre) &&
      (!selectedMood || song.mood === selectedMood)
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Music Recommendations</h2>
      
      <div className="space-y-2">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="block w-full bg-gray-700 rounded px-3 py-2"
        >
          <option value="">Select Genre</option>
          <option value="Pop">Pop</option>
          <option value="Jazz">Jazz</option>
          <option value="Rock">Rock</option>
          <option value="Electronic">Electronic</option>
        </select>

        <select
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
          className="block w-full bg-gray-700 rounded px-3 py-2"
        >
          <option value="">Select Mood</option>
          <option value="Happy">Happy</option>
          <option value="Relaxed">Relaxed</option>
          <option value="Energetic">Energetic</option>
        </select>
      </div>

      <div className="space-y-2">
        {getRecommendations().map(song => (
          <div key={song.id} className="bg-gray-800 p-3 rounded">
            <h3 className="font-bold">{song.title}</h3>
            <p className="text-sm text-gray-400">
              {song.genre} • {song.mood}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}