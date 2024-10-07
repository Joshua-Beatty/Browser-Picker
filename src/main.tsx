import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./pages/Root";
import Settings from "./pages/Settings";
import {  HashRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter basename="/">
      <Routes>
      <Route path="/" element={<Root/>}>  </Route> 
      <Route path="/settings"  element={ <Settings/>}> </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);


import { showWindow } from "./utils/window";
import { startTray } from "./utils/tray";
import { registerBrowser } from "./utils/registerBrowser";
import { singleInstanceListen } from "./utils/singleInstance";
let startup = sessionStorage.getItem("startup");
if (!startup) {
  showWindow();
  registerBrowser();
  singleInstanceListen()
  startTray();
  sessionStorage.setItem("startup", "true");
}
