import { useState } from "react";

import {
  useDatabase,
  get,
  push,
  remove,
  set,
} from "../../../../database/database";

import classes from "./Consultations.module.scss";
import { Button, Input, Modal } from "../../../../components";
import { addConsultations } from "../../../test/Test";
import { useTranslation } from "react-i18next"; // Import translation function

export default function ConsultationsPanel() {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState({});
  const [modal, setModal] = useState("");

  useDatabase(() => {
    get("consultations")
      .then(setConsultations)
      .catch((error) => console.error("Error:", error));
  });

  const { t } = useTranslation(); // Use translation hook

  return (
    <div className={classes.flex}>
      {modal && (
        <Modal
          title={t(
            modal === "Edit"
              ? "consultationsPage.edit"
              : "consultationsPage.add"
          )}
          onClick={() => setModal("")}
          content={
            <>
              <Input
                text="Name"
                value={selectedConsultation.name}
                onChange={(e) =>
                  setSelectedConsultation({
                    ...selectedConsultation,
                    name: e.target.value,
                  })
                }
              />
              <Input
                text={t("consultationsPage.description")}
                value={selectedConsultation.description}
                onChange={(e) =>
                  setSelectedConsultation({
                    ...selectedConsultation,
                    description: e.target.value,
                  })
                }
              />
              <Input
                text={t("consultationsPage.shortVersion")}
                value={selectedConsultation.shortVersion}
                onChange={(e) =>
                  setSelectedConsultation({
                    ...selectedConsultation,
                    shortVersion: e.target.value,
                  })
                }
              />
              <div>
                {t("consultationsPage.color") + ": "}
                <input
                  type="color"
                  value={selectedConsultation.color}
                  onChange={(e) =>
                    setSelectedConsultation({
                      ...selectedConsultation,
                      color: e.target.value,
                    })
                  }
                />
              </div>
            </>
          }
          buttons={
            modal === "Add" ? (
              <Button
                onClick={() =>
                  push("consultations", selectedConsultation)
                    .then(() => setModal(""))
                    .catch((error) => alert("Something went wrong:", error))
                }
                text={t("button.create")}
              />
            ) : (
              modal === "Edit" && (
                <>
                  <Button
                    text={t("button.save")}
                    onClick={() =>
                      set(
                        "consultations/" + selectedConsultation.id,
                        selectedConsultation
                      )
                        .then(() => setModal(""))
                        .catch((error) => alert("Something went wrong:", error))
                    }
                  />
                  <Button
                    onClick={() =>
                      remove("consultations/" + selectedConsultation.id)
                        .then(() => setModal(""))
                        .catch((error) => alert("Something went wrong:", error))
                    }
                    text={t("button.delete")}
                  />
                </>
              )
            )
          }
        />
      )}
      {consultations.map((consultation, index) => (
        <div
          className={classes.user}
          key={index}
          onClick={() => setSelectedConsultation(consultation)}
        >
          <div>{index + 1}</div>
          <div className={classes.box}>
            <div>
              <div>Name: {consultation.name}</div>
              <div>
                {t("consultationsPage.description") +
                  ": " +
                  consultation.description}
              </div>
              <div>
                {t("consultationsPage.shortVersion") +
                  ": " +
                  consultation.shortVersion}
              </div>
              <div>
                {t("consultationsPage.totalVisitorCount") +
                  ": " +
                  consultation.totalVisitorCount}
              </div>
              <div>
                {t("consultationsPage.dailyVisitorCount") +
                  ": " +
                  consultation.dailyVisitorCount}
              </div>
              <div style={{ color: consultation.color }}>
                ■■■ {t("consultationsPage.color")} {consultation.color} ■■■
              </div>
            </div>
            <Button onClick={() => setModal("Edit")} text={t("button.edit")} />
          </div>
        </div>
      ))}{" "}
      <Button
        text="+"
        onClick={() => {
          setSelectedConsultation({});
          setModal("Add");
        }}
      />
      <Button
        text={t("consultationsPage.addDefault")}
        onClick={addConsultations}
      />
    </div>
  );
}
