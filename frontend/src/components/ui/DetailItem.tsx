/* eslint-disable @typescript-eslint/no-explicit-any */
// Composant helper pour afficher les détails
interface DetailItemProps {
  label: string;
  value: any;
}
const DetailItem = ({ label, value }: DetailItemProps) => (
  <div>
    <span className="block text-sm font-medium text-gray-500">{label}</span>
    <p className="mt-1 text-sm text-gray-900">
      {value || <span className="text-gray-400">Non renseigné</span>}
    </p>
  </div>
);

export default DetailItem;
