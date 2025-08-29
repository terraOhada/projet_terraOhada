import React, { useState } from "react";
import PlansTable from "./PlansTable";
import EditPlanModal from "./EditPlanModal";

import { usePlans } from "../../query/payment";
import axios from "axios";
import { PLAN_URL } from "../../api/api";
import toast from "react-hot-toast";

// Définition du type pour un plan, basé sur votre exemple
export interface Plan {
  id: number;
  name: string;
  plan_token: string;
  status: "cancelled" | "active";
  currency: string;
  amount: number; // Montant en centimes
  duration: number;
  interval: "monthly" | "yearly" | "weekly" | "quarterly";
  created_at: string;
}

// Données d'exemple
// const initialPlans: Plan[] = [
//   {
//     id: 225460,
//     name: "Abonnement Mensuel Essentiel",
//     plan_token: "rpp_fa4e977159553b240b1f",
//     status: "active",
//     currency: "EUR",
//     amount: 900,
//     duration: 0,
//     interval: "monthly",
//     created_at: "2025-08-28T11:12:32.000Z",
//   },
//   {
//     id: 225461,
//     name: "Abonnement Annuel Premium",
//     plan_token: "rpp_fa4e977159553b240b2a",
//     status: "active",
//     currency: "EUR",
//     amount: 10000,
//     duration: 0,
//     interval: "annually",
//     created_at: "2025-08-27T10:05:12.000Z",
//   },
//   {
//     id: 225462,
//     name: "Ancien Plan Test",
//     plan_token: "rpp_fa4e977159553b240b3b",
//     status: "cancelled",
//     currency: "USD",
//     amount: 500,
//     duration: 0,
//     interval: "monthly",
//     created_at: "2025-07-15T09:41:55.000Z",
//   },
// ];

const PlansDashboard: React.FC = () => {
  const { data: plans, isLoading, isError, refetch } = usePlans();
  // const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const handleOpenEditModal = (plan: Plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = async (planId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce plan ?")) {
      // Ici, vous feriez un appel API pour supprimer le plan sur le serveur
      try {
        const response = await axios.delete(
          `${PLAN_URL}/supprimer-plan/${planId}`
        );
        if (response.data.status === "success") {
          toast.success("Suppression réussie 🟢");
          refetch();
        }
      } catch (error) {
        toast.error("Erreur de suppression 🛑");
        console.log(error);
      }
    }
  };

  const handleSaveChanges = async (updatedPayload: {
    name: string;
    amount: number;
    interval: "monthly" | "yearly";
  }) => {
    if (!editingPlan) return;

    try {
      const response = await axios.put(
        `${PLAN_URL}/modifier-plan/${editingPlan.id}`,
        {
          name: updatedPayload.name,
          amount: updatedPayload.amount,
          interval: updatedPayload.interval,
          status: "active",
        }
      );
      if (response.data.status === "success") {
        toast.success("Mise à jour réussie 🟢");
        refetch();

        handleCloseModal();
      }
    } catch (error) {
      toast.error("Erreur de modification 🛑");
      console.log(error);
    }

    // setPlans((currentPlans) =>
    //   currentPlans.map((p) =>
    //     p.id === editingPlan.id
    //       ? {
    //           ...p,
    //           name: updatedPayload.name,
    //           amount: updatedPayload.amount, // Le montant est déjà en centimes
    //           interval: updatedPayload.interval,
    //         }
    //       : p
    //   )
    // );
    // Ici, vous feriez un appel API pour mettre à jour le plan
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>Une erreur est survenue.</div>;
  }

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Gestion des Plans
      </h1>
      <PlansTable
        plans={plans}
        onEdit={handleOpenEditModal}
        onDelete={handleDeletePlan}
      />
      {editingPlan && (
        <EditPlanModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          plan={editingPlan}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default PlansDashboard;
