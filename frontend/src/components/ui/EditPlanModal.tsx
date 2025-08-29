import React, { useState, useEffect } from "react";
import type { Plan } from "./PlansDashboard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
  onSave: (payload: {
    name: string;
    amount: number;
    interval: "monthly" | "yearly";
  }) => void;
}

const EditPlanModal: React.FC<Props> = ({ isOpen, onClose, plan, onSave }) => {
  const [name, setName] = useState(plan.name);
  // On divise par 100 pour l'affichage, on remultipliera à la sauvegarde
  const [amount, setAmount] = useState(plan.amount / 100);
  const [interval, setInterval] = useState<"monthly" | "yearly">(
    plan.interval as "monthly" | "yearly"
  );

  // Met à jour l'état si le plan change (important)
  useEffect(() => {
    setName(plan.name);
    setAmount(plan.amount / 100);
    setInterval(plan.interval as "monthly" | "yearly");
  }, [plan]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      amount: amount * 100, // On reconvertit en centimes pour le payload
      interval,
    });
  };

  return (
    <div className="fixed inset-0 bg-ohada-blue-one/40 bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Modifier le plan #{plan.id}
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nom du plan
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Montant ({plan.currency})
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="interval"
                className="block text-sm font-medium text-gray-700"
              >
                Intervalle
              </label>
              <select
                id="interval"
                value={interval}
                onChange={(e) =>
                  setInterval(e.target.value as "monthly" | "yearly")
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlanModal;
