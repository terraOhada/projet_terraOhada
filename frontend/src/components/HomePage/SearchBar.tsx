import type { ISearchBarProps } from "../../types";

const SearchBar: React.FC<ISearchBarProps> = ({
  value,
  onChange,
  placeholder = "Rechercher...",
  className = "",
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    />
  );
};

export default SearchBar;
