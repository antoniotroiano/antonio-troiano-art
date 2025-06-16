import * as DialogPrimitive from '@radix-ui/react-dialog';
import {cn} from '@/utils/utils';
import {ReactNode, ComponentPropsWithoutRef, JSX} from 'react';

interface DialogProps extends DialogPrimitive.DialogProps {
    children: ReactNode;
}

export function Dialog({children, ...props}: DialogProps) {
    return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

export function DialogTrigger({children, ...props}: DialogProps) {
    return <DialogPrimitive.Trigger {...props}>{children}</DialogPrimitive.Trigger>;
}

export function DialogContent({
                                  className = '',
                                  children,
                                  ...props
                              }: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>): JSX.Element {
    return (
        <DialogPrimitive.Overlay
            className="fixed inset-0 bg-black/50 flex justify-center items-center ">
            <DialogPrimitive.Content
                className={cn('fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg transition-transform animate-scale-in', className)}{...props}>
                {children}
            </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
    );
}

export function DialogTitle({
                                className = '',
                                ...props
                            }: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>): JSX.Element {
    return (
        <DialogPrimitive.Title className={cn('text-lg font-bold', className)} {...props} />
    );
}
