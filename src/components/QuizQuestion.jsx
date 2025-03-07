import React from 'react';

const QuizQuestion = ({ question, selectedAnswer, onSelectAnswer }) => {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: question.question }}></p>
      
      <div className="space-y-2">
        {question.answers.map((answer, index) => (
          <div 
            key={index}
            className="flex items-center"
          >
            <input
              type="radio"
              id={`question-${question.id}-answer-${index}`}
              name={`question-${question.id}`}
              checked={selectedAnswer === answer}
              onChange={() => onSelectAnswer(question.id, answer)}
              className="h-5 w-5 text-purple-600 focus:ring-purple-500"
            />
            <label 
              htmlFor={`question-${question.id}-answer-${index}`}
              className="ml-2 text-gray-700 cursor-pointer"
              dangerouslySetInnerHTML={{ __html: answer }}
            ></label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;