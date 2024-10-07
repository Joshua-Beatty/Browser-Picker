import { useState } from "react";
import "./App.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";
import Arrow from "./assets/arrow";

type Browser = {
  path?: string;
  icon?: string;
  default?: boolean;
  name?: string;
  home?: string;
  matches?: string[];
};
function Settings() {
  const [settings, saveSettings] = useLocalStorage("settings", {
    browsers: [],
  } as { browsers: Browser[] });
  const [tempSettings, setTempSettings] = useState(
    JSON.stringify(settings, null, 2)
  );
  const [error, setError] = useState("");

  return (
    <>
      <div style={{ display: "flex" }}>
        <Link className="settingsCog" to="/">
          <Arrow />
        </Link>
      </div>
      <div className="container" style={{ padding: 0 }}>
        <h1 style={{ marginTop: 0 }}>Settings</h1>

        <textarea
          value={tempSettings}
          onChange={(e) => setTempSettings(e.target.value)}
          rows={24}
          style={{ width: "100%" }}
        />

        <button
          style={{
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "70%",
          }}
          onClick={() => {
            try {
              saveSettings(JSON.parse(tempSettings));
              setTempSettings(
                JSON.stringify(JSON.parse(tempSettings), null, 2)
              );
              setError("");
            } catch (e) {
              setError(`${e}`);
            }
          }}
        >
          Save Settings
        </button>

        <p>{error}</p>
      </div>
    </>
  );
}

export default Settings;
export type { Browser };
