import { COUNTRIES } from "../../data/data";
import type { ICountrySelectProps } from "../../types";

const CountrySelect: React.FC<ICountrySelectProps> = ({
  value = "",
  onChange,
  className = "",
  required = false,
  placeholder = "Pays",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      required={required}
    >
      <option value="">{placeholder}</option>
      {COUNTRIES.map((country) => (
        <option key={country.code} value={country.name}>
          {country.name} ({country.code})
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
