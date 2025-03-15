import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AccesabilityButton, Button } from "../../components";

import classes from "./Welcome.module.scss";

export default function WelcomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.page}>
        <img alt="" src={require("../../images/ih_tuda_render.jpg")} />
        <div>{t("welcome.title")}</div>
        <Button
          onClick={() => navigate("/booking")}
          text={t("welcome.book_button")}
        />
        <Button
          onClick={() => navigate("/info")}
          className={classes.button}
          text={t("welcome.info_button")}
        />
      </div>
      <AccesabilityButton type="language" />
    </>
  );
}
