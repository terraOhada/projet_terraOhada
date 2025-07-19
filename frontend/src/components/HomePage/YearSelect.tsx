import type { IYearSelectProps } from "../../types";

const YearSelect: React.FC<IYearSelectProps> = ({
  value = "",
  onChange,
  className = "",
  required = false,
  placeholder = "Année",
  startYear = 2000,
  endYear = new Date().getFullYear(),
  reverse = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  // Génère les années dans l'ordre croissant ou décroissant
  const generateYears = () => {
    const years = [];
    const start = reverse ? endYear : startYear;
    const end = reverse ? startYear : endYear;
    const step = reverse ? -1 : 1;

    for (let year = start; reverse ? year >= end : year <= end; year += step) {
      years.push(year);
    }

    return years;
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      required={required}
    >
      <option value="">{placeholder}</option>
      {generateYears().map((year) => (
        <option key={year} value={year.toString()}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelect;
