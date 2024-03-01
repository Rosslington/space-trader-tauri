// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use steamworks::Client;
use steamworks::FriendFlags;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    println!("hello there! {name}");
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_steam_id(client: tauri::State<steamworks::Client>) -> String { // > We need string, because Steam IDs are too big for js Number type
    client.user().steam_id().raw().to_string()
}

fn main() {
    let (client, _single) = Client::init().unwrap();

    let friends = client.friends();
    println!("Friends");
    let list = friends.get_friends(FriendFlags::IMMEDIATE);
    println!("{:?}", list);
    for f in &list {
        println!("Friend: {:?} - {}({:?})", f.id(), f.name(), f.state());
        friends.request_user_information(f.id(), true);
    }

    tauri::Builder::default()
        .manage(client)
        .invoke_handler(tauri::generate_handler![greet, get_steam_id])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
