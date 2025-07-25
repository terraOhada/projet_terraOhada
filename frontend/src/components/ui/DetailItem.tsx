/* eslint-disable @typescript-eslint/no-explicit-any */
// Composant helper pour afficher les détails
import { motion } from "framer-motion";
interface DetailItemProps {
  label: string;
  value: any;
  animationDelay?: number;
}
const DetailItem = ({ label, value, animationDelay = 0 }: DetailItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: animationDelay }}
    className="border-b border-gray-100 pb-2"
  >
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <div className="mt-1 text-gray-900">{value}</div>
  </motion.div>
);

export default DetailItem;
