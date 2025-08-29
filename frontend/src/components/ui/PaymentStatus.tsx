// import React from "react";
import { Link } from "react-router-dom";
import { useSubscriptionStatus } from "../../hooks/useSubscriptionStatus";
import { userStore } from "../../store/store";
import ManageSubscription from "./ManageSubscription";

const PaymentStatus = () => {
  const { user } = userStore();

  // On appelle le hook avec l'ID de l'utilisateur.
  // On s'assure que userId n'est pas undefined avant de le passer.
  const {
    data: subscription,
    isLoading,
    isError,
  } = useSubscriptionStatus(user?.id as string);

  const renderStatus = () => {
    if (isLoading) {
      return <p className="text-gray-500">Vérification du statut...</p>;
    }

    if (isError) {
      return (
        <p className="text-red-500">
          Impossible de charger le statut de l'abonnement.
        </p>
      );
    }

    if (subscription?.isActive) {
      return (
        <div className="p-4 bg-green-100 text-green-800 rounded-md">
          <p className="font-bold">Abonnement Actif ✅</p>
          <span className="text-sm">Plan: {subscription.plan?.name}</span>
          <ManageSubscription
            currentPlan={subscription.plan?.name as string}
            userId={user?.id as string}
          />
        </div>
      );
    } else {
      return (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md">
          <p className="font-bold">Aucun abonnement actif.</p>
          <button className="mt-4 px-4 py-2 bg-ohada-blue-one text-white font-semibold rounded-md hover:bg-ohada-blue-two disabled:bg-gray-400">
            <Link to={"/annuaire"}>M'abonner</Link>
          </button>
        </div>
      );
    }
  };

  return (
    <div className="mb-6 bg-white p-2 rounded-lg">
      <div className="">
        <h3 className="text-lg font-semibold">Statut de l'abonnement</h3>
        {renderStatus()}
      </div>
    </div>
  );
};

export default PaymentStatus;
