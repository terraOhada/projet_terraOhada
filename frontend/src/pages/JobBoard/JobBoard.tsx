// client/src/JobBoard.tsx

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Imports des composants et des types
import { SearchBar } from "../../components/jobs/SearchBar";
import { FilterSidebar } from "../../components/jobs/FilterSidebar";

import type { Filters, Job } from "../../types";
import { JOB_URL } from "../../api/api";

import JobCard from "../../components/jobs/JobCard";
import PaginateJob from "../../components/jobs/PaginateJob";

// Constantes définies à l'extérieur du composant
const JOBS_PER_PAGE = 9;

/**
 * Fonction de fetching des données.
 * Elle récupère TOUTES les offres correspondant aux filtres.
 * La pagination n'est PAS gérée ici.
 */
const fetchJobs = async (filters: Filters): Promise<Job[]> => {
  // On construit un objet avec uniquement les filtres actifs
  const queryParams: Record<string, string> = { sortBy: filters.sortBy };
  if (filters.q) queryParams.q = filters.q;
  if (filters.location) queryParams.location = filters.location;
  if (filters.date) queryParams.date = filters.date;
  if (filters.contract.length > 0)
    queryParams.contract = filters.contract.join(",");
  if (filters.experience.length > 0)
    queryParams.experience = filters.experience.join(",");
  if (filters.remote.length > 0) queryParams.remote = filters.remote.join(",");

  const finalParams = new URLSearchParams(queryParams);
  const requestUrl = `${JOB_URL}/all-jobs?${finalParams.toString()}`;

  const { data } = await axios.get(requestUrl);
  return data;
};

// Le composant principal de la page
function JobBoard() {
  // --- GESTION DE L'ÉTAT (STATE) ---

  // État pour la page de pagination actuellement affichée
  const [page, setPage] = useState(1);

  // État pour tous les filtres de recherche
  const [filters, setFilters] = useState<Filters>({
    q: "",
    location: "",
    contract: [],
    experience: [],
    remote: [],
    date: "",
    sortBy: "date",
  });

  // --- RÉCUPÉRATION DES DONNÉES (DATA FETCHING) ---

  // `useQuery` pour récupérer la liste COMPLÈTE des offres filtrées
  const {
    data: allJobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => fetchJobs(filters),
  });

  // `useEffect` pour réinitialiser la page à 1 chaque fois qu'un filtre est modifié
  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [filters]);

  // --- LOGIQUE DE PAGINATION (CÔTÉ FRONTEND) ---

  // `useMemo` pour optimiser : ces calculs ne sont refaits que si `allJobs` ou `page` changent.
  const { jobsForCurrentPage, totalPages } = useMemo(() => {
    if (!allJobs) {
      return { jobsForCurrentPage: [], totalPages: 0 };
    }
    // Calcul du nombre total de pages
    const total = Math.ceil(allJobs.length / JOBS_PER_PAGE);

    // Découpage du tableau pour n'afficher que les offres de la page actuelle
    const jobsSlice = allJobs.slice(
      (page - 1) * JOBS_PER_PAGE,
      page * JOBS_PER_PAGE
    );

    return { jobsForCurrentPage: jobsSlice, totalPages: total };
  }, [allJobs, page]);

  // --- AFFICHAGE (RENDERING) ---
  //   console.log("État actuel de la page :", page);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <SearchBar filters={filters} setFilters={setFilters} />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <FilterSidebar filters={filters} setFilters={setFilters} />

          <main className="w-full">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {isLoading
                  ? "Recherche en cours..."
                  : `${allJobs?.length ?? 0} offres trouvées`}
              </h2>
              {/* On pourrait ajouter un sélecteur de tri ici */}
            </div>

            {/* Affichage conditionnel : chargement, erreur, ou résultats */}
            {isLoading ? (
              <p className="text-center text-gray-500">
                Chargement des offres...
              </p>
            ) : error ? (
              <p className="text-center text-red-500">
                Une erreur est survenue lors de la récupération des données.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {jobsForCurrentPage.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                <PaginateJob
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default JobBoard;
