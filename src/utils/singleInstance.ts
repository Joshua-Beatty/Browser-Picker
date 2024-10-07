import { listen } from "@tauri-apps/api/event";
import { handlePayload } from "./handleUrls";
function singleInstanceListen(){
    const unlistenSingleInstance = listen<string>("single-instance", (event: any) => {
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
    return unlistenSingleInstance
}
export { singleInstanceListen }