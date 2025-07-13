import { useState, type FormEvent } from "react";
import TerraOhadaLogo from "../../assets/logo TO.png"; // Example: if your logo is in src/assets
import Couverture from "../../assets/images/couverture.jpeg";
import toast from "react-hot-toast";
import { AUTH_URL } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// This component is designed for a password reset page where a user
// arrives via a link (e.g., from an email) that contains a reset token.
// The email and OTP fields are removed as per the user's request.
// The token would typically be extracted from the URL parameters.
// For this example, a placeholder 'resetToken' is used.
const NewPasswordPage = () => {
  const navigate = useNavigate(); // Assuming you have useNavigate imported from react-router-dom
  const [newPassword, setNewPassword] = useState<string>(""); // State for the new password
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // State for confirming the new password
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useParams<{ token: string }>(); // Extracting the token from the URL parameters
  // console.log("token", token?.split("+")[1]); // Log the token for debugging

  // Placeholder for the reset token. In a real application, this would be
  // extracted from the URL (e.g., using useParams from react-router-dom)
  // or passed as a prop.

  // Password validation function
  // Requires: at least one uppercase, one lowercase, one digit, one special character, minimum 8 characters
  const validatePassword = (password: string): string | null => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.";
    }
    return null;
  };

  // Handles form submission for password reset
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate if password fields are filled
    if (!newPassword || !confirmPassword) {
      setError("Veuillez remplir tous les champs du mot de passe.");
      setLoading(false);
      return;
    }

    // Validate new password complexity using the regex
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    // Validate password confirmation
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    // Check if resetToken is available (important for API call)
    if (!token) {
      setError("Token de réinitialisation manquant ou invalide.");
      setLoading(false);
      return;
    }

    try {
      // --- API call to reset password ---
      // The API endpoint should accept the reset token and the new password.
      // Adjust this URL to your actual password reset API endpoint.
      // It's common for the token to be part of the URL or sent in the body.
      const response = await axios.post(`${AUTH_URL}/reset-password`, {
        otp: token.split("+")[1],
        newPassword,
        email: token.split("+")[0], // Assuming the email is part of the token
      });

      if (response.data.success) {
        // Password reset successful
        toast.success("Mot de passe réinitialisé avec succès !");
        // Redirect the user to the login page or a success page
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        // Password reset failed (e.g., invalid/expired token, server error)
        setError(
          response.data.message ||
            "La réinitialisation du mot de passe a échoué. Le lien est peut-être invalide ou expiré."
        );
      }
    } catch (err) {
      console.error("Erreur lors de la réinitialisation du mot de passe:", err);
      setError(
        "Une erreur est survenue lors de la réinitialisation. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${Couverture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        animation: "scroll 60s linear infinite",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-700 to-ohada-blue-one z-10 opacity-50"></div>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg z-50">
        <div>
          <img
            className="mx-auto h-24 w-auto" // h-24 for a good size on mobile and desktop
            src={TerraOhadaLogo}
            alt="Logo TerraOhada"
          />
          <h2 className="mt-6 text-center text-3xl text-ohada-blue-one font-extrabold ">
            Définissez votre nouveau mot de passe
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Veuillez entrer et confirmer votre nouveau mot de passe.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* New Password Field */}
          <div>
            <label htmlFor="new-password" className="sr-only">
              Nouveau mot de passe
            </label>
            <input
              id="new-password"
              name="new-password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirm-password" className="sr-only">
              Confirmer le mot de passe
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              {loading
                ? "Définition du mot de passe..."
                : "Définir le nouveau mot de passe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordPage;
