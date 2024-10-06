# Browser Picker

This is a Tauri application which opens up a menu to let a user pick which browser to open a link in. It will default to the default browser unless once of the other browsers is open, at which point it will ask the user to choose.


## Install
Clone this repo then run the following commands:
```bash
npm install
npm tauri build
```
Then install the built msi file. At this point you need to register the installed exe to the system to be able to select it as your default browser, do this using the included script(At some point this will be moved to be a part of the program):
```bash
register_browser.bat install BrowserPicker "C:\Program Files\browser-picker\browser-picker.exe %1"
```

Make sure that the path lines up for where you installed browser picker.

#### Unregister browser picker
If you need to remove the registry changes run the following command
```bash
register_browser.bat uninstall BrowserPicker
```

## Settings
The settings should be in the following format:
```json
{
  "browsers": [
    {
      "default": true,
      "path": "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
      "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/1971px-Firefox_logo%2C_2019.svg.png",
      "name": "firefox",
      "home": "about:home"
    },
    {
      "path": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/480px-Google_Chrome_icon_%28February_2022%29.svg.png",
      "name": "chrome",
      "home": "https://google.com"
    }
  ]
}
```
Default specifies if that this brower will be opened if the others are not running, have only one marked as running. The Path is the executable to the browser to launch, and the icon is a link to an icon to display. Home is the default home page to open if coming from browser picker directly and not a link event. name is the process name to search for when trying to decide if a non default browser is open and if the user should be prompted to chose a browser.


## Development
Clone this repo then run the following commands:
```bash
npm install
npm run tauri dev
```

#### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)