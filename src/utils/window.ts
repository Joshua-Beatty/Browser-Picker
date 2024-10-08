import { getAllWindows } from "@tauri-apps/api/window";

async function showWindow() {
  let windows = await getAllWindows();
  console.log(windows)
  for(const window of  windows){
    await window.show();
    await window.setEnabled(true);
    await window.unminimize();
    await window.setAlwaysOnTop(true);
    await window.setFocus();
    await window.center();
    await window.setTitle("Browser Picker")
  }
}

export { showWindow };
