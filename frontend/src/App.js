import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  BookingPage,
  WelcomePage,
  DashboardPage,
  InformationPage,
  DisplayPage,
  TestPage,
} from "./pages";

import { Navbar, Footer, License } from "./components";

import "./App.module.scss";

/** React App.js
 *
 * All tags correspond to either a component or a page that
 * will be rendered dynamicaly depending on the current URL
 */
export default function App() {
  const { t } = useTranslation();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <License />
        <Routes>
          <Route path="/" element={<Navbar text={t("welcome.navbar")} />} />
          <Route path="/booking" element={<Navbar text={t("book.navbar")} />} />
          <Route path="/info" element={<Navbar text={t("info.navbar")} />} />
        </Routes>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/info" element={<InformationPage />} />
          <Route path="/display" element={<DisplayPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route
            path="*"
            element={<div style={{ height: 90 + "vh" }}>404</div>}
          />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
}
