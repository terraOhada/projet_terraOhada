import { LEGAL_SUBJECTS } from "../../data/data";
import type { ILegalSubject, ILegalSubjectSelectProps } from "../../types";

const LegalSubjectSelect: React.FC<ILegalSubjectSelectProps> = ({
  value = "",
  onChange,
  className = "",
  required = false,
  placeholder = "Sujet juridique",
  showCategory = true,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  // Grouper les sujets par catégorie
  const groupedSubjects = LEGAL_SUBJECTS.reduce((acc, subject) => {
    if (!acc[subject.category]) {
      acc[subject.category] = [];
    }
    acc[subject.category].push(subject);
    return acc;
  }, {} as Record<string, ILegalSubject[]>);

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      required={required}
    >
      <option value="">{placeholder}</option>

      {Object.entries(groupedSubjects).map(([category, subjects]) => (
        <optgroup key={category} label={category}>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {showCategory
                ? `${subject.name} (${subject.category})`
                : subject.name}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default LegalSubjectSelect;
