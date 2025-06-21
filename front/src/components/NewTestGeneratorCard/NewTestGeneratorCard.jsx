import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/generate-question'; // Change to your backend endpoint

const NewTestGeneratorCard = () => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchQuestion = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch question');
            const data = await response.json();
            setQuestion(data.question);
            setAnswers(data.answers);
        } catch (error) {
            setQuestion('Error loading question.');
            setAnswers([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchQuestion();
    }, []);

    const handleNext = () => {
        fetchQuestion();
    };

    return (
        <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Test Generator</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div style={{ marginBottom: '1rem' }}>
                        <strong>Question:</strong>
                        <p>{question}</p>
                    </div>
                    <div>
                        <strong>Answers:</strong>
                        <ul>
                            {answers.map((ans, idx) => (
                                <li key={idx}>{ans}</li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={handleNext} style={{ marginTop: '1rem' }}>
                        Next Question
                    </button>
                </>
            )}
        </div>
    );
};

export default NewTestGeneratorCard;