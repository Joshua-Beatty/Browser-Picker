import { invoke } from "@tauri-apps/api/core";

async function registerBrowser() {
  const text = await invoke("install_browser_picker");
  if (typeof text == "string") {
    if (text.includes("Error")) {
      alert(text);
    } else {
    }
  }
}

export { registerBrowser };
