import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Settings from "./Settings";
import { TrayIcon, TrayIconEvent } from "@tauri-apps/api/tray";

import {  HashRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    
    <HashRouter basename="/">
      <Routes>
      <Route path="/" element={<App/>}>  </Route> 
      <Route path="/settings"  element={ <Settings/>}> </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

import { invoke } from "@tauri-apps/api/core";
import { Menu } from "@tauri-apps/api/menu";
import { getCurrentWindow } from "@tauri-apps/api/window";

getCurrentWindow().show();
getCurrentWindow().setAlwaysOnTop(true);
getCurrentWindow().center();

fetch("/tauri.png")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.arrayBuffer(); // Get the raw bytes as an ArrayBuffer
  })
  .then(async (data) => {
    try {
      let tray = await TrayIcon.getById("main-id");
      while (tray) {
        await TrayIcon.removeById("main-id");
        tray = await TrayIcon.getById("main-id");
      }
    } catch (_e) {
      console.log(_e);
    }

    const menu = await Menu.new({
      items: [
        {
          id: "quit",
          text: "Quit",
          action: () => {
            invoke("quit");
            console.log("quit pressed");
          },
        },
      ],
    });

    await TrayIcon.new({
      id: "main-id",
      menuOnLeftClick: false,
      icon: new Uint8Array(data),
      menu,
      action: async (event: TrayIconEvent) => {
        if (
          event.type == "Click" &&
          event.button == "Left" &&
          event?.buttonState == "Down"
        ) {
          let window = getCurrentWindow();
          window.show();
          window.setEnabled(true);
          window.unminimize();
          window.setAlwaysOnTop(true);
          window.setFocus();
          window.center();

          await invoke("print", { info: JSON.stringify(event) });
          console.log(event);
        }
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching the image:", error);
  });

import { listen } from "@tauri-apps/api/event";
import { handlePayload } from "./handleUrls";
listen<string>("single-instance", (event: any) => {
  console.log(`Got payload:`);
  console.log(event);
  if (
    Array.isArray(event.payload?.args) &&
    typeof event.payload?.cwd == "string"
  ) {
    handlePayload(event.payload);
  } else {
    console.log("Bad Event!");
  }
});

localStorage.setItem("url", "");