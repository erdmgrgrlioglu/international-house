//import { Button } from "../../components";
import { useState, useEffect } from "react";

import { Calendar as DatePicker } from "react-calendar";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/de"; // Import German locale

import {
  useDatabase,
  get,
  push,
  remove,
  set,
} from "../../../../database/database";

import { Modal, Button, Dropdown, Input } from "../../../../components";

import { useTranslation } from "react-i18next"; // Import translation function

import "./Calendar.scss";
import "react-calendar/dist/Calendar.css";

/**Calendar Page for Employees
 *
 * @returns CalendarPage
 */
export default function CalendarPanel() {
  // database
  const [consultationEvents, setConsultationEvents] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  // Modal
  const [modal, setModal] = useState("");
  const [consultations, setConsultations] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState({});

  // calendar
  const [range, setRange] = useState({
    start: new Date().setDate(new Date().getDate() - 7),
    end: new Date().setDate(new Date().getDate() + 7),
  });

  const { t } = useTranslation(); // Use translation hook

  useDatabase(() => {
    get("consultations")
      .then(setConsultations)
      .catch((error) => console.error("Error:", error));

    get("consultation/events")
      .then((response) =>
        setConsultationEvents(
          response.map((value) => ({
            ...value,
            startDate: new Date(value.startDate),
            endDate: new Date(value.endDate),
          }))
        )
      )
      .catch((error) => console.error("Error:", error));
  });

  useEffect(() => {
    const events = [];
    consultationEvents.forEach((event) => {
      if (event.repeat === "no")
        events.push({
          start: event.startDate,
          end: event.endDate,
          title:
            event.consultation.name + (event.isCanceled ? " (Canceled)" : ""),
          resource: {
            id: event.id,
            color: event.consultation.color,
            isCanceled: event.isCanceled,
          },
        });

      if (event.repeat === "daily")
        for (
          var index = new Date(
            range.start > event.startDate ? range.start : event.startDate
          );
          index <= event.endDate;
          index.setDate(index.getDate() + 1)
        ) {
          events.push({
            start: new Date(
              index.setHours(
                event.startDate.getHours(),
                event.endDate.getMinutes()
              )
            ),
            end: new Date(
              index.setHours(
                event.endDate.getHours(),
                event.endDate.getMinutes()
              )
            ),
            title:
              event.consultation.name + (event.isCanceled ? " (Canceled)" : ""),
            resource: {
              id: event.id,
              color: event.consultation.color,
              isCanceled: event.isCanceled,
            },
          });
        }

      if (event.repeat === "weekly")
        for (
          var index = new Date(event.startDate);
          index <= event.endDate;
          index.setDate(index.getDate() + 7)
        ) {
          events.push({
            start: new Date(
              index.setHours(
                event.startDate.getHours(),
                event.endDate.getMinutes()
              )
            ),
            end: new Date(
              index.setHours(
                event.endDate.getHours(),
                event.endDate.getMinutes()
              )
            ),
            title:
              event.consultation.name + (event.isCanceled ? " (Canceled)" : ""),
            resource: {
              id: event.id,
              color: event.consultation.color,
              isCanceled: event.isCanceled,
            },
          });
        }
    });
    setCalendarEvents(events);
  }, [consultationEvents, range]);

  function createConsultationEvent() {
    if (selectedEvent.endDate < selectedEvent.startDate)
      alert(t("calendar.alerts.endDateError"));
    else if (!selectedEvent.consultation)
      alert(t("calendar.alerts.emptyConsultationError"));
    else
      push("consultation/events", {
        ...selectedEvent,
        startDate: selectedEvent.startDate.valueOf(),
        endDate: selectedEvent.endDate.valueOf(),
      })
        .then(() => {
          alert(t("calendar.alerts.createSuccess"));
          setModal("");
          setSelectedEvent({});
        })
        .catch((error) =>
          console.error("Error Creating consultation hour: ", error)
        );
  }

  function updateConsultationEvent() {
    set("consultation/events/" + selectedEvent.id, {
      ...selectedEvent,
      startDate: selectedEvent.startDate.valueOf(),
      endDate: selectedEvent.endDate.valueOf(),
    })
      .then(() => {
        setModal("");
        setSelectedEvent({});
        alert(t("calendar.alerts.updateSuccess"));
      })
      .catch((error) => console.error("Error updating event:", error));
  }

  function deleteConsultationEvent() {
    if (
      selectedCalendarEvent.start.getDate() !== new Date().getDate() ||
      selectedEvent.isCanceled
    )
      remove("consultation/events/" + selectedEvent.id)
        .then(() => {
          setModal("");
          setSelectedEvent({});
          alert(t("calendar.alerts.deleteSuccess"));
        })
        .catch((error) => console.error("Error deleting event:", error));
    else if (modal === "update") setModal("sure");
    else if (selectedEvent.repeat !== "no")
      set("consultation/events/" + selectedEvent.id, {
        ...selectedEvent,
        startDate: selectedEvent.startDate.valueOf(),
        endDate: new Date(selectedCalendarEvent.end)
          .setDate(selectedCalendarEvent.end.getDate() - 1)
          .valueOf(),
      })
        .then(() => {
          push("consultation/events", {
            ...selectedEvent,
            id: null,
            repeat: "no",
            isCanceled: true,
            startDate: selectedCalendarEvent.start.valueOf(),
            endDate: selectedCalendarEvent.end.valueOf(),
          });
          push("consultation/events", {
            ...selectedEvent,
            id: null,
            startDate: new Date(selectedCalendarEvent.start)
              .setDate(
                selectedCalendarEvent.start.getDate() +
                  (selectedEvent.repeat === "weekly" ? 7 : 1)
              )
              .valueOf(),
            endDate: selectedEvent.endDate.valueOf(),
          });
          setModal("");
          setSelectedEvent({});
          alert("Consultation event canceled");
        })
        .catch((error) => console.error("Error canceling event:", error));
    else
      set("consultation/events/" + selectedEvent.id, {
        ...selectedEvent,
        isCanceled: true,
        startDate: selectedEvent.startDate.valueOf(),
        endDate: selectedEvent.endDate.valueOf(),
      })
        .then(() => {
          setModal("");
          setSelectedEvent({});
          alert(t("calendar.alerts.cancelSuccess"));
        })
        .catch((error) => console.error("Error canceling event:", error));
  }

  // Helper arrays for hours and minutes
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  ); // ["00", "01", ..., "23"]
  const minutes = ["00", "15", "30", "45"];

  function handleSelectSlot(start, end) {
    setSelectedEvent({
      startDate: start,
      endDate: end,
      repeat: "no",
      isCanceled: false,
    });
    setModal("create");
  }

  function handleEventClick(event) {
    get("consultation/events/" + event.resource.id)
      .then((response) => {
        setSelectedEvent({
          ...response,
          startDate: new Date(response.startDate),
          endDate: new Date(response.endDate),
        });
        setSelectedCalendarEvent(event);
        setModal("update");
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <>
      {modal !== "" && (
        <Modal
          onClick={() => setModal("")}
          title={
            selectedEvent.isCanceled ? (
              <div>{"Canceled " + selectedEvent.consultation?.name}</div>
            ) : modal === "sure" ? (
              <>{t("calendar.modal.title.sure")}</>
            ) : (
              <>
                {modal === "create"
                  ? t("calendar.modal.title.create")
                  : t("calendar.modal.title.update")}
                <Dropdown
                  text={
                    selectedEvent.consultation?.name ||
                    t("calendar.modal.consultation")
                  }
                  options={consultations.map((consultation, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedEvent({
                          ...selectedEvent,
                          consultation: consultation,
                        });
                      }}
                    >
                      {consultation.name}
                    </div>
                  ))}
                />
              </>
            )
          }
          content={
            selectedEvent.isCanceled ? (
              <>
                <div>{t("calendar.modal.canceled.text")}</div>
                <div>
                  {t("calendar.modal.canceled.reason") +
                    ": " +
                    (selectedEvent.reason ||
                      t("calendar.modal.canceled.no_reason"))}
                </div>
                <div>{t("calendar.modal.canceled.deleteConfirm")}</div>
              </>
            ) : modal === "sure" ? (
              <>
                <div>{t("calendar.modal.canceled.result")}</div>
                <Input
                  text={t("calendar.modal.canceled.reason")}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      reason: e.target.value,
                    })
                  }
                />
                <div></div>
              </>
            ) : (
              <>
                <div>
                  {t("calendar.modal.description") +
                    ": " +
                    (selectedEvent.consultation?.description || "")}
                </div>
                <div>
                  {t("calendar.modal.start") + " "}
                  <Dropdown
                    text={
                      selectedEvent.startDate?.getFullYear() +
                      "/" +
                      selectedEvent.startDate
                        ?.getDate()
                        .toString()
                        .padStart(2, "0") +
                      "/" +
                      (selectedEvent.startDate?.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")
                    }
                    options={
                      <DatePicker
                        value={selectedEvent.startDate}
                        onChange={(date) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            startDate: new Date(
                              new Date(date).setHours(
                                selectedEvent.startDate.getHours(),
                                selectedEvent.startDate.getMinutes()
                              )
                            ),
                          })
                        }
                      />
                    }
                  />
                  <Dropdown
                    text={selectedEvent.startDate
                      .getHours()
                      .toString()
                      .padStart(2, "0")}
                    options={hours.map((hour, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setSelectedEvent({
                            ...selectedEvent,
                            startDate: new Date(
                              selectedEvent.startDate.setHours(hour)
                            ),
                          })
                        }
                      >
                        {hour}
                      </div>
                    ))}
                  />
                  :
                  <Dropdown
                    text={selectedEvent.startDate
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}
                    options={minutes.map((minute, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setSelectedEvent({
                            ...selectedEvent,
                            startDate: new Date(
                              selectedEvent.startDate.setMinutes(minute)
                            ),
                          })
                        }
                      >
                        {minute}
                      </div>
                    ))}
                  />
                  {" UTC" +
                    (selectedEvent.startDate.getTimezoneOffset() / -60 < 0
                      ? ""
                      : "+") +
                    (selectedEvent.startDate.getTimezoneOffset() / -60)
                      .toString()
                      .padStart(2, "0")}
                </div>
                <div>
                  {t("calendar.modal.end") + " "}
                  <Dropdown
                    text={
                      selectedEvent.endDate?.getFullYear() +
                      "/" +
                      selectedEvent.endDate
                        ?.getDate()
                        .toString()
                        .padStart(2, "0") +
                      "/" +
                      (selectedEvent.endDate?.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")
                    }
                    options={
                      <DatePicker
                        value={selectedEvent.endDate}
                        onChange={(date) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            endDate: new Date(
                              new Date(date).setHours(
                                selectedEvent.endDate.getHours(),
                                selectedEvent.endDate.getMinutes()
                              )
                            ),
                          })
                        }
                      />
                    }
                  />
                  <Dropdown
                    text={selectedEvent.endDate
                      .getHours()
                      .toString()
                      .padStart(2, "0")}
                    options={hours.map((hour, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setSelectedEvent({
                            ...selectedEvent,
                            endDate: new Date(
                              selectedEvent.endDate.setHours(hour)
                            ),
                          })
                        }
                      >
                        {hour}
                      </div>
                    ))}
                  />
                  :
                  <Dropdown
                    text={selectedEvent.endDate
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}
                    options={minutes.map((minute, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setSelectedEvent({
                            ...selectedEvent,
                            endDate: new Date(
                              selectedEvent.endDate.setMinutes(minute)
                            ),
                          })
                        }
                      >
                        {minute}
                      </div>
                    ))}
                  />
                  {" UTC" +
                    (selectedEvent.startDate.getTimezoneOffset() / -60 < 0
                      ? ""
                      : "+") +
                    (selectedEvent.startDate.getTimezoneOffset() / -60)
                      .toString()
                      .padStart(2, "0")}
                </div>
                <div>
                  {t("calendar.modal.repeat.title") + " "}
                  <Dropdown
                    text={
                      selectedEvent.repeat && selectedEvent.repeat === "no"
                        ? t("calendar.modal.repeat.options.no")
                        : selectedEvent.repeat === "daily"
                        ? t("calendar.modal.repeat.options.daily")
                        : selectedEvent.repeat === "weekly" &&
                          t("calendar.modal.repeat.options.weekly")
                    }
                    options={[
                      [t("calendar.modal.repeat.options.no"), "no"],
                      [t("calendar.modal.repeat.options.daily"), "daily"],
                      [t("calendar.modal.repeat.options.weekly"), "weekly"],
                    ].map((value, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setSelectedEvent({
                            ...selectedEvent,
                            repeat: value[1],
                          })
                        }
                      >
                        {value[0]}
                      </div>
                    ))}
                  />
                </div>
              </>
            )
          }
          buttons={
            <>
              {modal === "create" && (
                <Button
                  onClick={createConsultationEvent}
                  text={t("button.create")}
                />
              )}
              {modal === "update" && !selectedEvent.isCanceled && (
                <Button
                  onClick={updateConsultationEvent}
                  text={t("button.save")}
                />
              )}
              {(modal === "update" || modal === "sure") && (
                <Button
                  onClick={deleteConsultationEvent}
                  text={t("button.delete")}
                />
              )}
            </>
          }
        />
      )}
      <Calendar
        defaultView={Views.WEEK}
        events={calendarEvents}
        localizer={dayjsLocalizer(dayjs)}
        onSelectEvent={(event) => handleEventClick(event)}
        onSelectSlot={(slot) => handleSelectSlot(slot.start, slot.end)}
        onRangeChange={(newRange) => {
          // onRangeChange can return either Array or Object. (why :,( ??)
          if (newRange instanceof Array)
            // cast to Object if its array.
            newRange = {
              start: newRange[0],
              end: new Date(
                newRange[newRange.length - 1].setHours(23, 59, 59, 999)
              ),
            };
          //if range change exceeds previous range, update
          if (newRange.start < range.start || range.end < newRange.end)
            setRange(newRange);
        }}
        selectable
        startAccessor="start"
        endAccessor="end"
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer.format(date, "h a", culture),
          timeGutterHeader: (date, culture, localizer) =>
            localizer.format(date, "h a", culture),
          eventTimeRangeFormat: ({ start }, culture, localizer) =>
            localizer.format(start, "hh:mm", culture),
        }}
        eventPropGetter={(event) => ({
          ...{
            style: event.resource.isCanceled
              ? {
                  backgroundColor: "#969696",
                  borderColor: "#000",
                  color: "#dcdcdc",
                }
              : {
                  backgroundColor: event.resource.color,
                  borderColor: "#000",
                },
          },
        })}
        components={{
          timeGutterHeader: () => <div>{t("calendar.allDay")}</div>,
          toolbar: ({ label, onNavigate, onView, view }) => (
            <div className="rbc-toolbar">
              <span className="rbc-btn-group">
                <button onClick={() => onNavigate("TODAY")}>
                  {t("calendar.today")}
                </button>
                <button onClick={() => onNavigate("PREV")}>
                  {t("calendar.back")}
                </button>
                <button onClick={() => onNavigate("NEXT")}>
                  {t("calendar.next")}
                </button>
              </span>
              <span className="rbc-toolbar-label">{label} </span>
              <span className="rbc-btn-group">
                <button
                  className={view === "month" ? "active" : ""}
                  onClick={() => onView("month")}
                >
                  {t("calendar.month")}
                </button>
                <button
                  className={view === "week" ? "active" : ""}
                  onClick={() => onView("week")}
                >
                  {t("calendar.week")}
                </button>
                <button
                  className={view === "day" ? "active" : ""}
                  onClick={() => onView("day")}
                >
                  {t("calendar.day")}
                </button>
                <button
                  className={view === "agenda" ? "active" : ""}
                  onClick={() => onView("agenda")}
                >
                  {t("calendar.agenda")}
                </button>
              </span>
            </div>
          ),
        }}
      />
    </>
  );
}
