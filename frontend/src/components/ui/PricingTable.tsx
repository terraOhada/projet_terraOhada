import React, { useState } from "react";
import { plans } from "../../data/data";
import type { PaidPlan } from "../../types";
import { userStore } from "../../store/store";
import axios from "axios";
import { PLAN_URL } from "../../api/api";

// 1. On crée une liste de toutes les fonctionnalités à comparer.
// C'est ce qui va générer les lignes du tableau.
const featureComparisonList = [
  "Fiche profil simplifiée",
  "Affichage du nom et du pays d’exercice",
  "Mention du métier et de la spécialité",
  "Photo de profil professionnelle",
  "Bio détaillée avec vos expériences",
  "Coordonnées complètes et contacts visibles",
  "Liens vers vos réseaux sociaux",
  "Mise en avant prioritaire dans les recherches",
  "Badge Premium affiché sur votre profil",
  "Possibilité de publier sur la plateforme",
  "Accès prioritaire à des offres exclusives",
];

// Le composant helper reste le même, mais on l'améliore un peu
const renderCell = (content: boolean | string) => {
  if (typeof content === "boolean") {
    return content ? (
      <span className="text-green-500 font-bold text-lg">✔</span>
    ) : (
      <span className="text-gray-400 font-bold text-lg">✖</span>
    );
  }
  return <span className="text-sm text-gray-700">{content}</span>;
};

const PricingTable = () => {
  const { user } = userStore();
  const [isYearly, setIsYearly] = useState(false);
  const interval = isYearly ? "yearly" : "monthly";

  // 2. On filtre les plans pour obtenir les bonnes données
  const freePlan = plans.find((p) => p.type === "free")!;
  const premiumXOF = plans.find(
    (p) => p.type === "paid" && p.currency === "XOF" && p.interval === interval
  ) as PaidPlan;
  const premiumEUR = plans.find(
    (p) => p.type === "paid" && p.currency === "EUR" && p.interval === interval
  ) as PaidPlan;

  // Fonction pour gérer la sélection du plan
  const handleSelectPlan = async (flutterwaveId: number) => {
    console.log(`ID du plan Flutterwave sélectionné : ${flutterwaveId}`);
    if (!user?.isAccountVerified) {
      return;
    }
    // Ici, vous appelez votre backend pour initier le paiement
    try {
      const userInfo = {
        email: user.email,
        name: user.nom + " " + user.prenom,
        plan_id: flutterwaveId,
      };

      const response = await axios.post(
        `${PLAN_URL}/payments/subscribe`,
        userInfo
      );

      // Redirige l'utilisateur vers la page de paiement de Flutterwave
      if (response.data.link) {
        window.location.href = response.data.link;
      }
    } catch (error) {
      console.error("Erreur lors de la création du lien de paiement", error);
      alert("Impossible de procéder au paiement.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Tarifs Terraohada – Choisissez votre plan
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Rejoignez une communauté de professionnels vérifiés.
        </p>
      </div>

      {/* 3. Ajout de l'interrupteur Mensuel/Annuel */}
      <div className="flex justify-center items-center space-x-4 mb-10">
        <span
          className={`${
            !isYearly ? "font-bold text-blue-600" : "text-gray-500"
          }`}
        >
          Mensuel
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
        <span
          className={`${
            isYearly ? "font-bold text-blue-600" : "text-gray-500"
          }`}
        >
          Annuel{" "}
          <span className="text-green-500 text-sm font-normal">
            (Économisez !)
          </span>
        </span>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <div className="min-w-[800px] md:min-w-full">
          {/* 4. En-tête du tableau maintenant dynamique */}
          <div className="grid grid-cols-4 gap-0">
            <div className="col-span-1 p-4 bg-gray-50 font-medium rounded-tl-lg"></div>
            <div className="p-4 bg-gray-100 font-medium text-center">
              <h3 className="font-bold text-lg">Basique</h3>
              <p className="text-sm font-bold">Gratuit</p>
            </div>
            <div className="p-4 bg-blue-50 font-medium text-center">
              <h3 className="font-bold text-lg">Premium Afrique</h3>
              {premiumXOF && (
                <p className="text-sm">
                  {(premiumXOF.amount / 100).toLocaleString("fr-FR")}{" "}
                  {premiumXOF.currency}/{isYearly ? "an" : "mois"}
                </p>
              )}
            </div>
            <div className="p-4 bg-indigo-50 font-medium text-center rounded-tr-lg">
              <h3 className="font-bold text-lg">Premium Europe</h3>
              {premiumEUR && (
                <p className="text-sm">
                  {(premiumEUR.amount / 100).toLocaleString("fr-FR")}{" "}
                  {premiumEUR.currency}/{isYearly ? "an" : "mois"}
                </p>
              )}
            </div>
          </div>

          {/* 5. Lignes du tableau générées dynamiquement */}
          {featureComparisonList.map((feature, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-0 border-t border-gray-200"
            >
              <div className="col-span-1 p-4 bg-gray-50 font-medium text-sm text-gray-800">
                {feature}
              </div>
              <div className="p-4 bg-white text-center flex justify-center items-center">
                {renderCell(freePlan.features.includes(feature))}
              </div>
              <div className="p-4 bg-white text-center flex justify-center items-center">
                {renderCell(premiumXOF.features.includes(feature))}
              </div>
              <div className="p-4 bg-white text-center flex justify-center items-center">
                {renderCell(premiumEUR.features.includes(feature))}
              </div>
            </div>
          ))}

          {/* 6. Boutons d'action maintenant connectés */}
          <div className="grid grid-cols-4 gap-0 border-t border-gray-200">
            <div className="col-span-1 p-4 bg-gray-50 rounded-bl-lg"></div>
            <div className="p-4 bg-white text-center flex justify-center items-center">
              <button
                disabled
                className="px-6 py-2 bg-gray-200 text-gray-500 rounded-lg font-medium cursor-not-allowed"
              >
                Votre plan
              </button>
            </div>
            <div className="p-4 bg-white text-center flex justify-center items-center">
              <button
                onClick={() => handleSelectPlan(premiumXOF.flutterwaveId)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                S'abonner
              </button>
            </div>
            <div className="p-4 bg-white text-center flex justify-center items-center rounded-br-lg">
              <button
                onClick={() => handleSelectPlan(premiumEUR.flutterwaveId)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;

// // ... (dans le composant)
// const handleSubscribe = async (plan: Plan) => {
//   try {
//     // Infos de l'utilisateur (à récupérer depuis votre système d'authentification)
//     const userInfo = {
//       email: 'customer@example.com',
//       name: 'John Doe',
//       plan_id: plan.id,
//     };

//     const response = await axios.post('/api/payments/subscribe', userInfo);

//     // Redirige l'utilisateur vers la page de paiement de Flutterwave
//     if (response.data.link) {
//       window.location.href = response.data.link;
//     }
//   } catch (error) {
//     console.error("Erreur lors de la création du lien de paiement", error);
//     alert("Impossible de procéder au paiement.");
//   }
// };

// // ... (dans le JSX de la table, à l'intérieur du .map)
// <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//   <button
//     onClick={() => handleSubscribe(plan)}
//     className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
//     S'abonner
//   </button>
// </td>
