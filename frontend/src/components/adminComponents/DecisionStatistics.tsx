import { useEffect, useState } from "react";
import type { Decision } from "../../pages/admin/DecisionDashboard";

// --- Decision Statistics Component ---
const DecisionStatistics: React.FC = () => {
  // Mock data for demonstration. In a real app, fetch from backend.
  const [mostCommentedDecisions, setMostCommentedDecisions] = useState<
    Decision[]
  >([
    {
      id: "1",
      idInterne: "DEC-001",
      titreDecision: "Décision A",
      juridiction: "CCJA",
      date: "2023-01-15",
      pays: "CI",
      matiere: "Commercial",
      commentsCount: 45,
    },
    {
      id: "2",
      idInterne: "DEC-002",
      titreDecision: "Décision B",
      juridiction: "CCJA",
      date: "2023-02-20",
      pays: "SN",
      matiere: "Pénal",
      commentsCount: 30,
    },
    {
      id: "3",
      idInterne: "DEC-003",
      titreDecision: "Décision C",
      juridiction: "CCJA",
      date: "2023-03-10",
      pays: "ML",
      matiere: "Civil",
      commentsCount: 25,
    },
    {
      id: "4",
      idInterne: "DEC-004",
      titreDecision: "Décision D",
      juridiction: "CCJA",
      date: "2023-04-05",
      pays: "BF",
      matiere: "Travail",
      commentsCount: 18,
    },
  ] as Decision[]); // Type assertion to include commentsCount

  useEffect(() => {
    // In a real application, you would fetch this data from your backend:
    // fetch(`${API_BASE_URL}/statistics/most-commented`)
    //   .then(res => res.json())
    //   .then(data => setMostCommentedDecisions(data))
    //   .catch(err => toast.error("Erreur lors du chargement des statistiques."));
  }, []);

  const totalComments = mostCommentedDecisions.reduce(
    (sum, d) => sum + (d.commentsCount || 0),
    0
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-ohada-blue-one mb-6 text-center">
        Statistiques des décisions
      </h3>
      <p className="text-lg text-gray-700 mb-4 text-center">
        Décisions les plus commentées (Données fictives)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mostCommentedDecisions.map((decision) => (
          <div
            key={decision.id}
            className="bg-blue-50 p-4 rounded-md shadow-sm border border-blue-200"
          >
            <h4 className="text-lg font-semibold text-blue-800">
              {decision.titreDecision}
            </h4>
            <p className="text-sm text-gray-700">
              Commentaires:{" "}
              <span className="font-bold">{decision.commentsCount}</span>
            </p>
            {totalComments > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${
                      ((decision.commentsCount || 0) / totalComments) * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-md text-gray-600">
          Ces statistiques sont basées sur le nombre de commentaires associés à
          chaque décision.
        </p>
      </div>
    </div>
  );
};

export default DecisionStatistics;
