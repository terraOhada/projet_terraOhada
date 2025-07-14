/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { USERS_URL } from "../../api/api";
import { userStore } from "../../store/store";
import EditUserModal from "../../components/adminComponents/EditUserModal";
import type { IUser } from "../../types";
import toast from "react-hot-toast";

const UserPage = () => {
  const { user } = userStore(); // Assuming userStore is defined and imported correctly
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const usersPerPage = 5;

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleRoleChange = async (userId: string, newRole: IUser["role"]) => {
    if (!user || !user.id) {
      setError("Utilisateur non authentifié");
      return;
    }
    try {
      const response = await axios.put(`${USERS_URL}/changer-role/${user.id}`, {
        newRole,
        userId,
      });
      if (response.data.success) {
        toast.success("Rôle mis à jour avec succès");
        handleUsers();
      } else {
        toast.error(
          response.data.message || "Désolé, vous n'êtes pas autorisé"
        );
        setError(response.data.message || "Désolé, vous n'êtes pas autorisé");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la mise à jour du rôle"
      );
      // console.error("Erreur lors de la mise à jour du rôle:", error);
      setError(
        error.response?.data?.message || "Erreur lors de la mise à jour du rôle"
      );
    }
  };

  const handleDelete = (userId: string) => {
    if (!user || !user.id) {
      setError("Utilisateur non authentifié");
      return;
    }
    setUsers(users.filter((user) => user.id !== userId));
    // Si on supprime tous les users de la page actuelle, on revient à la page précédente
    if (currentUsers.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSave = (updatedUser: IUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleUsers = async () => {
    if (!user || !user.id) {
      setError("Utilisateur non authentifié");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${USERS_URL}/tous-utilisateurs/${user?.id}`
      );
      console.log(response);
      if (response.data.success) {
        setLoading(false);
        setError(null);
        setUsers(response.data.data);
        // console.log("objects", response.data.data);
      }
    } catch (error: any) {
      setLoading(false);
      setError(
        error.response.data.message ||
          "Erreur lors de la récupération des utilisateurs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Liste des utilisateurs</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prénom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Chargement...
                </td>
              </tr>
            </tbody>
          ) : error ? (
            <tbody>
              <tr>
                <td colSpan={7} className="text-center text-red-500 py-4">
                  {error}
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="divide-y divide-gray-200">
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={
                          user.photo ? user.photo : "https://i.pravatar.cc/150"
                        }
                        alt={`${user.prenom} ${user.nom}`}
                        className="h-10 w-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.nom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.prenom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user.id as string,
                            e.target.value as IUser["role"]
                          )
                        }
                        className="border border-gray-300 rounded-md shadow-sm p-1 text-sm"
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-sm text-gray-700">
            Affichage de{" "}
            <span className="font-medium">{indexOfFirstUser + 1}</span> à{" "}
            <span className="font-medium">
              {Math.min(indexOfLastUser, users.length)}
            </span>{" "}
            sur <span className="font-medium">{users.length}</span> utilisateurs
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md ${
              currentPage === 1
                ? "bg-gray-100 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
          >
            Précédent
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-md ${
              currentPage === totalPages
                ? "bg-gray-100 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
          >
            Suivant
          </button>
        </div>
      </div>

      {/* Modal d'édition */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserPage;
