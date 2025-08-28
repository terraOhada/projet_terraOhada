import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import DetailItem from "./DetailItem";
import MarkdownEditor from "./MarkdownEditor";
import type { IDecision } from "../../types";

interface ViewDecisionModalProps {
  decision: IDecision;
  onClose: () => void;
}

const ViewDecisionModal: React.FC<ViewDecisionModalProps> = ({
  decision,
  onClose,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-ohada-blue-for/40 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-100"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-ohada-blue-one"
              >
                {decision.titreDecision}
              </motion.h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                &times;
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-4">
                <DetailItem
                  label="ID Interne"
                  value={decision.idInterne}
                  animationDelay={0.3}
                />
                <DetailItem
                  label="Juridiction"
                  value={decision.juridiction}
                  animationDelay={0.35}
                />
                <DetailItem
                  label="Pays"
                  value={decision.pays}
                  animationDelay={0.4}
                />
                <DetailItem
                  label="Date"
                  value={decision.dateDecision}
                  animationDelay={0.45}
                />
              </div>
              <div className="space-y-4">
                <DetailItem
                  label="Matière"
                  value={decision.matiere}
                  animationDelay={0.3}
                />
                <DetailItem
                  label="Statut"
                  value={decision.statut}
                  animationDelay={0.35}
                />

                {decision.article && (
                  <DetailItem
                    label="Article"
                    value={
                      <a
                        href={decision.article}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {decision.article}
                      </a>
                    }
                    animationDelay={0.4}
                  />
                )}

                {decision.lienSource && (
                  <DetailItem
                    label="Lien source"
                    value={
                      <a
                        href={decision.lienSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {decision.lienSource}
                      </a>
                    }
                    animationDelay={0.45}
                  />
                )}

                {decision.typeDecision && (
                  <DetailItem
                    label="Type décision"
                    value={
                      <span
                        // href={decision.typeDecision}
                        // target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {decision.typeDecision}
                      </span>
                    }
                    animationDelay={0.45}
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10"
            >
              <h4 className="text-lg font-semibold mb-3 text-gray-800">
                Résumé
              </h4>
              <MarkdownEditor
                value={decision.resume as string}
                onChange={() => "void"}
                // className="border border-gray-200 rounded-lg overflow-hidden"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex justify-end space-x-3"
            >
              <button
                onClick={onClose}
                className="px-4 py-2 bg-ohada-blue-two text-white rounded-lg hover:bg-ohada-blue-three transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Fermer
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ViewDecisionModal;
