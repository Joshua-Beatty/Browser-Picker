use sysinfo::{ System };
use std::{ ffi::OsStr, process::Command };

#[tauri::command]
pub fn print(info: &str) {
    println!("{}", info)
}
#[tauri::command]
pub fn quit() {
    std::process::exit(0x0);
}
#[tauri::command]
pub fn check_if_process(process: &str) -> bool {
    let s = System::new_all();
    let an_os_str: &OsStr = OsStr::new(process);
    for _process in s.processes_by_name(an_os_str) {
        return true;
    }
    return false;
}

#[tauri::command]
pub fn run_shell(cmd: &str, arg: &str) {
    let _ = Command::new(cmd).args([arg]).spawn();
}

#[tauri::command]
pub fn first_time_called() -> bool {
    // Static mutable variable to store whether the command has been called before
    static mut FIRST_CALL: bool = true;
    
    // Use unsafe block to modify the static mutable variable
    unsafe {
        if FIRST_CALL {
            FIRST_CALL = false;
            return true; // First time it's called
        } else {
            return false; // Subsequent calls
        }
    }
}