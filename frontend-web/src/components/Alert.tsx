"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function Alert({open, message, onClose,}: {
    open: boolean;
    message: string;
    onClose: () => void;
}) {
    return (
        <AlertDialog.Root open={open} onOpenChange={onClose}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"/>
                <AlertDialog.Content
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm rounded-2xl p-6 bg-violet-50/90 shadow-xl border border-violet-200 z-50 transition-all">
                    <AlertDialog.Title className="text-lg font-semibold text-center text-slate-800">
                        Notification
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-center text-slate-700 mt-2">
                        {message}
                    </AlertDialog.Description>
                    <div className="mt-6 flex justify-center">
                        <AlertDialog.Cancel asChild>
                            <button onClick={onClose}
                                    className="px-4 py-1.5 text-sm font-medium text-violet-800 bg-white/60 border border-violet-300 rounded-lg hover:bg-violet-100 transition-colors">
                                Close
                            </button>
                        </AlertDialog.Cancel>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}
