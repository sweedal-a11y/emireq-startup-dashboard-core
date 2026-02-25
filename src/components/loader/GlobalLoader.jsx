import { useSelector } from "react-redux";
import "./loader.css";

const GlobalLoader = () => {
  const loading = useSelector((state) => state.loader.loading);

  if (!loading) return null;

  return (
    <div className="global-loader-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default GlobalLoader;