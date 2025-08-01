import { useEffect, useState } from "react";
import type { IProfile } from "../types";
import { NOTION_URL } from "../api/api";

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = async () => {
    try {
      const response = await fetch(`${NOTION_URL}/juristes`);
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
