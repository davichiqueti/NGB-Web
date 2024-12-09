"use client";

import { useAuth } from '@/context/AuthContext';
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

import LoadingSpinner from "../../../ultils/loadingSpinner/loadingspinner";
import { formatPostDate } from "../../../ultils/date/date";
import { deletePost } from '../../../services/postServices';
import { likeUnlikePost } from '../../../services/postServices';

const Post = ({ post: initialPost }) => {
  const { authUser } = useAuth();
  const [post, setPost] = useState(initialPost);
  const [comment, setComment] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [error, setError] = useState(null);

  // Verificar se `post` está disponível antes de acessar suas propriedades
  if (!post || !post.user) {
    return null;
  }

  const postOwner = post.user;
  const isLiked = authUser ? post.likes.includes(authUser._id) : false;
  const isMyPost = authUser && authUser._id === post.user._id;
  const formattedDate = formatPostDate(post.createdAt);

  const handleDeletePost = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setError(null);
    try {
      const res = await deletePost(post._id);
      toast.success("Post deleted successfully");
      setPost(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLikePost = async () => {
    if (isLiking || !post || !authUser) return; // Se não houver authUser, não é possível curtir
    setIsLiking(true);
    setError(null);
    try {
      const res = await likeUnlikePost(post._id);
      setPost((prev) => ({ ...prev, likes: data }));
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLiking(false);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (isCommenting || !post || !authUser) return; // Se não houver authUser, não comentar
    setIsCommenting(true);
    setError(null);
    try {
      const res = await fetch(`/api/posts/comment/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: comment }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      toast.success("Comment posted successfully");
      setComment("");
      setPost(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsCommenting(false);
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className='flex gap-2 items-start p-4 border-b border-gray-700'>
      <div className='avatar'>
        <Link href={`/profile/${postOwner.username}`} className='w-8 rounded-full overflow-hidden'>
          <img src={postOwner.profile_img || "/avatar-placeholder.png"} alt={postOwner.username} />
        </Link>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex gap-2 items-center'>
          <Link href={`/profile/${postOwner.username}`} className='font-bold'>
            {postOwner.fullName}
          </Link>
          <span className='text-gray-700 flex gap-1 text-sm'>
            <Link href={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
            <span>·</span>
            <span>{formattedDate}</span>
          </span>
          {isMyPost && (
            <span className='flex justify-end flex-1'>
              {!isDeleting && (
                <FaTrash className='cursor-pointer hover:text-red-500' onClick={handleDeletePost} />
              )}
              {isDeleting && <LoadingSpinner size='sm' />}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-3 overflow-hidden'>
          <span>{post.text}</span>
          {post.img && (
            <img
              src={post.img}
              className='h-80 object-contain rounded-lg border border-gray-700'
              alt=''
            />
          )}
        </div>
        <div className='flex justify-between mt-3'>
          <div className='flex gap-4 items-center w-2/3 justify-between'>
            <div
              className='flex gap-1 items-center cursor-pointer group'
              onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
            >
              <FaRegComment className='w-4 h-4  text-slate-500 group-hover:text-sky-400' />
              <span className='text-sm text-slate-500 group-hover:text-sky-400'>
                {post.comments.length}
              </span>
            </div>
            <dialog id={`comments_modal${post._id}`} className='modal border-none outline-none'>
              <div className='modal-box rounded border border-gray-600'>
                <h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
                <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
                  {post.comments.length === 0 && (
                    <p className='text-sm text-slate-500'>
                      No comments yet 🤔 Be the first one 😉
                    </p>
                  )}
                  {post.comments.map((comment) => (
                    <div key={comment._id} className='flex gap-2 items-start'>
                      <div className='avatar'>
                        <div className='w-8 rounded-full'>
                          <img
                            src={comment.user.profileImg || "/avatar-placeholder.png"}
                            alt={comment.user.username}
                          />
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-1'>
                          <span className='font-bold'>{comment.user.fullName}</span>
                          <span className='text-gray-700 text-sm'>@{comment.user.username}</span>
                        </div>
                        <div className='text-sm'>{comment.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {authUser && ( // Só mostra a caixa de comentário se tiver um usuário autenticado
                  <form
                    className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800'
                      placeholder='Add a comment...'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                      {isCommenting ? <LoadingSpinner size='md' /> : "Post"}
                    </button>
                  </form>
                )}
              </div>
              <form method='dialog' className='modal-backdrop'>
                <button className='outline-none'>close</button>
              </form>
            </dialog>
            <div className='flex gap-1 items-center group cursor-pointer'>
              <BiRepost className='w-6 h-6  text-slate-500 group-hover:text-green-500' />
              <span className='text-sm text-slate-500 group-hover:text-green-500'>0</span>
            </div>
            <div
              className='flex gap-1 items-center group cursor-pointer'
              onClick={authUser ? handleLikePost : null}
            >
              {isLiking && <LoadingSpinner size='sm' />}
              {!isLiked && !isLiking && (
                <FaRegHeart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
              )}
              {isLiked && !isLiking && (
                <FaRegHeart className='w-4 h-4 cursor-pointer text-pink-500 ' />
              )}
              <span
                className={`text-sm  group-hover:text-pink-500 ${
                  isLiked ? "text-pink-500" : "text-slate-500"
                }`}
              >
                {post.likes.length}
              </span>
            </div>
          </div>
          <div className='flex w-1/3 justify-end gap-2 items-center'>
            <FaRegBookmark className='w-4 h-4 text-slate-500 cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
