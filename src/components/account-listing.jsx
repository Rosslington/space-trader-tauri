import { CircleUserRound } from "lucide-react";

export default function AccountListing({ account }) {
    return (
        <div className="flex h-10 justify-between items-center px-2 bg-zinc-600/50 rounded border-2 border-zinc-500/10 shadow cursor-pointer hover:bg-zinc-600/80 transition-colors duration-100 group">
            <CircleUserRound className="w-6 h-6 text-zinc-500 group-hover:text-primary" />
            <p className="font-medium text-zinc-200 group-hover:text-white">
                {account.username}
            </p>
        </div>
    );
}
