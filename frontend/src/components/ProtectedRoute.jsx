import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  isAllowed,
  children,
  redirectTo = "/login",
}) => {
  if (!isAllowed) {
    // Si no tiene permiso, redirigir a la ruta especificada (por defecto login)
    return <Navigate to={redirectTo} replace />;
  }
  // Si tiene permiso, renderizar los hijos o el Outlet (rutas anidadas)
  return children ? children : <Outlet />;
};
