// FillInTheBlank.js
import React, { useState } from 'react';

const FillInTheBlank = ({ question, answer }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [submittedAnswer, setSubmittedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value)
    };

    const handleSubmit = () => {
        setSubmittedAnswer(userAnswer);
        setIsCorrect(userAnswer.toLowerCase() === answer.toLowerCase())
    };

    const splitQuestion = question.split('_');
    const questionParts = splitQuestion.map((part, index) => {
        if (index === splitQuestion.length - 1) {
            return part;
        } else {
            return (
                <span key={index}>
                    {part}
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={handleInputChange}
                        placeholder="Your answer"
                    />
                </span>
            );
        }
    });

    return (
        <div className="card">
            <div className="card-body">
                <p>{questionParts}</p><button class="b1" onClick={handleSubmit}>Check</button>
                {submittedAnswer && (
                    <p>
                        Submitted Answer: {submittedAnswer} -{' '}
                        {isCorrect ? 'Correct' : 'Incorrect'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default FillInTheBlank;


