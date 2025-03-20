import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Timeout() {
  const navigate = useNavigate();
  let timeout;

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => navigate("/"), 120000); //120 seconds
    };

    const events = ["mouseover", "keydown", "click", "scroll", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeout);
      events.forEach((ev) => window.addEventListener(ev, resetTimer));
    };
  }, [navigate]);

  return null;
}
