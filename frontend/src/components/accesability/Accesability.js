import { useNavigate } from "react-router-dom";
import i18n from "i18next";

import { TiHome } from "react-icons/ti";
import { FaLanguage } from "react-icons/fa";

import classes from "./Accesability.module.scss";

export default function AccesabilityButton(props) {
  const navigate = useNavigate();

  if (props.type === "home") {
    return (
      <button onClick={() => navigate("/")} className={classes.home}>
        <TiHome className={classes.icon} />
      </button>
    );
  }

  if (props.type === "language")
    return (
      <button
        onClick={() =>
          i18n.language === "en"
            ? i18n.changeLanguage("de")
            : i18n.changeLanguage("en")
        }
        className={classes.language}
      >
        <FaLanguage className={classes.icon} />
      </button>
    );

  return <></>;
}
