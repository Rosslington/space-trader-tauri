import { useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import AccountManager from "./components/accountManager";

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [agentToken, setAgentToken] = useState("");
    const [name, setName] = useState("");
    const nameInput = useRef(null);

    // async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //     setGreetMsg(await invoke("greet", { name }));
    // }

    function signUp() {
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
            .then((response) => {
                console.log(response);
                setAgentToken(response.data.token);
            })
            .catch((err) => console.error(err));
    }

    // Rosslington token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUk9TU0xJTkdUT04xMjMiLCJ2ZXJzaW9uIjoidjIuMS41IiwicmVzZXRfZGF0ZSI6IjIwMjQtMDItMjUiLCJpYXQiOjE3MDkzMDY0NjEsInN1YiI6ImFnZW50LXRva2VuIn0.VqvGs3vlNVNAE4og1GCb0kbOJkybrEzezjkN1J4rQWus1IyxCUJtxe6ojyuAwIfXoVqAuOw6Nz_YJyDd0cjIHAiYjcHEqyGV74_pdT_VzFfYjN5His-EX0RKnfkAil63qmyO5WPo22KgeI302zwUgRgOyMng0JVj192QO8FdVmDHMJ2SoSvTGiOVTa44CZV4sptvis9zPQgEqVjU_NNj_-GnpI2wLgdrOVrCYmF5ZACLf1Wu931iqFUCDZ7kfWYXgK8HCk7NcM69Uxl5NybvR3iiUDYqrgJ1PAT4WoDf_JB05Iy1u4EfIY3co48V8Ut4Cg3zIa0a7-j1bwu3z1Sm3g
    function logIn() {
        // Log in
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${agentToken}`
            }
        };

        fetch("https://api.spacetraders.io/v2/my/agent", options)
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-zinc-900">
            {/* <h1 className="font-bold text-2xl">Welcome to Tauri!</h1>
            <div className="flex space-x-2">
                <Input
                    ref={nameInput}
                    onChange={(e) => setName(e.currentTarget.value)}
                    placeholder="Enter a player name..."
                />
                <Button onClick={signUp}>Sign up</Button>
                <Button onClick={logIn}>Log in</Button>
            </div> */}
            {/* <p>{greetMsg}</p>
            <Button
                onClick={async () => {
                    let id = await invoke("get_steam_id");
                    toast(`Steam ID: ${id}`);
                }}
            >
                Toast
            </Button> */}

            <AccountManager />
        </div>
    );
}

export default App;
