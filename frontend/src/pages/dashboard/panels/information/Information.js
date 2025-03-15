import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

import { get, set, useDatabase } from "../../../../database/database";
import { information } from "../../../test/Test";
import { Button } from "../../../../components";

import "react-quill/dist/quill.snow.css";
import classes from "./Information.module.scss";

export default function InformationPanel() {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("en");

  useDatabase(
    () =>
      get("information/en", false)
        .then((response) => setValue(response.content || ""))
        .catch((error) => console.error(error)),
    -1 // call just once
  );

  return (
    <>
      <div className={classes.buttons}>
        <Button
          text="en"
          selected={language === "en"}
          onClick={() => {
            setLanguage("en");
            get("information/en", false)
              .then((response) => setValue(response.content || ""))
              .catch((error) => console.error(error));
          }}
        />
        <Button
          text="de"
          selected={language === "de"}
          onClick={() => {
            setLanguage("de");
            get("information/de", false)
              .then((response) => setValue(response.content || ""))
              .catch((error) => console.error(error));
          }}
        />
        <Button
          text="save"
          selected={false}
          onClick={() =>
            set("information/" + language, { content: value })
              .then(() => alert("Changes are saved."))
              .catch((error) => console.error(error))
          }
        />
        <Button
          text="default"
          selected={false}
          onClick={() =>
            set("information/" + language, { content: information })
              .then(() =>
                get("information/" + language).then((response) =>
                  setValue(response.content)
                )
              )
              .catch((error) => console.error(error))
          }
        />
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{
          toolbar: [
            [{ header: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            [{ color: [] }],
            [{ background: [] }],
          ],
        }}
      />
    </>
  );
}
