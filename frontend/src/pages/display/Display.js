import { useEffect, useState } from "react";

import { useDatabase, get } from "../../database/database";

import classes from "./Display.module.scss";

export default function DisplayPage() {
  const [prevVisitors, setPrevVisitors] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [popup, setPopup] = useState("");
  const [isSoundOn, setIsSoundOn] = useState(false);

  useDatabase(() => {
    get("visitors")
      .then(setVisitors)
      .catch((error) => console.error("Error:", error));
    get("consultations")
      .then(setConsultations)
      .catch((error) => console.error("Error:", error));
  });

  useEffect(() => {
    console.log("prev", prevVisitors, "now", visitors);

    visitors.forEach((visitor) => {
      if (
        prevVisitors.find((item) => item.id === visitor.id)?.beingCalled ===
          false &&
        visitor.beingCalled === true
      )
        handlePopup(visitor.id);
    });

    setPrevVisitors(visitors);
  }, [visitors]);

  function handlePopup(id) {
    setPopup(id);
    if (isSoundOn) playPopUpSound();
    setTimeout(() => setPopup(""), 7000);
  }

  const playPopUpSound = () => {
    const audio = new Audio("/sounds/DisplayNotification.mp3");
    audio.volume = 1;
    audio.load();
    setTimeout(
      () =>
        audio
          .play()
          .catch((error) =>
            console.error("Error playing notification sound: ", error)
          ),
      100
    );
  };

  return (
    <div className={classes.page}>
      <h1>Waiting Room Display</h1>

      <button
        className={classes.soundToggle}
        onClick={() => setIsSoundOn(!isSoundOn)}
      >
        {isSoundOn ? "Sound: ON" : "Sound: OFF"}
      </button>

      {popup && (
        <div className={classes.popup}>
          <h2>Now being called: {popup}</h2>
        </div>
      )}

      <div className={classes.queueContainer}>
        <div className={classes.queueBox}>
          <h2>Called</h2>
          {visitors.filter((visitor) => visitor.beingCalled === true).length >
          0 ? (
            <ul>
              {visitors
                .filter((visitor) => visitor.beingCalled === true)
                .map((visitor) => (
                  <li key={visitor.id}>{visitor.id}</li>
                ))}
            </ul>
          ) : (
            <p>No one has been called yet</p>
          )}
        </div>

        {consultations.map((consultation, index) => (
          <>
            {visitors.filter(
              (visitor) =>
                visitor.consultation.name === consultation.name &&
                !visitor.beingCalled
            ).length > 0 ? (
              <div key={index} className={classes.queueBox}>
                <h2>{consultation.name}</h2>
                <ul>
                  {visitors
                    .filter(
                      (visitor) =>
                        visitor.consultation.name === consultation.name &&
                        !visitor.beingCalled
                    )
                    .map((visitor) => (
                      <li key={visitor.id}>{visitor.id}</li>
                    ))}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
