import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Skeleton pour tous les professionnels avec pagination
export const AllProfilesSkeleton = () => {
  const itemsPerPage = 6;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          <Skeleton width={220} />
        </h2>
        <div className="flex items-center">
          <Skeleton width={80} className="mr-2" />
          <Skeleton width={120} height={40} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(itemsPerPage)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Skeleton circle width={64} height={64} />
                <div className="ml-4">
                  <Skeleton width={150} height={20} className="mb-2" />
                  <Skeleton width={100} height={16} />
                </div>
              </div>
              <div className="mb-4">
                <Skeleton count={2} />
              </div>
              <div className="flex space-x-2">
                <Skeleton circle width={24} height={24} />
                <Skeleton circle width={24} height={24} />
              </div>
              <Skeleton height={36} className="mt-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton - ajusté pour 6 éléments par page */}
      <div className="mt-12 flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          <Skeleton width={40} height={40} className="mx-1 rounded-l-md" />
          <Skeleton width={40} height={40} className="mx-1" />
          <Skeleton width={40} height={40} className="mx-1" />
          <Skeleton width={40} height={40} className="mx-1" />
          <Skeleton width={40} height={40} className="mx-1 rounded-r-md" />
        </nav>
      </div>
    </div>
  );
};
