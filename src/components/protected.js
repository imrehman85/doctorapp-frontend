import React from "react";
import { Navigate } from "react-router-dom";
function Protected({ isSignedIn, children }) {
  if (isSignedIn != "true") {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Protected;