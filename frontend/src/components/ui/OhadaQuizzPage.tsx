/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/ohada-quizz/page.tsx
"use client"; // Ajout de la directive pour les composants client Next.js

import { useState, useEffect } from "react";
import Papa from "papaparse";
import { userStore } from "../../store/store";
import { Link } from "react-router-dom";
// Import du store Zustand

// --- INTERFACES ET TYPES ---
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface UserAttempt {
  lastAttemptDate: number;
  lastScore: number;
}

// --- COMPOSANTS D'ICÔNES ---
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

const SocialShareButtons = ({
  score,
  totalQuestions,
}: {
  score: number;
  totalQuestions: number;
}) => {
  const shareText = `J'ai obtenu un score de ${score}/${totalQuestions} au OHADA Quizz ! Testez vos connaissances vous aussi !`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=Mon%20Score%20OHADA%20Quizz&summary=${encodedText}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;

  const handleInstagramShare = () => {
    navigator.clipboard.writeText(`${shareText} #OHADA #Droit #Quizz`);
    alert(
      "Le texte a été copié ! Collez-le dans votre story ou publication Instagram."
    );
  };

  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      <p className="font-semibold text-slate-700">Partager mon score :</p>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-sky-700 text-white rounded-full hover:bg-sky-800 transition-transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.98v16h4.98v-8.396c0-2.002 1.806-2.002 1.806 0v8.396h4.98v-10.396c0-5.522-4.166-5.223-4.982-2.457v-3.147z" />
        </svg>
      </a>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Partager sur X (Twitter)"
        className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
        </svg>
      </a>
      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Partager sur WhatsApp"
        className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.003 2.011.564 3.963 1.632 5.686l.215.324-1.113 4.054 4.135-1.087.316.188z" />
        </svg>
      </a>
      <button
        onClick={handleInstagramShare}
        className="p-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full hover:opacity-90 transition-transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
        </svg>
      </button>
    </div>
  );
};

const OhadaQuizzPage = () => {
  // --- ÉTAT GLOBAL ZUSTAND ---
  const { user } = userStore();

  // --- ÉTATS LOCAUX DU COMPOSANT ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // États pour la gestion de la tentative de l'utilisateur
  const [userAttempt, setUserAttempt] = useState<UserAttempt | null>(null);
  const [isInCooldown, setIsInCooldown] = useState(false);

  const GOOGLE_SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSdVfKYMfcjKXhtbM1cNjPkX7Js5568IqyQWaaWNamSxj4ksM4CMf4jt_pg36yf6Q/pub?gid=1932095547&single=true&output=csv";

  // --- EFFETS DE BORD (useEffect) ---

  // Effet pour vérifier la dernière tentative de l'utilisateur connecté
  useEffect(() => {
    const checkUserAttempt = () => {
      if (user) {
        const storedData = localStorage.getItem(`ohadaQuizzUser_${user.id}`);
        if (storedData) {
          const parsedData: UserAttempt = JSON.parse(storedData);
          setUserAttempt(parsedData);

          const now = new Date().getTime();
          const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;

          if (now - parsedData.lastAttemptDate < twoDaysInMillis) {
            setIsInCooldown(true);
          } else {
            setIsInCooldown(false); // Reset cooldown if time has passed
          }
        }
      } else {
        // Si l'utilisateur se déconnecte, on réinitialise les états
        setUserAttempt(null);
        setIsInCooldown(false);
      }
    };

    checkUserAttempt();
  }, [user]); // Se déclenche quand l'objet user change

  // Effet pour charger les questions du quiz (une seule fois)
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
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
              .filter((q) => q.question);

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

  // Effet pour sauvegarder le score à la fin du quiz pour l'utilisateur connecté
  useEffect(() => {
    if (
      user &&
      currentQuestionIndex >= questions.length &&
      questions.length > 0
    ) {
      const attemptData: UserAttempt = {
        lastAttemptDate: new Date().getTime(),
        lastScore: score,
      };
      localStorage.setItem(
        `ohadaQuizzUser_${user.id}`,
        JSON.stringify(attemptData)
      );
      setUserAttempt(attemptData);
      setIsInCooldown(true);
    }
  }, [currentQuestionIndex, questions.length, score, user]);

  // --- GESTIONNAIRES D'ÉVÉNEMENTS ---

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

  // --- RENDU CONDITIONNEL ---

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement du quiz...
      </div>
    );
  }

  // 1. Si l'utilisateur n'est pas connecté (user est null)
  if (!user) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-bold text-sky-700 mb-4">
          Bienvenue au OHADA Quizz !
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-md">
          Pour participer et enregistrer votre progression, veuillez vous
          connecter.
        </p>
        {/* Le bouton de connexion est maintenant géré globalement (ex: dans le header) */}
        <Link to={"/connexion"}>Se connecter</Link>
      </div>
    );
  }

  // 2. Si l'utilisateur est connecté mais en période de cooldown
  if (isInCooldown && userAttempt) {
    const nextAttemptDate = new Date(
      userAttempt.lastAttemptDate + 2 * 24 * 60 * 60 * 1000
    );
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center text-center p-8">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md">
          <h2 className="text-2xl font-bold text-slate-800">
            Vous avez déjà participé !
          </h2>
          <p className="text-xl my-4">
            Votre dernier score était :{" "}
            <span className="font-bold text-sky-600">
              {userAttempt.lastScore} / {questions.length}
            </span>
          </p>
          <p className="text-gray-700">
            Merci pour votre participation. Pour laisser la chance à tout le
            monde, vous ne pouvez jouer qu'une fois toutes les 48 heures.
          </p>
          <p className="mt-6 font-semibold text-sky-700">
            💡 Prochain essai possible le : <br />{" "}
            {nextAttemptDate.toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            à {nextAttemptDate.toLocaleTimeString("fr-FR")}
          </p>
          <SocialShareButtons
            score={userAttempt.lastScore}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    );
  }

  // --- RENDU PRINCIPAL DU QUIZ ---

  const currentQuestion = questions[currentQuestionIndex];
  const isQuizFinished = currentQuestionIndex >= questions.length;

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-700 flex items-center justify-center">
            <TargetIcon />
            OHADA Quizz
          </h1>
          <h2 className="mt-2 text-lg text-sky-600">
            Testez vos connaissances chaque semaine !
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Pensé pour les étudiants, jeunes professionnels et passionnés de
            droit OHADA, l'OHADA Quizz vous permet de réviser vos acquis, de
            vous challenger et de progresser de manière ludique. Chaque semaine,
            découvrez un nouveau quiz pour mettre vos connaissances à l’épreuve
            – et c’est entièrement gratuit !
          </p>
        </div>

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
                💡 Vous pourrez rejouer dans 48 heures. Revenez nous voir !
              </p>
              <SocialShareButtons
                score={score}
                totalQuestions={questions.length}
              />
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
