import { useState } from "react";
import { Button, Input } from "../../components";
import { useDatabase, get, set, remove, push } from "../../database/database";
import classes from "./Test.module.scss";

function test1() {
  console.log("test1 start");
  get("consultations")
    .then((response) => console.log("get:consultations Success:", response))
    .catch((error) => console.error("get:consultations Error:", error));

  get("consultation/events")
    .then((response) =>
      console.log("get:consultation/events Success:", response)
    )
    .catch((error) => console.error("get:consultation/events Error:", error));

  get("visitors")
    .then((response) => console.log("get:visitors Success:", response))
    .catch((error) => console.error("get:visitors Error:", error));

  get("employees")
    .then((response) => console.log("get:employees Success:", response))
    .catch((error) => console.error("get:employees Error:", error));
  console.log("test1 end");
}

function test2() {
  console.log("test2 start");
  get("consultations")
    .then((response) => {
      console.log("get:consultations Success:", response);
      push("consultation/events", {
        consultation: response[0],
        startDate: new Date().valueOf(),
        endDate: new Date().valueOf(),
        repeat: "no",
        isCanceled: false,
        reason: "cuz i wanna",
      })
        .then((r) => console.log("push:consultation/events Success:", r))
        .catch((e) => console.error("push Error:", e));
    })
    .catch((error) => console.error("get:consultations Error:", error));
  console.log("test2 end");
}

function test3() {
  console.log("test3 start");
  get("consultation/events")
    .then((response) => {
      console.log("get:consultation/events Success:", response);
      set("consultation/events/" + response[0].id, {
        ...response[0],
        startDate: new Date().valueOf(),
        endDate: new Date().valueOf(),
        repeat: "no",
        isCanceled: true,
        reason: "ahh obiwan kenobi",
      })
        .then((r) => console.log("set:consultation/events Success:", r))
        .catch((e) => console.error("set:consultation/events Error:", e));
    })
    .catch((error) => console.error("teg:consultation/events Error:", error));
  console.log("test3 end");
}

function deleteConsultation(ref) {
  remove(ref)
    .then(() => console.log("Consultation hour deleted successfully!"))
    .catch((error) =>
      console.error("Error deleting consultation hour: ", error)
    );
}

function deleteVisitor(ref) {
  remove(ref)
    .then(() => console.log("Visitor deleted successfully!"))
    .catch((error) =>
      console.error("Error deleting consultation hour: ", error)
    );
}

function signUp() {
  push("auth/signup", {
    username: "admin",
    password: "admin",
  })
    .then((response) => console.log("signUp Success:", response))
    .catch((error) => console.error("signUp Error:", error));
}

const consultations = [
  {
    name: "Zulassung International",
    description:
      "Assistance for international students with admission processes.",
    shortVersion: "ZI",
    color: "#005AA9",
  },
  {
    name: "Studienvorbereitung",
    description: "Guidance on preparatory courses for your studies.",
    shortVersion: "Stvor",
    color: "#0083CC",
  },
  {
    name: "Welcome Centre",
    description: "Information and support for newly arrived students.",
    shortVersion: "WelCe",
    color: "#009D81",
  },
  {
    name: "Wohnraumservice",
    description: "Help with finding accommodations and housing services.",
    shortVersion: "WRS",
    color: "#99C000",
  },
  {
    name: "Austausch/Erasmus Incomings",
    description: "Support for incoming exchange/Erasmus students.",
    shortVersion: "IN",
    color: "#C9D400",
  },
  {
    name: "Austausch/Erasmus Outgoings",
    description: "Guidance for outgoing exchange/Erasmus students.",
    shortVersion: "OUT",
    color: "#FDCA00",
  },
  {
    name: "International Student Services",
    description: "Comprehensive support for international students.",
    shortVersion: "ISS",
    color: "#F5A300",
  },
  {
    name: "Zentrale Koordinierungsstelle für Flüchtlingsintegration",
    description: "Integration support for refugee students.",
    shortVersion: "ZKF",
    color: "#EC6500",
  },
  {
    name: "Krankenkasse",
    description: "Help with health insurance and related topics.",
    shortVersion: "KV",
    color: "#E6001A",
  },

  {
    name: "Info Counter International Student Services",
    description: "",
    shortVersion: "ISS_I",
    color: "#A60084",
  },
  {
    name: "Info Counter Zulassung International",
    description: "",
    shortVersion: "ZL_I",
    color: "#721085",
  },
  {
    name: "Info Counter Austausch/Erasmus",
    description: "",
    shortVersion: "EXC_I",
    color: "#721085",
  },
];

export const information =
  '<h3>Counter Internationales</h3><p>Der Counter Internationales ist die erste Anlaufstelle für <strong>allgemeine Fragen</strong>. Wir sind online per Videocall und Chat erreichbar wie auch in Präsenz im karo 5 und im HMZ auf dem Campus Lichtwiese.</p><h4>Im karo 5 und online per Videochat</h4><ul><li>Mo, <strong>14-16:00 Uhr</strong> (MEZ)</li><li>Di bis Fr <strong>10- 12:00 Uhr</strong> (MEZ)</li></ul><p><a href="https://tu-darmstadt.zoom-x.de/j/68621415635?pwd=MkJ5Q3ltQURJRXAvYkQ3Z1VkeGtwUT09">Link für den Online-Counter.</a><br />Meetingpasswort: <strong>Counter</strong><br />Besucheradresse: <a href="https://www.sight-board.de/tu-darmstadt/?table=obj_tu_building&amp;fid=1101#">S1|01, karo 5, Karolinenpl. 5, 64289 Darmstadt</a></p><p><strong>Beratung zur Krankenversicherung am Counter</strong></p<p>Kläre alles rund um die deutsche gesetzliche Krankenversicherungwährend unserer speziellen Beratung </p><ul><li>Mo:<strong>14 – 16:00 Uhr</strong>- in Präsenz</li><li>Mi:<strong>10 – 12:00 Uhr </strong>- in Präsenz (bis 30. Oktober)</li></ul><h4>HMZ Lichtwiese – Mobiler ISS Counter</h4><p>  <strong>Wintersemester 24/25 –</strong>  <strong>    <em> Mittwoch 09:30-11:30</em>  </strong></p><p>  Oktober: 16., 23. & 30.  <br />  November: 6., 13., 20. & 27.  <br />  Dezember: 4. & 18.  <br />  Januar: 15., 22. & 29.  <br />  Februar: 5.</p><p>  Besucheradresse:   <a href="https://www.tu-darmstadt.de/universitaet/campus/lichtwiese_2/index.de.jsp#absatz_3">    L4|02 Foyer, Franziska-Braun-Straße 10, 64287 Darmstadt  </a>  <br /></p><h4>  <strong>Counter Chat</strong></h4><p>  Wenn du eine schnelle Antwort brauchst,   <a    href="https://tu-darmstadt.zoom-x.de/j/66144227264?pwd=OWRCaWZjbmNPcUd2Mm9mZS85RGQzUT09"    target="_blank"    rel="noopener"  >    kontaktiere uns über den Counter Chat (wird in neuem Tab geöffnet).  </a></p><ul>  <li>    <strong>Di, 13-15:00 Uhr (MEZ)</strong>  </li></ul><p>  Meetingpasswort für den Counter Chat:  <strong>Chat</strong>  <br />  Lass bitte deine Kamera und Mikrofon ausgeschaltet und nutze die  F&A-Funktion.</p>';

export function addConsultations() {
  consultations.forEach((consultation) =>
    push("consultations", consultation)
      //.then((response) => console.log("addConsultations Success:", response))
      .catch((error) => console.error("Add Consultations Error:", error))
  );
}

export default function TestPage() {
  const [input, setInput] = useState("");

  // calls Database periodically
  useDatabase(() => {
    get("consultations")
      .then((response) => console.log("Database connection Succes:", response))
      .catch((error) => console.error("Database connection Error:", error));
  });

  return (
    <div className={classes.page}>
      <Input
        text="database reference"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        <Button text="test 1" onClick={test1} />
        <Button text="test 2" onClick={test2} />
        <Button text="test 3" onClick={test3} />
        <Button
          text="Del Consultation"
          onClick={() => deleteConsultation(input)}
        />
        <Button text="Del Visitor" onClick={() => deleteVisitor(input)} />
        <Button text="Sign Up" onClick={signUp} />
        <Button
          text="Add Default Consultation Hours"
          onClick={addConsultations}
        />
      </div>
    </div>
  );
}
