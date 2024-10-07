#![allow(dead_code)]
use winapi::um::winbase::CREATE_NO_WINDOW;
use std::{env, os::windows::process::CommandExt, process::Command};

#[tauri::command]
pub fn install_browser_picker() -> String {
    match env::current_exe() {
        Ok(exe_path) => {
            println!("Path of this executable is: {}", exe_path.display());
            let commands = vec![
                // Add Registered Application
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\RegisteredApplications",
                            "/v",
                            "BrowserPicker",
                            "/t",
                            "REG_SZ",
                            "/d",
                            "Software\\Clients\\StartMenuInternet\\BrowserPicker\\Capabilities",
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                },
                // Add StartMenuInternet entry
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\BrowserPicker",
                            "/t",
                            "REG_SZ",
                            "/d",
                            "BrowserPicker",
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                },
                // Add Capabilities entries
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\BrowserPicker\\Capabilities",
                            "/v",
                            "ApplicationDescription",
                            "/t",
                            "REG_SZ",
                            "/d",
                            "BrowserPicker",
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                },
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\BrowserPicker\\Capabilities",
                            "/v",
                            "ApplicationIcon",
                            "/t",
                            "REG_SZ",
                            "/d",
                            &(exe_path.display().to_string()),
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                },
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\BrowserPicker\\Capabilities",
                            "/v",
                            "ApplicationName",
                            "/t",
                            "REG_SZ",
                            "/d",
                            "BrowserPicker",
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                },
                // Add File Associations
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\BrowserPicker\\Capabilities\\FileAssociations",
                            "/v",
                            ".htm",
                            "/t",
                            "REG_SZ",
                            "/d",
                            "BrowserPickerHTM",
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                },
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\BrowserPicker\\Capabilities\\FileAssociations",
                            "/v",
                            ".html",
                            "/t",
                            "REG_SZ",
                            "/d",
                            "BrowserPickerHTM",
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                },
                // Add URL Associations
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\BrowserPicker\\Capabilities\\URLAssociations",
                            "/v",
                            "http",
                            "/t",
                            "REG_SZ",
                            "/d",
                            "BrowserPickerHTM",
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                },
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\BrowserPicker\\Capabilities\\URLAssociations",
                            "/v",
                            "https",
                            "/t",
                            "REG_SZ",
                            "/d",
                            "BrowserPickerHTM",
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                },
                // Add command for opening
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\BrowserPicker\\shell\\open\\command",
                            "/t",
                            "REG_SZ",
                            "/d",
                            &(exe_path.display().to_string() + " %1"),
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                },
                // Add HTM class
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\Classes\\BrowserPickerHTM",
                            "/t",
                            "REG_SZ",
                            "/d",
                            "BrowserPicker Handler",
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                },
                {
                    let mut cmd = Command::new("reg");
                    cmd.args(
                        &[
                            "add",
                            "HKCU\\SOFTWARE\\Classes\\BrowserPickerHTM\\shell\\open\\command",
                            "/t",
                            "REG_SZ",
                            "/d",
                            &(exe_path.display().to_string() + " %1"),
                            "/f",
                        ]
                    );
                    cmd.creation_flags(CREATE_NO_WINDOW);
                    cmd
                }
            ];

            for mut command in commands {
                match command.output() {
                    Ok(output) => {
                        println!("{}", String::from_utf8_lossy(&output.stdout));
                        println!("{}", String::from_utf8_lossy(&output.stderr));
                    }
                    Err(e) => {
                        eprintln!("Failed to execute command: {}", e);
                        return ("Error failed to register browser picker: ".to_owned() + &e.to_string()).to_string();
                    }
                }
            }
            return "Registered Browser Picker".to_string();
        }
        Err(e) => {
            println!("failed to get current exe path: {e}");
            return "failed to get current exe path".to_string();
        }
    }
}

#[tauri::command]
pub fn uninstall_browser_picker() -> String {
    let commands = vec![
        // Delete Registered Application
        {
            let mut cmd = Command::new("reg");
            cmd.args(
                &["delete", "HKCU\\SOFTWARE\\RegisteredApplications", "/v", "BrowserPicker", "/f"]
            );
            cmd
        },
        // Delete StartMenuInternet entry
        {
            let mut cmd = Command::new("reg");
            cmd.args(
                &["delete", "HKCU\\SOFTWARE\\Clients\\StartMenuInternet\\BrowserPicker", "/f"]
            );
            cmd
        },
        // Delete HTM class
        {
            let mut cmd = Command::new("reg");
            cmd.args(&["delete", "HKCU\\SOFTWARE\\Classes\\BrowserPickerHTM", "/f"]);
            cmd
        }
    ];

    for mut command in commands {
        match command.output() {
            Ok(output) => {
                println!("{}", String::from_utf8_lossy(&output.stdout));
                println!("{}", String::from_utf8_lossy(&output.stderr));
            }
            Err(e) => {
                eprintln!("Failed to execute command: {}", e);
                return ("Error: ".to_owned() + &e.to_string()).to_string();
            }
        }
    }
    return "Deregistered Browser Picker".to_string();
}