import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DecisionSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border-t-3 border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5">
        {/* En-tête avec ID et Pays */}
        <div className="flex justify-between items-start">
          <Skeleton width={120} height={20} className="mb-1" />
          <Skeleton width={50} height={20} />
        </div>

        {/* Métadonnées */}
        <div className="mt-4 space-y-2">
          <Skeleton width="80%" height={16} />
          <Skeleton width="70%" height={16} />
          <Skeleton width="75%" height={16} />
        </div>

        {/* Résumé */}
        <div className="mt-4">
          <Skeleton count={2} height={14} className="mb-1" />
        </div>

        {/* Pied de carte */}
        <div className="mt-4 flex justify-between items-center">
          <Skeleton width={80} height={24} />
          <Skeleton width={100} height={20} />
        </div>
      </div>
    </div>
  );
};

// Pour utiliser plusieurs squelettes en liste
export const DecisionListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <DecisionSkeleton key={index} />
      ))}
    </div>
  );
};
