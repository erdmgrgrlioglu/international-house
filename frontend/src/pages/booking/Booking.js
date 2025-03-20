import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaInfoCircle } from "react-icons/fa";

import { useDatabase, get, push } from "../../database/database";

import { AccessibilityButton, Button, Modal } from "../../components";
import Timeout from "../../components/timeout/Timeout";

import classes from "./Booking.module.scss";

export function getFormatedHourAndMinutes(start, end) {
  start = new Date(start);
  end = new Date(end);
  return (
    start.getHours().toString().padStart(2, "0") +
    ":" +
    start.getMinutes().toString().padStart(2, "0") +
    " - " +
    end.getHours().toString().padStart(2, "0") +
    ":" +
    end.getMinutes().toString().padStart(2, "0")
  );
}

export default function BookingPage() {
  const [consultationEvents, setConsultationEvents] = useState([]);
  const [booking, setBooking] = useState("");

  const [selectedEvent, setSelectedEvent] = useState({});
  const [modal, setModal] = useState("");

  const { t } = useTranslation();

  useDatabase(() => {
    get("consultation/events", false)
      .then((response) => {
        const events = [];
        const today = new Date();
        response.forEach((event) => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);

          if (event.repeat === "no" && startDate.toDateString() === today.toDateString()) {
            events.push(event);
          }

          if (event.repeat === "daily") {
            for (let index = new Date(startDate); index <= endDate; index.setDate(index.getDate() + 1)) {
              if (index.toDateString() === today.toDateString()) {
                events.push(event);
                break;
              }
            }
          }

          if (event.repeat === "weekly") {
            for (let index = new Date(startDate); index <= endDate; index.setDate(index.getDate() + 7)) {
              if (index.toDateString() === today.toDateString()) {
                events.push(event);
                break;
              }
            }
          }
        });
        setConsultationEvents(events);
      })
      .catch((error) => console.error("Error:", error));
  }, -1);

  function addVisitor(consultation) {
    push(
      "visitors",
      {
        id:
          consultation.shortVersion +
          "-" +
          consultation.dailyVisitorCount.toString().padStart(3, "0"),
        timeStamp: Date.now().valueOf(),
        beingCalled: false,
        consultation: consultation,
      },
      false
    )
      .then((response) => setBooking(response.id))
      .catch((error) => console.error("Error:", error));
    setModal("");
  }

  return (
    <div className={classes.page}>
      <Timeout />
      <AccessibilityButton type="home" />
      <AccessibilityButton type="language" />

      {modal === "info" && (
        <Modal
          onClick={() => setModal("")}
          title={t("book.modal.info.title")}
          content={
            <p>
              {selectedEvent.isCanceled
                ? t("book.modal.info.reason") +
                  ": " +
                  (selectedEvent.reason || t("book.modal.info.no_reason"))
                : selectedEvent.consultation.description ||
                  t("book.modal.info.no_description")}
            </p>
          }
        />
      )}

      {modal === "confirmation" && (
        <Modal
          onClick={() => setModal("")}
          title={t("book.modal.confirm.title")}
          content={
            <>
              <p>
                {t("book.modal.confirm.request") +
                  " " +
                  selectedEvent.consultation.name +
                  " [" +
                  getFormatedHourAndMinutes(
                    selectedEvent.startDate,
                    selectedEvent.endDate
                  ) +
                  "]"}
              </p>
              <p>{t("book.modal.confirm.proceed")}</p>
            </>
          }
          buttons={
            <>
              <Button
                onClick={() => addVisitor(selectedEvent.consultation)}
                text={t("book.modal.confirm.yes_button")}
              />
              <Button
                onClick={() => setModal("")}
                text={t("book.modal.confirm.no_button")}
              />
            </>
          }
        />
      )}

      {booking === "" ? (
        <>
          <div>{t("book.title")}</div>
          {consultationEvents.length > 0 ? (
            consultationEvents.map((event) => (
              <div className={classes.event} key={event.id}>
                <FaInfoCircle
                  aria-label="info"
                  className={classes.info}
                  onClick={() => {
                    setSelectedEvent(event);
                    setModal("info");
                  }}
                />
                <div className={event.isCanceled ? classes.canceled : null}>
                  {event.consultation.name}
                </div>
                {!event.isCanceled ? (
                  <Button
                    onClick={() => {
                      setSelectedEvent(event);
                      setModal("confirmation");
                    }}
                    text={getFormatedHourAndMinutes(
                      event.startDate,
                      event.endDate
                    )}
                  />
                ) : (
                  <div>{t("book.canceled")}</div>
                )}
              </div>
            ))
          ) : (
            <div className={classes.center}>{t("book.not_available")}</div>
          )}
        </>
      ) : (
        <>
          <div>{t("book.in_queue")}</div>
          <div>{t("book.code") + ": " + booking}</div>
        </>
      )}
    </div>
  );
}
