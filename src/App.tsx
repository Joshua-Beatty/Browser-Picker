import "./App.css";
import { handleBrowser} from "./handleUrls";
import { Link } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Browser } from "./Settings";

function App() {
  // const [txt, setTxt] = useState("");
  const [settings, _saveSettings] = useLocalStorage("settings", {
    browsers: [],
  } as { browsers: Browser[] });

  return (
    <div className="container">
      <h1>Choose A Browser To Launch</h1>

      <div className="row">
        {settings.browsers.map((b: Browser) => (
          <>
            <button style={{margin: "10px"}} onClick={()=>{handleBrowser(b.path || "", b.home || "")}}>
              <img src={b.icon} width={"150px"} />
            </button>
          </>
        ))}
      </div>
      
      <Link to="/settings">Settings</Link>

      {/* <p>{greetMsg}</p> */}
    </div>
  );
}

export default App;
