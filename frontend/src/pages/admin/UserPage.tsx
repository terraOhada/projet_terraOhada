/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { USERS_URL } from "../../api/api";
import { userStore } from "../../store/store";
import EditUserModal from "../../components/adminComponents/EditUserModal";
import type { IUser } from "../../types";
import toast from "react-hot-toast";
import { useState } from "react";

const UserPage = () => {
  const { user: currentUser } = userStore();
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Fetch users
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery<IUser[], Error>({
    queryKey: ["users", currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) throw new Error("Utilisateur non authentifié");
      const response = await axios.get(
        `${USERS_URL}/tous-utilisateurs/${currentUser.id}`
      );
      if (!response.data.success)
        throw new Error(response.data.message || "Erreur de chargement");
      return response.data.data;
    },
    enabled: !!currentUser?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Update role mutation
  const { mutate: updateRole } = useMutation({
    mutationFn: async ({
      userId,
      newRole,
    }: {
      userId: string;
      newRole: IUser["role"];
    }) => {
      if (!currentUser?.id) throw new Error("Utilisateur non authentifié");
      const response = await axios.put(
        `${USERS_URL}/changer-role/${currentUser.id}`,
        {
          newRole,
          userId,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Rôle mis à jour avec succès");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erreur lors de la mise à jour du rôle"
      );
    },
  });

  // Delete user mutation
  const { mutate: deleteUser } = useMutation({
    mutationFn: async (userId: string) => {
      if (!currentUser?.id) throw new Error("Utilisateur non authentifié");
      const response = await axios.delete(
        `${USERS_URL}/changer-role/${currentUser.id}`,
        {
          data: { userId },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Utilisateur supprimé avec succès");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erreur lors de la suppression"
      );
    },
  });

  // Handle save after edit
  const handleSave = (updatedUser: IUser) => {
    queryClient.setQueryData<IUser[]>(["users"], (oldUsers = []) =>
      oldUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

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
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Chargement...
                </td>
              </tr>
            </tbody>
          ) : isError ? (
            <tbody>
              <tr>
                <td colSpan={7} className="text-center text-red-500 py-4">
                  {error?.message}
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
                        src={user.photo || "https://i.pravatar.cc/150"}
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
                          updateRole({
                            userId: user.id as string,
                            newRole: e.target.value as IUser["role"],
                          })
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
                        onClick={() => deleteUser(user.id as string)}
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
