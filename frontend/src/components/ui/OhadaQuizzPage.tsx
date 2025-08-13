/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/ohada-quizz/page.tsx

"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// Un petit composant pour l'icône, pour plus de clarté
const TargetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 inline-block mr-2"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
      clipRule="evenodd"
    />
  </svg>
);

const OhadaQuizzPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const GOOGLE_SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSdVfKYMfcjKXhtbM1cNjPkX7Js5568IqyQWaaWNamSxj4ksM4CMf4jt_pg36yf6Q/pub?gid=1932095547&single=true&output=csv";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_URL);
        const text = await response.text();
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            const loadedQuestions: Question[] = results.data
              .map((row: any) => ({
                question: row.Question,
                options: [
                  row["Réponse 1"],
                  row["Réponse 2"],
                  row["Réponse 3"],
                  row["Réponse 4"],
                ].filter(Boolean),
                correctAnswer: row["Bonne réponse"],
                explanation: row.Explication,
              }))
              .filter((q) => q.question); // Filtre les lignes vides

            // On prend 5 questions au hasard pour le quiz de la semaine
            const shuffled = [...loadedQuestions].sort(
              () => 0.5 - Math.random()
            );
            setQuestions(shuffled.slice(0, 5));
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Erreur lors du chargement du quiz:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement du quiz...
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isQuizFinished = currentQuestionIndex >= questions.length;

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl text-center">
        {/* MODIFIÉ: Titre et Intro avec le nouveau style */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-700 flex items-center justify-center">
            <TargetIcon />
            OHADA Quizz
          </h1>
          <h2 className="mt-2 text-lg text-sky-600">
            Testez vos connaissances chaque semaine !
          </h2>
          {/* NOUVEAU: Ajout du paragraphe d'introduction */}
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Pensé pour les étudiants, jeunes professionnels et passionnés de
            droit OHADA, l'OHADA Quizz vous permet de réviser vos acquis, de
            vous challenger et de progresser de manière ludique. Chaque semaine,
            découvrez un nouveau quiz pour mettre vos connaissances à l’épreuve
            – et c’est entièrement gratuit !
          </p>
        </div>

        {/* MODIFIÉ: Classes pour le style de la carte principale */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-100 p-6 sm:p-8 rounded-3xl shadow-xl border border-sky-200/80 relative overflow-hidden">
          {isQuizFinished ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800">
                Quiz terminé !
              </h2>
              <p className="text-xl my-4">
                Votre score :{" "}
                <span className="font-bold text-sky-600">
                  {score} / {questions.length}
                </span>
              </p>
              <p className="text-gray-700">
                {score >= questions.length * 0.7
                  ? "Excellent travail ! Vos connaissances sont solides."
                  : "Continuez à réviser, vous êtes sur la bonne voie !"}
              </p>
              <p className="mt-6 font-semibold text-sky-700">
                💡 Revenez lundi prochain pour un nouveau quiz !
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="font-semibold text-sky-600">Quiz de la semaine</p>
                <p className="font-bold text-slate-700 mt-1">
                  Question {currentQuestionIndex + 1} sur {questions.length}
                </p>
                <h2 className="text-2xl font-bold text-slate-800 my-6">
                  {currentQuestion?.question}
                </h2>
              </div>

              <div className="space-y-4">
                {/* MODIFIÉ: Style des boutons de réponse */}
                {currentQuestion?.options.map((option, index) => {
                  const isCorrect = option === currentQuestion.correctAnswer;
                  let buttonClass =
                    "w-full text-center p-4 rounded-xl shadow-sm transition-all duration-300 font-medium text-slate-700 bg-white hover:bg-sky-100/50 hover:shadow-md disabled:cursor-not-allowed";

                  if (isAnswered && isCorrect) {
                    buttonClass =
                      "w-full text-center p-4 rounded-xl shadow-lg font-semibold text-white bg-green-500 ring-4 ring-green-200";
                  } else if (
                    isAnswered &&
                    selectedAnswer === option &&
                    !isCorrect
                  ) {
                    buttonClass =
                      "w-full text-center p-4 rounded-xl shadow-lg font-semibold text-white bg-red-500 ring-4 ring-red-200";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={buttonClass}
                      disabled={isAnswered}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="mt-8 text-center">
                  <p className="font-semibold">Explication :</p>
                  <p className="text-gray-700 mt-1">
                    {currentQuestion.explanation}
                  </p>
                  <button
                    onClick={handleNextQuestion}
                    className="w-full sm:w-auto mt-6 px-8 py-3 bg-sky-600 text-white font-bold rounded-full hover:bg-sky-700 transition-transform hover:scale-105"
                  >
                    {currentQuestionIndex === questions.length - 1
                      ? "Voir mon score"
                      : "Question suivante"}
                  </button>
                </div>
              )}
            </>
          )}
          {/* MODIFIÉ: Position et style de la barre de progression */}
          {!isQuizFinished && (
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-sky-200/50">
              <div
                className="bg-sky-500 h-1.5 rounded-r-full transition-all duration-500 ease-out"
                style={{
                  width: `${(currentQuestionIndex / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OhadaQuizzPage;
