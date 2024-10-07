import { invoke } from "@tauri-apps/api/core";
import { showWindow } from "./window";
import { TrayIcon, TrayIconEvent } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";

function startTray() {
  fetch("/icon.png")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.arrayBuffer();
    })
    .then(async (data) => {
      await clearTrays();
      const menu = await getMenu();
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
            showWindow();
            await invoke("print", { info: JSON.stringify(event) });
            console.log(event);
          }
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching the image:", error);
    });
}

async function getMenu() {
  return await Menu.new({
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
}

async function clearTrays() {
  try {
    let tray = await TrayIcon.getById("main-id");
    while (tray) {
      await TrayIcon.removeById("main-id");
      tray = await TrayIcon.getById("main-id");
    }
  } catch (_e) {
    console.log(_e);
  }
}
export { startTray };
