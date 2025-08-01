import { useEffect, useState } from "react";
import type { IProfile } from "../types";

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notion/juristes");
      const data = await response.json();
      setProfiles(data.profiles);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to fetch profiles : ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return { profiles, loading, error, refresh: fetchProfiles };
};
