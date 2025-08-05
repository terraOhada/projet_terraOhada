// import React from "react";
import { AllProfilesSkeleton } from "./AllProfilesSkeleton";
import { FeaturedProfilesSkeleton } from "./FeaturedProfilesSkeleton";

const VedetteSkeleton = () => {
  return (
    <div>
      <FeaturedProfilesSkeleton />
      <AllProfilesSkeleton />
    </div>
  );
};

export default VedetteSkeleton;
