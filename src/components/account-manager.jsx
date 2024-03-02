import { useEffect, useState } from "react";
import AccountListing from "./account-listing";
import AccountRegistration from "./account-registration";

export default function AccountManager() {
    const [accounts, setAccounts] = useState([]);

    // On Mount
    useEffect(() => {
        setAccounts(
            localStorage.getItem("accounts")
                ? JSON.parse(localStorage.getItem("accounts"))
                : []
        );
    }, []);

    return (
        <>
            <div className="w-80 h-96 bg-zinc-800 rounded border-2 border-zinc-600/15 shadow px-6 py-4">
                <h1 className="font-semibold text-lg">Accounts</h1>
                <div className="flex flex-col mt-2 space-y-3">
                    {accounts.length > 0 &&
                        accounts.map((el, index) => (
                            <AccountListing account={el} key={index} />
                        ))}
                    <AccountRegistration />
                </div>
            </div>
        </>
    );
}
