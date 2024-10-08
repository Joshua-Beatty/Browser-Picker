// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

mod commands;
use tauri::{
    menu::{ Menu, MenuItem },
    tray::{ MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent },
    Emitter,
    Manager,
};
use std::{env, thread::sleep, time::Duration};

#[derive(Clone, serde::Serialize)]
struct SingleInstancePayload {
    args: Vec<String>,
    cwd: String,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder
        ::default()
        .on_window_event(|window, event| {
            //Prevent the application from exiting when the window is closed
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                window.hide().unwrap();
                api.prevent_close();
            }
        })
        .plugin(
            tauri_plugin_single_instance::init(|app, argv, cwd| {
                println!("New Instance Opened: {}, {argv:?}, {cwd}", app.package_info().name);

                // Emit the first event
                app.emit("single-instance", SingleInstancePayload {
                    args: argv.clone(),
                    cwd: cwd.clone(),
                }).unwrap();

            })
        )
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            // Creating a quit menu item
            let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            // Creating a menu with the quit item
            let menu = Menu::with_items(app, &[&quit_i])?;

            // Building the tray icon with the menu
            let _tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .menu_on_left_click(false)
                .on_tray_icon_event(|tray, event| {
                    match event {
                        TrayIconEvent::Click {
                            button: MouseButton::Left,
                            button_state: MouseButtonState::Up,
                            ..
                        } => {
                            println!("left click pressed and released on tray icon");
                            // Handle tray icon click
                            let app = tray.app_handle();
                            if let Some(window) = app.get_webview_window("main") {
                                let _ = window.show();
                                let _ = window.set_focus();
                                let _ = window.unminimize();
                                let _ = window.center();
                            }
                        }
                        _ => {
                            println!("unhandled event {event:?}");
                        }
                    }
                })
                .on_menu_event(|_app, event| {
                    match event.id.as_ref() {
                        "quit" => {
                            println!("quit menu item was clicked");
                            std::process::exit(0x0);
                        }
                        _ => {
                            println!("menu item not handled");
                        }
                    }
                })
                .build(app)?; // Ensure `build` returns a `Result`

            Ok(())
        })
        .invoke_handler(
            tauri::generate_handler![
                commands::system::print,
                commands::system::quit,
                commands::system::check_if_process,
                commands::system::run_shell,
                commands::system::first_time_called,
                //commands::browser_registration::uninstall_browser_picker,
                commands::browser_registration::install_browser_picker
            ]
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
