import { Loader2, Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function AccountRegistration() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const formSchema = z.object({
        username: z.string().min(3).max(14)
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: ""
        }
    });

    async function registerAccount(values) {
        setIsLoading(true);
        // Register agent
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                symbol: values.username,
                faction: "COSMIC"
            })
        };

        fetch("https://api.spacetraders.io/v2/register", options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response?.error) {
                    switch (response.error.code) {
                        case 4111:
                            form.setError("username", {
                                type: "manual",
                                message: "Username is already taken."
                            });
                            break;

                        default:
                            form.setError("username", {
                                type: "manual",
                                message: response.error.message
                            });
                            break;
                    }
                }

                // Save account
                let accounts = JSON.parse(localStorage.getItem("accounts"));
                if (!accounts) accounts = [];
                accounts.push({
                    username: values.username,
                    token: response.data.token
                });
                localStorage.setItem("accounts", JSON.stringify(accounts));
                setIsOpen(false);
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            <div
                onClick={() => {
                    setIsOpen(true);
                }}
                className="flex items-center justify-center h-10 rounded border-dashed border-2 border-zinc-700 cursor-pointer text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors duration-100"
            >
                <Plus className="w-4 h-4 mr-2" />
                <p>Add Account</p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add account</DialogTitle>
                        <DialogDescription>
                            Register a new account to start your space trading
                            journey.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(registerAccount)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Captain Kirk"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The name of your publicly viewable
                                            Space Trading account.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="w-24"
                                type="submit"
                                variant="secondary"
                            >
                                {isLoading ? (
                                    <Loader2
                                        strokeWidth={3}
                                        className="w-5 h-5 animate-spin"
                                    />
                                ) : (
                                    <p>Register</p>
                                )}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
