import {Comment} from "@/types/comment";

export default function CommentList({comments}: { comments: Comment[] }) {
    return (
        <>
            <div className="text-xl font-semibold mb-6 uppercase tracking-wide">
                {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </div>
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment}/>
            ))}
        </>
    );
}

function CommentItem({comment}: { comment: Comment }) {
    return (
        <div className="py-6 first:border-t-0">
            <div className="text-sm font-semibold uppercase tracking-wide mb-1">
                {comment.name}
            </div>
            <div className="text-xs mb-2">
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </div>
            <div className="text-base leading-relaxed whitespace-pre-line">
                {comment.content}
            </div>
        </div>
    );
}
