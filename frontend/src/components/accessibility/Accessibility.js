import { useNavigate } from "react-router-dom";
import i18n from "i18next";

import { TiHome } from "react-icons/ti";
import { MdLanguage } from "react-icons/md";


import classes from "./Accessibility.module.scss";

export default function AccessibilityButton(props) {
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
        <MdLanguage aria-label="globe" className={classes.icon} />
      </button>
    );

  return <></>;
}
