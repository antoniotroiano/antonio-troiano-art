import {useState} from 'react';
import {Dialog, DialogTrigger, DialogContent, DialogTitle} from '../components/CustomDialig';

export function ContentDialog({content}: { content: string }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className="truncate cursor-pointer" onClick={() => setOpen(true)}>
                    {content.length > 100 ? content.slice(0, 100) + '...' : content}
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Full content</DialogTitle>
                <div className="mt-4 whitespace-pre-wrap">{content}</div>
            </DialogContent>
        </Dialog>
    );
}
