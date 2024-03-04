import Image from "next/image";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../common/loading/Loading";
import { FetchComments } from "../fetch/get/comments/FetchComments";
import { Card } from "../ui/card";

interface Comment {
  hasLiked: any;
  likeCount: number;
  id: string;
  author: {
    name: string;
    id: string;
    image: string | null;
  };
  createdAt: string;
  likedBy: string[];
  content: string;
}

interface CommentListProps {
  postId: string;
  isCommentAdded: boolean;
  resetCommentAdded: () => void;
}

export default function CommentsList({
  postId,
  isCommentAdded,
  resetCommentAdded,
}: CommentListProps) {
  const { isLoading, data, isError, refetch } = FetchComments(postId);

  useEffect(() => {
    if (isCommentAdded) {
      refetch();
      resetCommentAdded();
    }
  }, [isCommentAdded, refetch, resetCommentAdded]);
  return (
    <div className="flex w-full flex-col gap-4">
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : isError ? (
        "Error Fetching Comments."
      ) : (
        data.map((comment: Comment) => (
          <Card key={comment.id} className="p-3">
            <div className="flex  md:flex-row md:justify-between">
              <div className="flex flex-wrap items-center gap-4 md:flex-row">
                {comment.author.image ? (
                  <Image
                    src={comment.author.image}
                    alt=""
                    height={100}
                    width={100}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-600  p-0.5 text-center text-sm">
                    No image
                  </div>
                )}
                <div className="text-xl font-bold">{comment.author.name}</div>
                <div>
                  {new Date(comment.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            </div>
            <div className="md:ml-16">{comment.content}</div>
          </Card>
        ))
      )}
    </div>
  );
}
