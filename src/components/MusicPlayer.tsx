import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export default function MusicPlayer() {
  const [pitch, setPitch] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const playerRef = useRef<Tone.Player | null>(null);

  useEffect(() => {
    playerRef.current = new Tone.Player().toDestination();
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  const handlePitchChange = (newPitch: number) => {
    setPitch(newPitch);
    if (playerRef.current) {
      playerRef.current.playbackRate = newPitch;
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && playerRef.current) {
      setIsLoaded(false);
      const url = URL.createObjectURL(file);
      try {
        await playerRef.current.load(url);
        setIsLoaded(true);
        console.log('Audio file loaded successfully');
      } catch (error) {
        console.error('Error loading audio file:', error);
      }
    }
  };

  const togglePlayback = async () => {
    if (!playerRef.current || !isLoaded) {
      console.warn('No audio file loaded');
      return;
    }

    try {
      await Tone.start();
      if (isPlaying) {
        playerRef.current.stop();
      } else {
        playerRef.current.start();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Music Player</h2>
      
      <div>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-300 mb-4"
        />
      </div>

      <div className="space-y-2">
        <label className="block">
          Pitch Control: {pitch.toFixed(2)}x
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
            className="block w-full"
          />
        </label>
      </div>

      <button
        onClick={togglePlayback}
        disabled={!isLoaded}
        className={`px-4 py-2 rounded ${
          isLoaded 
            ? 'bg-blue-500 hover:bg-blue-600' 
            : 'bg-gray-500 cursor-not-allowed'
        }`}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      
      {!isLoaded && (
        <p className="text-sm text-gray-400">
          Please upload an audio file to start playing
        </p>
      )}
    </div>
  );
}