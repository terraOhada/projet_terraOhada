import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Skeleton pour les profils en vedette
export const FeaturedProfilesSkeleton = () => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">
      <Skeleton width={200} />
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-600"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Skeleton circle width={64} height={64} />
              <div className="ml-4">
                <Skeleton width={150} height={20} className="mb-2" />
                <Skeleton width={100} height={16} className="mb-2" />
                <Skeleton width={60} height={16} />
              </div>
            </div>
            <div className="mb-4">
              <Skeleton count={3} />
            </div>
            <div className="flex space-x-2 mb-4">
              <Skeleton circle width={24} height={24} />
              <Skeleton circle width={24} height={24} />
            </div>
            <Skeleton height={36} />
          </div>
        </div>
      ))}
    </div>
  </div>
);
