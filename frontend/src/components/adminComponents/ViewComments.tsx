import { useEffect, useState } from "react";
import type { Comment } from "../../pages/admin/DecisionDashboard";
import toast from "react-hot-toast";

// --- View Comments Component ---
const ViewComments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real application, fetch comments from your backend
        // Example: const response = await fetch(`${API_BASE_URL}/comments`);
        // For now, using mock data
        const mockComments: Comment[] = [
          {
            id: "c1",
            decisionId: "TOCCJA-CI-20151019-01",
            author: "Jean Dupont",
            content: "Très bonne analyse de la procédure.",
            createdAt: "2024-07-01T10:00:00Z",
          },
          {
            id: "c2",
            decisionId: "TOCCJA-CI-20151019-01",
            author: "Marie Curie",
            content: "Intéressant point sur la jurisprudence.",
            createdAt: "2024-07-01T11:30:00Z",
          },
          {
            id: "c3",
            decisionId: "TOCCJA-RG-20151023-01",
            author: "Pierre Martin",
            content: "Le désistement est clair ici.",
            createdAt: "2024-07-02T09:00:00Z",
          },
          {
            id: "c4",
            decisionId: "TOCCJA-CI-20150121-01",
            author: "Sophie Dubois",
            content: "Nécessite plus de détails sur le contexte.",
            createdAt: "2024-07-02T14:00:00Z",
          },
        ];
        setComments(mockComments);
      } catch (err) {
        console.error("Erreur lors du chargement des commentaires:", err);
        setError("Impossible de charger les commentaires. Veuillez réessayer.");
        toast.error("Erreur lors du chargement des commentaires.");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-ohada-blue-one mb-6 text-center">
        Commentaires sur les décisions
      </h3>
      {loading && (
        <p className="text-center text-gray-600">
          Chargement des commentaires...
        </p>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && comments.length === 0 && !error && (
        <p className="text-center text-gray-600">
          Aucun commentaire à afficher pour le moment.
        </p>
      )}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200"
          >
            <p className="text-sm font-semibold text-gray-800">
              {comment.author} sur Décision ID: {comment.decisionId}
            </p>
            <p className="text-gray-700 mt-1">{comment.content}</p>
            <p className="text-xs text-gray-500 mt-2">
              Posté le: {new Date(comment.createdAt).toLocaleDateString()} à{" "}
              {new Date(comment.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ViewComments;
