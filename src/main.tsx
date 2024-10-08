import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Root from "./pages/Root";
import Settings from "./pages/Settings";
import { HashRouter, Route, Routes } from "react-router-dom";

import { showWindow } from "./utils/window";
import { registerBrowser } from "./utils/registerBrowser";
import { singleInstanceListen } from "./utils/singleInstance";
import { invoke } from "@tauri-apps/api/core";

function BuildRouter() {
  useEffect(() => {
    singleInstanceListen();
    async function init() {
      const first = await invoke("first_time_called");
      if (first) {
        showWindow();
        registerBrowser();
      }
    }
    init();
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