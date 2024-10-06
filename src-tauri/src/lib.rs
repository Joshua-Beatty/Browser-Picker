// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn print(info: &str) {
    println!("{}", info)
}
#[tauri::command]
fn quit() {
    std::process::exit(0x0);
}
use sysinfo::{
    System,
};
use std::{ffi::OsStr, process::Command};
#[tauri::command]
fn check_if_process(process: &str) -> bool {
    let s = System::new_all();
    let an_os_str: &OsStr = OsStr::new(process);
    for _process in s.processes_by_name(an_os_str) {
        return true
    }
    return false
}


#[tauri::command]
fn run_shell(cmd: &str, arg: &str ) {
    let _ = Command::new(cmd)
        .args([arg])
        .spawn();
}



use tauri::Emitter;

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder
        ::default()
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                window.hide().unwrap();
                api.prevent_close();
            }
        })
        .plugin(
            tauri_plugin_single_instance::init(|app, argv, cwd| { 
                println!("{}, {argv:?}, {cwd}", app.package_info().name);
                app.emit("single-instance", Payload { args: argv, cwd }).unwrap();
            })
        )
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![print, quit, check_if_process, run_shell])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

