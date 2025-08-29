import { useUserPayments, type Payment } from "../../hooks/useUserPayments";
import { userStore } from "../../store/store";

// Petit composant pour afficher un badge de statut coloré
const StatusBadge = ({ status }: { status: Payment["status"] }) => {
  const styles = {
    successful: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    cancelled: "bg-yellow-100 text-yellow-800",
    pending: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
};

// Composant principal de l'historique
const PaymentHistory = () => {
  const { user } = userStore();
  const {
    data: payments,
    isLoading,
    isError,
    error,
  } = useUserPayments(user?.id as string);

  if (isLoading) {
    return (
      <div className="text-center p-10">Chargement de votre historique...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-red-500">
        Erreur: {error.message}
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold mb-2">Historique des paiements</h2>
        <p className="text-gray-500">
          Vous n'avez encore effectué aucun paiement.
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${(amount / 100).toLocaleString("fr-FR")} ${currency}`;
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Historique des paiements</h2>

      {/* Conteneur pour le défilement sur mobile */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID Transaction
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {formatDate(payment.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {payment.plan?.name || "Paiement unique"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                  {formatAmount(payment.amount, payment.currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StatusBadge status={payment.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.transactionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
