// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

mod commands;
use tauri::Emitter;
use std::env;

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
                app.emit("single-instance", SingleInstancePayload { args: argv, cwd }).unwrap();
            })
        )
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(
            tauri::generate_handler![
                commands::system::print,
                commands::system::quit,
                commands::system::check_if_process,
                commands::system::run_shell,
                //commands::browser_registration::uninstall_browser_picker,
                commands::browser_registration::install_browser_picker
            ]
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
