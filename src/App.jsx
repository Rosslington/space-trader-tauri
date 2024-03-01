import { useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { toast } from "sonner";

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");
    const nameInput = useRef(null);

    // async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //     setGreetMsg(await invoke("greet", { name }));
    // }

    function submitName(e) {
        e?.preventDefault();

        // Register agent
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                symbol: name,
                faction: "COSMIC"
            })
        };

        fetch("https://api.spacetraders.io/v2/register", options)
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center space-y-4">
            <h1 className="font-bold text-2xl">Welcome to Tauri!</h1>
            <form className="flex space-x-2" onSubmit={submitName}>
                <Input
                    ref={nameInput}
                    onChange={(e) => setName(e.currentTarget.value)}
                    placeholder="Enter a player name..."
                />
                <Button type="submit">Register</Button>
            </form>
            <p>{greetMsg}</p>
            <Button
                onClick={async () => {
                    let id = await invoke("get_steam_id");
                    toast(`Steam ID: ${id}`);
                }}
            >
                Toast
            </Button>
        </div>
    );
}

export default App;
