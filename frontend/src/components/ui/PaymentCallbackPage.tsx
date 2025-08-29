// import React from 'react';
import { Link, useSearchParams } from "react-router-dom"; // si vous utilisez react-router
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PLAN_URL } from "../../api/api";

// Fonction pour appeler votre API de vérification
const verifyTransaction = async (transactionId: string) => {
  const response = await axios.get(
    `${PLAN_URL}/payments/verify?transaction_id=${transactionId}`
  );
  return response.data;
};

const PaymentCallbackPage = () => {
  // Récupère les paramètres de l'URL (ex: ?status=successful&transaction_id=12345)
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transaction_id");
  const status = searchParams.get("status");

  // console.log("status", status);

  // Utilise react-query pour appeler l'API de vérification
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["paymentVerification", transactionId],
    queryFn: () => verifyTransaction(transactionId!),
    // On n'active la requête que si transactionId est présent
    enabled: !!transactionId,
  });

  if (!transactionId || status === "cancelled") {
    return (
      <div>
        <h1>Paiement annulé</h1>
        <p>Vous avez annulé le processus de paiement.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Vérification de votre paiement...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Échec de la vérification</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  // console.log(data);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {data?.status === "success" ? (
        <div className="flex flex-col items-center justify-center">
          <h1>✅ Paiement réussi !</h1>
          <Link to={"/"}>Aller à l'accueil</Link>
          <p className="text-center">
            Votre abonnement est en cours de traitement. Vous pouvez fermer
            cette page.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1>❌ Échec du paiement.</h1>
          <p className="text-center">
            Votre abonnement est en cours de traitement. Vous pouvez fermer
            cette page.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentCallbackPage;
