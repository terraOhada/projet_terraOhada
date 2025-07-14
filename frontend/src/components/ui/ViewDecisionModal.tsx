import React from "react";

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
    <div className="fixed inset-0 bg-ohada-blue-for/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-ohada-blue-one">
              {decision.titreDecision}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <DetailItem label="ID Interne" value={decision.idInterne} />
              <DetailItem label="Juridiction" value={decision.juridiction} />
              <DetailItem label="Pays" value={decision.pays} />
              <DetailItem label="Date" value={decision.dateDecision} />
            </div>
            <div className="space-y-4">
              <DetailItem label="Matière" value={decision.matiere} />
              <DetailItem label="Statut" value={decision.statut} />

              {decision.article && (
                <DetailItem
                  label="Article"
                  value={
                    <a
                      href={decision.article}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {decision.article}
                    </a>
                  }
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
                      className="text-blue-600 hover:underline"
                    >
                      {decision.lienSource}
                    </a>
                  }
                />
              )}
            </div>
          </div>
          <div className="mt-10">
            <h4 className="text-lg font-semibold mb-2">Résumé</h4>
            <MarkdownEditor
              value={decision.resume as string}
              onChange={() => "void"}
            />
          </div>

          {/* <div className="mt-6">
            <div className="prose max-w-none p-4 bg-gray-50 rounded-md">
              {decision.resume}
            </div>
          </div> */}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-ohada-blue-two text-white rounded-md hover:bg-ohada-blue-three transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDecisionModal;
