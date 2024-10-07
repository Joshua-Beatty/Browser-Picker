import { invoke } from "@tauri-apps/api/core";
import { showWindow } from "./window";
import { TrayIcon, TrayIconEvent } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";

async function startTray() {
  const data = await (await fetch("/icon.png")).arrayBuffer();
  await clearTrays();
  const menu = await getMenu();

  return await TrayIcon.new({
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
