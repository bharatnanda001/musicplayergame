import { useEffect, useState } from 'react';
import * as Tone from 'tone';

export default function RhythmGame() {
  const [score, setScore] = useState(0);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
    return () => {
      synth.dispose();
    };
  }, []);

  const startGame = () => {
    const newSequence = Array(4).fill(0).map(() => Math.floor(Math.random() * 4));
    setSequence(newSequence);
    setPlayerSequence([]);
    setIsPlaying(true);
    playSequence(newSequence);
  };

  const playSequence = async (seq: number[]) => {
    const synth = new Tone.Synth().toDestination();
    const notes = ['C4', 'E4', 'G4', 'B4'];
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      synth.triggerAttackRelease(notes[seq[i]], '8n');
    }
  };

  const handlePress = (noteIndex: number) => {
    if (!isPlaying) return;

    const newPlayerSequence = [...playerSequence, noteIndex];
    setPlayerSequence(newPlayerSequence);

    const synth = new Tone.Synth().toDestination();
    const notes = ['C4', 'E4', 'G4', 'B4'];
    synth.triggerAttackRelease(notes[noteIndex], '8n');

    if (newPlayerSequence.length === sequence.length) {
      const correct = newPlayerSequence.every((note, i) => note === sequence[i]);
      if (correct) {
        setScore(s => s + 100);
        setTimeout(startGame, 1000);
      } else {
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Rhythm Game</h2>
      <div className="text-xl">Score: {score}</div>
      
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {[0, 1, 2, 3].map(i => (
          <button
            key={i}
            onClick={() => handlePress(i)}
            className="bg-blue-500 hover:bg-blue-600 p-8 rounded-lg"
          />
        ))}
      </div>

      <button
        onClick={startGame}
        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
      >
        {isPlaying ? 'Restart' : 'Start Game'}
      </button>
    </div>
  );
}