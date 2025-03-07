import React from 'react';
import Card from './Card';

const Results = ({ score, totalQuestions, questions, userAnswers, onNewQuiz }) => {
  return (
    <div className="space-y-6">
      <Card title="Quiz Results">
        <div className="text-center py-4">
          <p className="text-2xl font-bold">
            Your Score: {score} out of {totalQuestions}
          </p>
          <p className="text-lg mt-2">
            {score === totalQuestions 
              ? 'Perfect! You got all questions right!' 
              : score >= totalQuestions / 2 
                ? 'Good job! You passed the quiz.' 
                : 'Keep practicing! You can do better next time.'}
          </p>
        </div>
        
        <button
          onClick={onNewQuiz}
          className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 mt-4"
        >
          Take Another Quiz
        </button>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white text-center">Question Review</h2>
        
        {questions.map((question, index) => {
          const isCorrect = userAnswers[question.id] === question.correctAnswer;
          
          return (
            <Card key={question.id} title={`Question ${index + 1}`}>
              <div className="space-y-3">
                <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
                
                <div className="mt-2">
                  <p className="font-medium">Your answer: </p>
                  <p 
                    className={isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}
                    dangerouslySetInnerHTML={{ __html: userAnswers[question.id] }}
                  ></p>
                </div>
                
                {!isCorrect && (
                  <div className="mt-2">
                    <p className="font-medium">Correct answer: </p>
                    <p 
                      className="text-green-600 font-medium"
                      dangerouslySetInnerHTML={{ __html: question.correctAnswer }}
                    ></p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Results;