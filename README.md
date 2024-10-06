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

## Development
Clone this repo then run the following commands:
```bash
npm install
npm run tauri dev
```

#### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
