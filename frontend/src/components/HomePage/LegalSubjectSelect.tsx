import { LEGAL_SUBJECTS } from "../../data/data";
import type { ILegalSubjectSelectProps } from "../../types";

const LegalSubjectSelect: React.FC<ILegalSubjectSelectProps> = ({
  value = "",
  onChange,
  className = "",
  required = false,
  placeholder = "Sujet juridique",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      required={required}
    >
      <option value="">{placeholder}</option>

      {LEGAL_SUBJECTS.map((opt) => (
        <option key={opt.name} value={opt.name}>
          {opt.name} ({opt.category})
        </option>
      ))}
    </select>
  );
};

export default LegalSubjectSelect;
