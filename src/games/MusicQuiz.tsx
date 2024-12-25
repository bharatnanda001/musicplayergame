import { useState } from 'react';

const QUESTIONS = [
  {
    question: "Which of these is a major scale?",
    options: ["C D E F G A B C", "C D Eb F G Ab Bb C", "C D E F# G A B C"],
    correct: 0
  },
  {
    question: "What is the time signature of a waltz?",
    options: ["4/4", "3/4", "6/8"],
    correct: 1
  },
  {
    question: "Which term means 'gradually getting louder'?",
    options: ["Diminuendo", "Crescendo", "Forte"],
    correct: 1
  }
];

export default function MusicQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    if (optionIndex === QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quiz Complete!</h2>
        <p className="text-xl">Your score: {score}/{QUESTIONS.length}</p>
        <button
          onClick={resetQuiz}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        >
          Play Again
        </button>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Music Quiz</h2>
      <p className="text-xl">{question.question}</p>
      
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="block w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-left"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}