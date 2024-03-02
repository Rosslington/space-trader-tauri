import { CircleUserRound, Loader2 } from "lucide-react";
import { globalState as globalAtom } from "@/stores/global";
import { useAtom } from "jotai";
import { useState } from "react";

export default function AccountListing({ account }) {
    const [globalState, setGlobalState] = useAtom(globalAtom);
    const [isLoading, setIsLoading] = useState(false);

    function setAccount() {
        if (isLoading) return;
        setIsLoading(true);
        // Get agent data
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${account.token}`
            }
        };

        fetch("https://api.spacetraders.io/v2/my/agent", options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response?.error) return;
                account.accountData = response.data;

                setGlobalState(account);
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div
            onClick={setAccount}
            className="flex h-10 justify-between items-center px-2 bg-zinc-600/50 rounded border-2 border-zinc-500/15 shadow cursor-pointer hover:bg-zinc-600/80 transition-colors duration-100 group"
        >
            {isLoading ? (
                <Loader2
                    strokeWidth={3}
                    className="w-6 h-6 text-primary animate-spin"
                />
            ) : (
                <CircleUserRound className="w-6 h-6 text-zinc-500 group-hover:text-primary duration-100 transition-colors" />
            )}
            <p className="font-medium text-zinc-300 group-hover:text-white duration-100 transition-colors">
                {account.username}
            </p>
        </div>
    );
}
