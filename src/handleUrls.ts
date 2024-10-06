const examplePayload = {
  args: [
    "C:\\Program Files\\browser-picker\\browser-picker.exe",
    "https://stackoverflow.com/questions/46174517/how-to-set-program-exe-as-a-default-browser-in-windows-10",
  ],
  cwd: "C:\\Users\\joshu\\AppData\\Local\\Discord\\app-1.0.9164",
};
function handleTestPayload() {
  handlePayload(examplePayload);
}

async function handlePayload({ args, cwd }: { args: string[]; cwd: string }) {
  console.log({ args, cwd });
  if (args.length <= 1) return;
  console.log(`Handling Link: ${args[1]}`);
  localStorage.setItem("url", args[1]);
  const settings = JSON.parse(localStorage.getItem("settings") || "{}") as { browsers: Browser[] };
  
  let nonDefaultOpen = false
  for(const browser of settings.browsers){
    const isOpen = await invoke("check_if_process", { process: browser.name});
    if(isOpen && !browser.default)
        nonDefaultOpen = true
  }
  if(!nonDefaultOpen){
    for(const browser of settings.browsers){
      if(browser.default)
        return handleBrowser(browser.path, browser.home)
    }
  }
  let window = getCurrentWindow();
  window.show();
  window.setEnabled(true);
  window.unminimize();
  window.setAlwaysOnTop(true);
  window.setFocus();
  window.center();
}
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Browser } from "./Settings";
async function handleBrowser(path?: string, homePage?: string) {
    const urlToOpen = localStorage.getItem("url");
    const options = { cmd: path, arg: urlToOpen || homePage || "" }
    console.log(options)
    await invoke("run_shell", options);
    localStorage.setItem("url", "");
    getCurrentWindow().hide();


}
export { handlePayload, handleBrowser, handleTestPayload };
