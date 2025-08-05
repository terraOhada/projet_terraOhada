// Composant de pagination réel (à utiliser quand les données sont chargées)
interface ParamProps {
  currentPage: number;
  totalPages: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}
export const PaginationAnnuaireProfile = ({
  currentPage,
  totalPages,
  onPageChange,
}: ParamProps) => {
  return (
    <div className="mt-12 flex justify-center">
      <nav className="inline-flex rounded-md shadow">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 disabled:opacity-50"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 border-t border-b border-gray-300 bg-white ${
              currentPage === index + 1
                ? "text-blue-600 font-bold"
                : "text-gray-500"
            } hover:bg-gray-50`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-blue-600 hover:bg-gray-50 disabled:opacity-50"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </nav>
    </div>
  );
};
