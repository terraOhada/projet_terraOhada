// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import SignupPage from "./pages/auth/SignupPage";
import Produit from "./pages/Produit";
import Layout from "./layout/Layout";
import NotFoundPage from "./pages/NotfoundPage";
import DecisionDetailPage from "./pages/DecisionDetailPage";
import ProfileLayout from "./layout/ProfilLayout";
import HelpAndSupportPage from "./pages/HelpAndSupportPage";
import VerifyAccount from "./pages/auth/VerifyAccount";
import { userStore } from "./store/store";
import NewPasswordPage from "./pages/auth/NewPasswordPage";
import AddDecision from "./components/adminComponents/AddDecision";
import ViewDecisionsList from "./components/adminComponents/ViewDecisionList";
import DashboardLayout from "./layout/DashboardLayout";
import DecisionStatistics from "./components/adminComponents/DecisionStatistics";
import FavorisProfile from "./pages/profile/FavorisProfile";
import UserProfilePage from "./pages/profile/UserProfilePage";
import UserPage from "./pages/admin/UserPage";
import CommentProfile from "./pages/profile/CommentProfile";
import ViewComments from "./components/adminComponents/ViewComments";
import AnnuairePage from "./pages/AnnuairePage";
import RejoindreAnnuaire from "./pages/RejoindreAnnuaire";
import ExplorerAnnuaire from "./pages/ExplorerAnnuaire";
import OhadaQuizzPage from "./components/ui/OhadaQuizzPage";
import PaymentPage from "./pages/admin/PaymentPage";
import PaymentCallbackPage from "./components/ui/PaymentCallbackPage";
import AbonnementProfile from "./pages/profile/AbonnementProfile";
// Make sure this import is correct

const App = () => {
  const { user } = userStore(); // Assuming userStore is defined and imported correctly
  // fonction to check if the user is authenticated
  const isAuthenticated = () => {
    // Check if user object is not empty
    if (user && Object.keys(user).length > 0) {
      return null; // User is authenticated
    }
    return window.history.back(); // User is not authenticated
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "presentation-terraohada",
          element: <Produit />,
        },
        {
          path: "decisions/:id",
          element: <DecisionDetailPage />,
        },
        {
          path: "aide-et-support",
          element: <HelpAndSupportPage />,
        },
        {
          path: "annuaire",
          element: <AnnuairePage />,
        },
        {
          path: "annuaire/rejoindre-annuaire",
          element: <RejoindreAnnuaire />,
        },
        {
          path: "annuaire/explorer-annuaire",
          element: <ExplorerAnnuaire />,
        },
        {
          path: "quizz-terraOhada",
          element: <OhadaQuizzPage />,
        },
      ],
    },
    {
      path: "/profile/:id", // The /profil route uses ProfileLayout
      element: <ProfileLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "", // UserProfilePage will be the default content for /profil
          element: <UserProfilePage />,
          loader: isAuthenticated,
        },
        {
          path: "favoris",
          element: <FavorisProfile />,
        },
        {
          path: "commentaires",
          element: <CommentProfile />,
        },
        {
          path: "abonnement",
          element: <AbonnementProfile />,
        },
      ],
    },
    {
      path: "/tableau-de-bord",
      element: <DashboardLayout />,
      loader: isAuthenticated,
      errorElement: <NotFoundPage />,
      children: [
        // {
        //   path: "",
        //   element: <DecisionDashboard />,
        // },
        {
          path: "",
          element: <AddDecision />,
        },
        {
          path: "voir-decisions",
          element: <ViewDecisionsList />,
        },
        {
          path: "voir-commentaires",
          element: <ViewComments />,
        },
        {
          path: "statistics-decisions",
          element: <DecisionStatistics />,
        },
        {
          path: "utilisateurs",
          element: <UserPage />,
        },
        {
          path: "payment",
          element: <PaymentPage />,
        },
      ],
    },

    {
      path: "payment-callback",
      element: <PaymentCallbackPage />,
    },
    {
      path: "/connexion",
      element: <LoginPage />,
    },
    {
      path: "/inscription",
      element: <SignupPage />,
    },
    {
      path: "/mot-de-passe-oublie",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/reinitialisation-mot-de-passe/:token",
      element: <NewPasswordPage />,
    },
    {
      path: "/verification-compte/:id",
      element: (
        <VerifyAccount
          onVerificationSuccess={function (): void {
            throw new Error("Function not implemented.");
          }}
          onResendCode={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
