import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Root from "./pages/Root";
import Settings from "./pages/Settings";
import { HashRouter, Route, Routes } from "react-router-dom";

import { showWindow } from "./utils/window";
import { startTray } from "./utils/tray";
import { registerBrowser } from "./utils/registerBrowser";
import { singleInstanceListen } from "./utils/singleInstance";

let didInit = false;
function BuildRouter() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      showWindow();
      registerBrowser();
      const unlisten = singleInstanceListen();
      const tray = startTray();
      return () => {
        (async () => {
          (await unlisten)();
          (await tray).close();
        })();
      };
    }
  }, []);

  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<Root />}>
          {" "}
        </Route>
        <Route path="/settings" element={<Settings />}>
          {" "}
        </Route>
      </Routes>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BuildRouter />
  </React.StrictMode>
);

// let startup = sessionStorage.getItem("startup");
// if (!startup) {
//   sessionStorage.setItem("startup", "true");
// }
