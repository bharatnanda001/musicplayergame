import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RhythmGame from './games/RhythmGame';
import MusicQuiz from './games/MusicQuiz';
import MusicPlayer from './components/MusicPlayer';
import Recommendations from './components/Recommendations';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex gap-4">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/rhythm" className="hover:text-blue-400">Rhythm Game</Link>
            <Link to="/quiz" className="hover:text-blue-400">Music Quiz</Link>
          </div>
        </nav>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                <MusicPlayer />
                <Recommendations />
              </div>
            } />
            <Route path="/rhythm" element={<RhythmGame />} />
            <Route path="/quiz" element={<MusicQuiz />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;