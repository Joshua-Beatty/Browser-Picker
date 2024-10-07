# Browser Picker

This is a Tauri application which opens up a menu to let a user pick which browser to open a link in. It will default to the default browser unless once of the other browsers is open, at which point it will ask the user to choose.

## Install
Download the msi in releases and install Browser Picker.

Then go into windows settings and choose Browser Picker as your default browser. 

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
      "home": "https://google.com",
      "matches": [
        ".+twitter.+"
      ]
    }
  ]
}
```
Default specifies that this browser will be opened if the others are not running, have only one marked as default. 

Path is the executable of the browser to launch

Icon is a link to an icon to display. 

Home is the default home page to open if coming from browser picker directly and not a link event. 

Name is the process name to search for when trying to decide if a non default browser is open and if the user should be prompted to chose a browser.

Matches is an array of regular expressions, that are tested against the URL, if any of them match that browser is used to open the link, this is checked before the default browser check.


## Development
Clone this repo then run the following commands:
```bash
npm install
npm run tauri dev
```

#### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
