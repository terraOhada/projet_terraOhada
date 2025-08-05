import { plans } from "../../data/data";
import PlanCard from "./PlanCard";

// Dans ton composant de page
const PricingSection = () => {
  const handleSelectPlan = (
    planId: string,
    paymentType?: "monthly" | "yearly"
  ) => {
    // Logique de redirection vers Stripe ou autre
    console.log(`Plan ${planId} selected (${paymentType})`);
  };

  return (
    <section id="pricing" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Choisissez votre formule
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isPopular={plan.name === "Premium"} // Met en avant le plan Premium
            onSelect={handleSelectPlan}
          />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
