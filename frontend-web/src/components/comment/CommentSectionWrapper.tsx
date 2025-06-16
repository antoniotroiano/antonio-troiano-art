"use client";

import {useState} from "react";
import CommentList from "./CommentList";
import CommentSection from "./CommentSection";

interface Props {
    postId: number;
    initialComments: any[];
}

export default function CommentSectionWrapper({postId, initialComments}: Props) {
    const [comments, setComments] = useState(initialComments);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comments/post/${postId}`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to fetch comments: ${response.status} ${errorText}`);
                return;
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    return (
        <>
            <div className="relative">
                <CommentSection postId={postId} onCommentSubmitted={fetchComments}/>
                <CommentList comments={comments}/>
            </div>
        </>
    );
}
