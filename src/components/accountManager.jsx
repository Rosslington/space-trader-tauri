import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components//ui/input";
import { Button } from "@/components//ui/button";

export default function AccountManager() {
    return (
        <>
            <div className="w-80 h-96 bg-zinc-800 rounded border-2 border-zinc-600/15 shadow px-6 py-4">
                <h1 className="font-semibold text-lg">Accounts</h1>
                <div className="flex flex-col mt-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex items-center justify-center h-10 rounded border-dashed border-2 border-zinc-700 cursor-pointer text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors duration-100">
                                <Plus className="w-4 h-4 mr-2" />
                                <p>Add Account</p>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add account</DialogTitle>
                                <DialogDescription>
                                    Add a new account to start your space
                                    trading empire.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                        Link
                                    </Label>
                                    <Input
                                        id="link"
                                        defaultValue="https://ui.shadcn.com/docs/installation"
                                    />
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    );
}
