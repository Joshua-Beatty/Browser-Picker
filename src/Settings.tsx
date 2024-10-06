import { useState } from "react";
import "./App.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";

type Browser = {
    path?: string;
  icon?: string;
  default?: boolean;
  name?: string;
  home?: string;
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
    <div className="container">
      <h1>Settings</h1>

      <textarea
        value={tempSettings}
        onChange={(e) => setTempSettings(e.target.value)}
        rows={20}
        style={{width: "100%"}}
      />

      <button
        onClick={() => {
          try {
            saveSettings(JSON.parse(tempSettings));
            setTempSettings(JSON.stringify(JSON.parse(tempSettings), null, 2));
            setError("");
          } catch (e) {
            setError(`${e}`);
          }
        }}
      >
        Save Settings
      </button>

      <p>{error}</p>
      <Link to="/">Back</Link>
    </div>
  );
}

export default Settings;
export type { Browser }
