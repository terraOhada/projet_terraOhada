import React, { useState } from "react";

import PlanCard from "./PlanCard";
import { plans } from "../../data/data";
import type { PaidPlan, QuotePlan } from "../../types";

const PricingSection = () => {
  // 1. Ajout des états pour gérer les choix de l'utilisateur
  const [isYearly, setIsYearly] = useState(false);
  const [currency, setCurrency] = useState<"XOF" | "EUR">("XOF");

  // 2. Logique pour sélectionner le bon ID de plan à envoyer
  const handleSelectPlan = async (flutterwaveId: number) => {
    console.log(`ID du plan Flutterwave sélectionné : ${flutterwaveId}`);
    // C'est ici que vous appelez votre backend pour initier le paiement
    // Exemple :
    // await axios.post('/api/payments/subscribe', { plan_id: flutterwaveId, ... });
  };

  // 3. Filtrage des données avant de les afficher
  const interval = isYearly ? "yearly" : "monthly";

  // On trouve chaque plan conceptuel à afficher
  const freePlan = plans.find((p) => p.type === "free")!;
  // const quotePlan = plans.find(p => p.type === 'paid')!;

  // On trouve les deux versions du plan premium pour l'intervalle choisi
  const primaryPremiumPlan = plans.find(
    (p) =>
      p.type === "paid" && p.interval === interval && p.currency === currency
  ) as PaidPlan;

  const alternatePremiumPlan = plans.find(
    (p) =>
      p.type === "paid" && p.interval === interval && p.currency !== currency
  ) as PaidPlan;

  const quotePlan = plans.find((p) => p.type === "quote") as QuotePlan;

  return (
    <section id="pricing" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Choisissez votre formule
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Passez au Premium pour débloquer tout votre potentiel.
      </p>

      {/* 4. Ajout des interrupteurs pour contrôler l'état */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
        {/* Toggle Mensuel/Annuel */}
        <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-lg">
          <span
            className={`${
              !isYearly ? "font-bold text-blue-600" : "text-gray-600"
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
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span
            className={`${
              isYearly ? "font-bold text-blue-600" : "text-gray-600"
            }`}
          >
            Annuel
          </span>
        </div>

        {/* Sélecteur de Devise */}
        <div className="flex items-center space-x-1 rounded-lg bg-gray-200 p-1">
          <button
            onClick={() => setCurrency("XOF")}
            className={`px-4 py-1 text-sm rounded-md transition-all ${
              currency === "XOF"
                ? "bg-white shadow font-semibold"
                : "bg-transparent text-gray-600"
            }`}
          >
            XOF
          </button>
          <button
            onClick={() => setCurrency("EUR")}
            className={`px-4 py-1 text-sm rounded-md transition-all ${
              currency === "EUR"
                ? "bg-white shadow font-semibold"
                : "bg-transparent text-gray-600"
            }`}
          >
            EUR
          </button>
        </div>
      </div>

      {/* 5. Affichage contrôlé des cartes au lieu d'un .map() */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {freePlan && (
          <PlanCard
            plan={freePlan}
            onSelect={() => console.log("Plan gratuit sélectionné")}
          />
        )}

        {primaryPremiumPlan && (
          <PlanCard
            plan={primaryPremiumPlan}
            alternatePlan={alternatePremiumPlan}
            isPopular={true}
            onSelect={handleSelectPlan}
          />
        )}

        {quotePlan && (
          <PlanCard
            plan={quotePlan}
            onSelect={() => {
              /* la redirection est gérée dans PlanCard */
            }}
          />
        )}
      </div>
    </section>
  );
};

export default PricingSection;
