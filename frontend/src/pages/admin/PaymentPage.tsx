// import React from "react";
import PlansDashboard from "../../components/ui/PlansDashboard";
import SubscriptionForm from "../../components/ui/SubscriptionForm";

const PaymentPage = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="">
        <SubscriptionForm />
        <PlansDashboard />
      </div>
    </div>
  );
};

export default PaymentPage;
