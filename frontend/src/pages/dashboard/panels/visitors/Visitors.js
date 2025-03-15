import { useState } from "react";

import { useDatabase, get, remove, set } from "../../../../database/database";

import { Button } from "../../../../components";

import { FaUser } from "react-icons/fa";

import classes from "./Visitors.module.scss";
import { useTranslation } from "react-i18next";

/**Visitors Panel for Employees
 *
 * for calling, deleting and canceling of visitors.
 *
 * @returns VisitorsPanel
 */
export default function VisitorsPanel() {
  const [visitors, setVisitors] = useState([]);

  useDatabase(() => {
    get("visitors")
      .then(setVisitors)
      .catch((error) => console.error("Error:", error));
  });

  const { t } = useTranslation(); // Use translation hook

  return (
    <div className={classes.page}>
      {visitors.length > 0 ? (
        visitors.map((visitor, index) => (
          <div className={classes.user} key={index}>
            <div>{index + 1}</div>
            <div className={classes.box}>
              <div>
                <div>
                  <FaUser />
                  {visitor.id}
                </div>
                <div>
                  {t("visitorsPage.inLineFor") +
                    ": " +
                    Math.round(
                      (((new Date() - new Date(visitor.timeStamp)) % 86400000) %
                        3600000) /
                        60000
                    ) +
                    " mins"}
                </div>
                <div>
                  {t("visitorsPage.beingCalled") +
                    ": " +
                    (visitor.beingCalled ? "Yes" : "No")}
                </div>
              </div>
              <Button
                disabled={visitor.beingCalled}
                onClick={() =>
                  set("visitors/" + visitor.id, {
                    ...visitor,
                    beingCalled: true,
                  })
                    .then(() =>
                      console.log("Visitor : " + visitor.id + " Called.")
                    )
                    .catch((error) => console.log(error))
                }
                text={t("visitorsPage.call")}
              />
              <Button
                disabled={!visitor.beingCalled}
                onClick={() =>
                  set("visitors/" + visitor.id, {
                    ...visitor,
                    beingCalled: false,
                  })
                    .then(() =>
                      console.log("Visitor : " + visitor.id + " Canceled.")
                    )
                    .catch((error) => console.log(error))
                }
                text={t("visitorsPage.cancel")}
              />
              <Button
                onClick={() =>
                  remove("visitors/" + visitor.id)
                    .then(() =>
                      console.log("Visitor : " + visitor.id + " Deleted.")
                    )
                    .catch((error) => console.log(error))
                }
                text={t("visitorsPage.delete")}
              />
            </div>
          </div>
        ))
      ) : (
        <div>{t("visitorsPage.no_visitor")}</div>
      )}
    </div>
  );
}
