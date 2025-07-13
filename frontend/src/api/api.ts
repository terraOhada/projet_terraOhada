const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const AUTH_URL = `${BASE_URL}/auth`;
export const DECISION_URL = `${BASE_URL}/decision`;
export const FILE_URL = `${BASE_URL}/file`;

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Échec de la connexion");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
};

export const register = async (
  nom: string,
  prenom: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom, prenom, email, password }),
    });

    if (!response.ok) {
      throw new Error("Échec de l'inscription");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};
