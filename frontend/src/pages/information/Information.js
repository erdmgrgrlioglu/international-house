import { useState } from "react";
import i18n from "i18next";

import { get, useDatabase } from "../../database/database";

import Timeout from "../../components/timeout/Timeout";

import { AccessibilityButton } from "../../components";

import classes from "./Information.module.scss";

export default function InformationPage() {
  const [info, setInfo] = useState([]);

  useDatabase(
    () =>
      get("information", false)
        .then(setInfo)
        .catch((e) => console.error(e)),
    -1
  );

  return (
    <>
      <Timeout />
      <div
        className={classes.page}
        dangerouslySetInnerHTML={{
          __html:
            i18n.language === "en"
              ? info[0]
                ? info[0].content
                : ""
              : info[1]
              ? info[1].content
              : "",
        }}
      ></div>
      <AccessibilityButton type="home" />
      <AccessibilityButton type="language" />
    </>
  );
}
