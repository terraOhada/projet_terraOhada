import { useState, useEffect } from "react";

type Question = {
  id: number;
  text: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
};

const QuizOHADA = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Simuler le chargement des questions depuis une API ou Google Sheets
  useEffect(() => {
    // En pratique, vous feriez un fetch vers votre backend ou Google Sheets API
    const mockQuestions: Question[] = [
      {
        id: 1,
        text: "Quel Acte uniforme régit les sociétés commerciales ?",
        answers: [
          "Acte uniforme sur les sociétés commerciales",
          "Acte uniforme sur le droit des affaires",
          "Acte uniforme relatif au droit des GIE",
          "Acte uniforme sur les sûretés",
        ],
        correctAnswer: 0,
        explanation:
          "L'Acte uniforme sur les sociétés commerciales et le GIE (AUSCGIE) est l'instrument qui régit cette matière dans l'espace OHADA.",
      },
      // Ajoutez 4 autres questions ici...
    ];
    setQuestions(mockQuestions.slice(0, 5)); // Prendre les 5 premières
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return; // Empêcher de changer de réponse après validation

    setSelectedAnswer(answerIndex);

    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setShowExplanation(true);

    // Passer à la question suivante après un délai
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
      }
    }, 3000);
  };

  const shareScore = () => {
    const shareText = `J'ai obtenu ${score}/5 au Quiz OHADA du jour ! Testez vos connaissances aussi : [lien]`;
    // Implémentation réelle utiliserait les API de partage
    console.log("Partage :", shareText);
    alert(shareText);
  };

  if (questions.length === 0)
    return <div className="text-center py-8">Chargement du quiz...</div>;
  if (quizCompleted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">{score}/5</h2>
          <p className="text-2xl mb-6">
            {score >= 3 ? "🎉 Bien joué !" : "📚 À perfectionner !"}
          </p>

          <div className="mb-8">
            <h3 className="font-bold mb-2">Récapitulatif :</h3>
            {questions.map((q, i) => (
              <div key={i} className="mb-2 text-left p-2 bg-gray-50 rounded">
                <p>
                  <span className="font-medium">Q{i + 1}:</span> {q.text}
                </p>
                <p className="text-sm">→ {q.answers[q.correctAnswer]}</p>
              </div>
            ))}
          </div>

          <button
            onClick={shareScore}
            className="bg-blue-500 text-white px-6 py-2 rounded-full mb-4 hover:bg-blue-600"
          >
            Partager mon score
          </button>

          <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
            📚 Accédez aux quiz thématiques Premium
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">🎯 Quiz OHADA du jour</h1>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {currentQuestionIndex + 1}/{questions.length}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Question */}
      <h2 className="text-lg font-medium mb-6">
        Question {currentQuestionIndex + 1}/5
      </h2>
      <p className="text-xl mb-8">{currentQuestion.text}</p>

      {/* Réponses */}
      <div className="space-y-3 mb-8">
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showExplanation}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all
              ${
                selectedAnswer === index
                  ? index === currentQuestion.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-blue-300"
              }
              ${
                showExplanation && index === currentQuestion.correctAnswer
                  ? "border-green-500 bg-green-50"
                  : ""
              }
            `}
          >
            {answer}
          </button>
        ))}
      </div>

      {/* Explication */}
      {showExplanation && (
        <div className="p-4 bg-blue-50 rounded-lg mb-6">
          <p className="font-medium mb-2">Explication :</p>
          <p>{currentQuestion.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizOHADA;
