// import React from 'react'

import PaymentHistory from "../../components/ui/PaymentHistory";
import PaymentStatus from "../../components/ui/PaymentStatus";

const AbonnementProfile = () => {
  return (
    <div className="bg-gray-50 w-full min-h-screen p-6 rounded-lg">
      <PaymentStatus />
      <PaymentHistory />
    </div>
  );
};

export default AbonnementProfile;
