import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, isValidating } = useAdminAuth();
  const location = useLocation();

  if (isValidating) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
        <p className="text-xs font-semibold text-slate-400 mt-3 font-inter">
          Verifying admin security session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-v2/login" state={{ from: location }} replace />;
  }

  return children;
}

