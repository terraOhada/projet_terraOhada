const env = import.meta.env.VITE_NODE_ENV;

const BASE_URL =
  env === "production"
    ? "https://projet-terraohada.onrender.com/api"
    : import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// const BASE_URL = "https://projet-terraohada.onrender.com/api";

export const AUTH_URL = `${BASE_URL}/auth`;
export const DECISION_URL = `${BASE_URL}/decision`;
export const FAVORI_URL = `${BASE_URL}/favorite`;
export const FILE_URL = `${BASE_URL}/file`;
export const USERS_URL = `${BASE_URL}/users`;
export const COMMENT_URL = `${BASE_URL}/comment`;

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
