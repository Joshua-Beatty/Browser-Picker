import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { showWindow } from "./window";
import { Browser } from "./data";

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
  const link = args[1];
  console.log(`Handling Link: ${link}`);
  localStorage.setItem("url", link);
  const settings = JSON.parse(localStorage.getItem("settings") || "{}") as {
    browsers: Browser[];
  };

  let nonDefaultOpen = false;
  for (const browser of settings.browsers) {
    if (browser.matches) {
      for (const pattern of browser.matches) {
        const re = new RegExp(pattern);
        if (link && re.test(link)) {
          return handleBrowser(browser.path, browser.home);
        }
      }
    }
    let isOpen = false;
    if (browser.name)
      isOpen = await invoke("check_if_process", { process: browser.name });
    if (isOpen && !browser.default) nonDefaultOpen = true;
  }
  if (nonDefaultOpen == false) {
    for (const browser of settings.browsers) {
      if (browser.default) return handleBrowser(browser.path, browser.home);
    }
  }
  const urlToOpen = localStorage.getItem("url");
  console.log(`Showing window so user can chose to handle url: ${urlToOpen}`)
  await showWindow();
  window.location.href = "/";
}
async function handleBrowser(path?: string, homePage?: string) {
  const urlToOpen = localStorage.getItem("url");
  const options = { cmd: path, arg: urlToOpen || homePage || "" };
  console.log(options);
  console.log("url: " + urlToOpen);
  await invoke("run_shell", options);
  localStorage.setItem("url", "");
  getCurrentWindow().hide();
}

export { handlePayload, handleBrowser, handleTestPayload };
