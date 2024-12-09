"use client";

import { useAuth } from "@/context/AuthContext";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

import LoadingSpinner from "../../../ultils/loadingSpinner/loadingspinner";
import { formatPostDate } from "../../../ultils/date/date";
import { deletePost, commentOnPost, likeUnlikePost } from "../../../services/postServices";

const Post = ({ post: initialPost }) => {
  const { authUser } = useAuth();
  const [post, setPost] = useState(initialPost);
  const [comment, setComment] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  if (!post || !post.user) {
    return null;
  }

  const postOwner = post?.user;
  const isLiked = authUser && post?.likes?.includes(authUser._id);
  const isMyPost = authUser && authUser._id === postOwner?._id;
  const formattedDate = post?.createdAt ? formatPostDate(post.createdAt) : "";

  const handleDeletePost = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setError(null);
    setSuccessMessage("");
    try {
      await deletePost(post._id);
      setSuccessMessage("Post deleted successfully");
      setPost(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };


const handleLikePost = async () => {
  if (isLiking || !post || !authUser) return;
  setIsLiking(true);
  setError(null);

  // Atualizar otimisticamente o estado local
  const wasLiked = isLiked;
  setPost((prev) => ({
    ...prev,
    likes: wasLiked
      ? prev.likes.filter((id) => id !== authUser._id)
      : [...prev.likes, authUser._id],
  }));

  try {
    // Enviar a atualização para o back-end
    await likeUnlikePost(post._id);
  } catch (err) {
    // Reverter a atualização local em caso de erro
    setPost((prev) => ({
      ...prev,
      likes: wasLiked
        ? [...prev.likes, authUser._id]
        : prev.likes.filter((id) => id !== authUser._id),
    }));
    setError(err.message);
    toast.error(`Error: ${err.message}`);
  } finally {
    setIsLiking(false);
  }
};

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (isCommenting || !post || !authUser) return;
    setIsCommenting(true);
    setError(null);
    setSuccessMessage("");
    try {
      const updatedPost = await commentOnPost(post._id, comment);
      setSuccessMessage("Comment posted successfully");
      setComment("");
      setPost(updatedPost);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCommenting(false);
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className="flex gap-2 items-start p-4 border-b border-gray-700">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}

      <div
        className="avatar"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Link href={`/profile/${postOwner?.username}`}>
          <img
            src={postOwner?.profile_img || "/defaultuser.png"}
            alt={postOwner?.username}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Link>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center">
          <Link href={`/profile/${postOwner?.username}`} className="font-bold">
            {postOwner?.fullName}
          </Link>
          <span className="text-gray-500 flex gap-1 text-sm">
            <Link href={`/profile/${postOwner?.username}`}>@{postOwner?.username}</Link>
            <span>·</span>
            <span>{formattedDate}</span>
          </span>
          {isMyPost && (
            <span className="flex justify-end flex-1">
              {!isDeleting && (
                <FaTrash className="cursor-pointer hover:text-red-500" onClick={handleDeletePost} />
              )}
              {isDeleting && <LoadingSpinner size="sm" />}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 overflow-hidden">
          <span>{post?.text}</span>
          {post?.img && (
            <img
              src={post.img}
              className="h-80 object-contain rounded-lg border border-gray-700"
              alt="Post Content"
            />
          )}
        </div>

        <div className="flex justify-between mt-3">
          <div className="flex gap-4 w-2/3 justify-around items-end">
            <div
              className="flex gap-1 items-center cursor-pointer group"
              onClick={() => document.getElementById(`comment-input-${post._id}`).focus()}
            >
              <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
              <span className="text-sm text-slate-500 group-hover:text-sky-400">
                {post?.comments?.length || 0}
              </span>
            </div>

            <div
              className="flex gap-1 items-center group cursor-pointer"
              onClick={authUser ? handleLikePost : null}
            >
              {isLiking && <LoadingSpinner size="sm" />}
              {!isLiked && !isLiking && (
                <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
              )}
              {isLiked && !isLiking && (
                <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500" />
              )}
              <span
                className={`text-sm group-hover:text-pink-500 ${
                  isLiked ? "text-pink-500" : "text-slate-500"
                }`}
              >
                {post?.likes?.length || 0}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handlePostComment} className="mt-3 flex items-center gap-2">
          <input
            id={`comment-input-${post._id}`}
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            disabled={isCommenting}
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            {isCommenting ? <LoadingSpinner size="sm" /> : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
