import { PropTypes } from "prop-types";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../shared/context";

export function Protected({ children }) {
  const { user } = useContext(Context);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
}

Protected.propTypes = {
  children: PropTypes.node,
};
