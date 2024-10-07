import { getAllWindows } from "@tauri-apps/api/window";

async function showWindow() {
  let windows = await getAllWindows();
  for(const window of  windows){
    window.show();
    window.setEnabled(true);
    window.unminimize();
    window.setAlwaysOnTop(true);
    window.setFocus();
    window.center();
    window.setTitle("Browser Picker")
  }
}

export { showWindow };
