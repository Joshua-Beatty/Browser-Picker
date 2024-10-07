import { getCurrentWindow } from "@tauri-apps/api/window";

function showWindow() {
  let window = getCurrentWindow();
  window.show();
  window.setEnabled(true);
  window.unminimize();
  window.setAlwaysOnTop(true);
  window.setFocus();
  window.center();
  window.setTitle("Browser Picker")
}

export { showWindow };
