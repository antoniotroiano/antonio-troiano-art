import {fetchCommentsForPost} from "@/lib/api/fetchComments";
import CommentSectionWrapper from "@/components/comment/CommentSectionWrapper";

export default async function CommentThread({postId}: { postId: number }) {
    const comments = await fetchCommentsForPost(postId);

    return (
        <div className="w-full max-w-2xl mb-20">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg min-h-100">
                <CommentSectionWrapper postId={postId} initialComments={comments}/>
            </div>
        </div>
    );
}
