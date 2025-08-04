import { useState, useEffect } from "react";
import type { FilterParams, IDecision } from "../types";
import { DECISION_URL } from "../api/api";

const useDecisions = (initialFilters: FilterParams = {}) => {
  const [decisions, setDecisions] = useState<IDecision[]>([]);
  const [filteredDecisions, setFilteredDecisions] = useState<IDecision[]>([]);
  const [filters, setFilters] = useState<FilterParams>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        // Remplacez par votre appel API réel
        const response = await fetch(`${DECISION_URL}/toutes-decisions`);
        const data = await response.json();
        // console.log("data", data);
        setDecisions(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching decisions:", error);
        setIsLoading(false);
      }
    };

    fetchDecisions();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = decisions.filter((decision) => {
        const matchesQuery =
          !filters.query ||
          decision.titreDecision
            .toLowerCase()
            .includes(filters.query.toLowerCase()) ||
          decision.resume.toLowerCase().includes(filters.query.toLowerCase());

        const matchesLegalSubject =
          !filters.legalSubject ||
          decision.matiere
            .toLowerCase()
            .includes(filters.legalSubject.toLowerCase()) ||
          decision.matiere
            .toLowerCase()
            .includes(filters.legalSubject.toLowerCase());

        const matchesYear =
          !filters.year || decision.dateDecision.includes(filters.year);

        const matchesCountry =
          !filters.country || decision.pays === filters.country;

        const matchesJurisdiction =
          !filters.jurisdiction ||
          decision.juridiction === filters.jurisdiction;

        return (
          matchesQuery &&
          matchesYear &&
          matchesCountry &&
          matchesJurisdiction &&
          matchesLegalSubject
        );
      });

      setFilteredDecisions(filtered);
    };

    if (decisions.length > 0) {
      applyFilters();
    }
  }, [decisions, filters]);

  return {
    decisions: filteredDecisions,
    isLoading,
    filters,
    setFilters,
    resetFilters: () => setFilters(initialFilters),
  };
};

export default useDecisions;
