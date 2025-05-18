import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { lazy, useContext } from "react";
import { AuthContext } from "./context/authContext";
import Layout from "./components/layout";
import LoginPage from "./features/auth/components/login";


const HomePage = lazy(() => import('./features/home/components/home'));


const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <>
      {!authenticated && <Navigate to="/auth/login" replace />}
      <Outlet />
    </>
  );
};

const Routes = () => {
  return (
    <Router>
      <Route path="/auth/login" element={<LoginPage />} />

      <Route element={<PrivateRoutes />}>
        <Route path="" element={<Layout children={<HomePage />} />} />
      </Route>
    </Router>
  );
};

export default Routes;
