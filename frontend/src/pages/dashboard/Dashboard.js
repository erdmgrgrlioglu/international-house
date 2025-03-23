import { useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { FaBell } from "react-icons/fa";

import { useDatabase, get } from "../../database/database";
import i18n from "i18next";

import {
  LoginPanel,
  CalendarPanel,
  VisitorsPanel,
  UsersPanel,
  ConsultationsPanel,
  InformationPanel,
} from "./panels";

import classes from "./Dashboard.module.scss";

/**Dashboard Page for Admin or Employees
 *
 * @returns DashboardPage
 */
export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);

  const { t } = useTranslation();

  useDatabase(() => {
    get("visitors")
      .then((response) => setVisitorCount(response.length))
      .catch((error) => console.error(error));
  });

  if (!user)
    return (
      <LoginPanel
        onLogin={(user) => {
          setSelectedTab(0);
          setUser(user);
        }}
      />
    );

  return (
    <div className={classes.page}>
      <div className={classes.nav}>
        <div className={classes.profile}>
          {t("dashboard.signedInAs") + user.name}
          <div
            className={classes.tab}
            onClick={() => {
              Cookies.remove("token");
              setUser(null);
            }}
          >
            {t("dashboard.signOut")}
          </div>
        </div>

        <div
          className={selectedTab === 0 ? classes.active : classes.tab}
          onClick={() => setSelectedTab(0)}
        >
          {t("dashboard.tabs.calendar")}
        </div>
        <div
          className={selectedTab === 1 ? classes.active : classes.tab}
          onClick={() => setSelectedTab(1)}
        >
          <FaBell />
          {visitorCount + " "}
          {t("dashboard.tabs.visitors")}
        </div>
        {user.role === "ADMIN" && (
          <>
            <div
              className={selectedTab === 2 ? classes.active : classes.tab}
              onClick={() => setSelectedTab(2)}
            >
              {t("dashboard.tabs.manageUsers")}
            </div>
            <div
              className={selectedTab === 3 ? classes.active : classes.tab}
              onClick={() => setSelectedTab(3)}
            >
              {t("dashboard.tabs.manageConsultationHours")}
            </div>
            <div
              className={selectedTab === 4 ? classes.active : classes.tab}
              onClick={() => setSelectedTab(4)}
            >
              {t("dashboard.tabs.manageInfoPage")}
            </div>
          </>
        )}
        <div
          className={classes.tab}
          onClick={() =>
            i18n.language === "en"
              ? i18n.changeLanguage("de")
              : i18n.changeLanguage("en")
          }
        >
          {t("dashboard.tabs.changeLanguage")}
        </div>
      </div>
      <div className={classes.panel}>
        {selectedTab === 0 && <CalendarPanel className={classes.calendar} />}
        {selectedTab === 1 && <VisitorsPanel className={classes.queue} />}
        {selectedTab === 2 && <UsersPanel />}
        {selectedTab === 3 && <ConsultationsPanel />}
        {selectedTab === 4 && <InformationPanel />}
      </div>
    </div>
  );
}
