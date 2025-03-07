import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Footer from './components/Footer';
import QuizQuestion from './components/QuizQuestion';
import Results from './components/Results';

function App() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch questions from Open Trivia Database
  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);
    setUserAnswers({});
    setShowResults(false);
    
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      const data = await response.json();
      
      if (data.response_code === 0) {
        // Process questions to include all answers in a single array
        const processedQuestions = data.results.map((question, index) => {
          // Combine correct and incorrect answers
          const allAnswers = [
            ...question.incorrect_answers, 
            question.correct_answer
          ];
          
          // Shuffle answers
          const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
          
          return {
            id: index,
            question: question.question,
            answers: shuffledAnswers,
            correctAnswer: question.correct_answer
          };
        });
        
        setQuestions(processedQuestions);
      } else {
        setError('Failed to load questions. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load questions when component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer
    });
  };

  // Handle quiz submission
  const handleSubmit = () => {
    // Calculate score
    let newScore = 0;
    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        newScore += 1;
      }
    });
    
    setScore(newScore);
    setShowResults(true);
  };

  // Start a new quiz
  const handleNewQuiz = () => {
    fetchQuestions();
  };

  // Check if all questions have been answered
  const allQuestionsAnswered = questions.length > 0 && 
    questions.every(question => userAnswers[question.id]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-300 to-purple-300">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Trivia Quiz
        </h1>
        
        {isLoading ? (
          <Card title="Loading Quiz">
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          </Card>
        ) : error ? (
          <Card title="Error">
            <div className="text-red-500 py-4">{error}</div>
            <button 
              onClick={fetchQuestions}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Try Again
            </button>
          </Card>
        ) : showResults ? (
          <Results 
            score={score} 
            totalQuestions={questions.length} 
            questions={questions}
            userAnswers={userAnswers}
            onNewQuiz={handleNewQuiz}
          />
        ) : (
          <>
            {questions.map((question, index) => (
              <div key={question.id} className="mb-6">
                <Card title={`Question ${index + 1}`}>
                  <QuizQuestion
                    question={question}
                    selectedAnswer={userAnswers[question.id]}
                    onSelectAnswer={handleAnswerSelect}
                  />
                </Card>
              </div>
            ))}
            
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
                className={`w-full px-4 py-3 rounded-lg text-white font-bold ${
                  allQuestionsAnswered 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Quiz
              </button>
              {!allQuestionsAnswered && (
                <p className="text-center mt-2 text-white">
                  Please answer all questions before submitting
                </p>
              )}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;