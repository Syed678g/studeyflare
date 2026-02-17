"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { CheckCircle, XCircle } from "lucide-react";
import styles from "./page.module.css";

const mockQuestions = [
    {
        id: 1,
        question: "Which of the following is NOT a state of matter?",
        options: ["Solid", "Liquid", "Gas", "Energy"],
        correct: 3 // Energy
    },
    {
        id: 2,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        correct: 1 // Mitochondria
    },
    {
        id: 3,
        question: "The acceleration due to gravity on Earth is approximately:",
        options: ["9.8 m/s²", "10.5 m/s²", "8.9 m/s²", "12.0 m/s²"],
        correct: 0 // 9.8
    }
];

export default function QuizPage({ params }: { params: { id: string } }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleOptionClick = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;

        setIsAnswered(true);
        if (selectedOption === mockQuestions[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < mockQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
    };

    if (showResults) {
        return (
            <div className={styles.container}>
                <div className={styles.resultCard}>
                    <div className={styles.resultIcon}>
                        <CheckCircle size={64} className={styles.successIcon} />
                    </div>
                    <h1>Quiz Completed!</h1>
                    <p className={styles.scoreText}>You scored <span className={styles.scoreValue}>{score} / {mockQuestions.length}</span></p>
                    <div className={styles.actions}>
                        <Button variant="primary" onClick={resetQuiz}>Try Again</Button>
                        <Button variant="outline" onClick={() => window.history.back()}>Back onto List</Button>
                    </div>
                </div>
            </div>
        );
    }

    const question = mockQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

    return (
        <div className={styles.container}>
            <div className={styles.quizWrapper}>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                </div>

                <div className={styles.questionHeader}>
                    <span className={styles.questionCount}>Question {currentQuestion + 1} of {mockQuestions.length}</span>
                    <span className={styles.scoreDisplay}>Score: {score}</span>
                </div>

                <h2 className={styles.questionText}>{question.question}</h2>

                <div className={styles.optionsGrid}>
                    {question.options.map((option, index) => {
                        let optionClass = styles.option;
                        if (selectedOption === index) optionClass += ` ${styles.selected}`;
                        if (isAnswered) {
                            if (index === question.correct) optionClass += ` ${styles.correct}`;
                            else if (index === selectedOption && index !== question.correct) optionClass += ` ${styles.wrong}`;
                        }

                        return (
                            <button
                                key={index}
                                className={optionClass}
                                onClick={() => handleOptionClick(index)}
                                disabled={isAnswered}
                            >
                                <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
                                {option}
                                {isAnswered && index === question.correct && <CheckCircle size={20} className={styles.feedbackIcon} />}
                                {isAnswered && index === selectedOption && index !== question.correct && <XCircle size={20} className={styles.feedbackIcon} />}
                            </button>
                        );
                    })}
                </div>

                <div className={styles.footer}>
                    {!isAnswered ? (
                        <Button variant="primary" onClick={handleSubmit} disabled={selectedOption === null} size="lg">Submit Answer</Button>
                    ) : (
                        <Button variant="primary" onClick={handleNext} size="lg">
                            {currentQuestion < mockQuestions.length - 1 ? "Next Question" : "See Results"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
