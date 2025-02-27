import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { formatRelativeTime } from '../../utils/dateUtils';
import { useDeleteCommentMutation, CommentBasicFragment } from '../../generated/graphql';
import { TrashIcon } from '@heroicons/react/outline';

interface CommentListProps {
  comments: CommentBasicFragment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const { user } = useAuth();
  const [deleteComment] = useDeleteCommentMutation({
    refetchQueries: ['GetArticle'],
  });
  
  const handleDeleteComment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }
    
    try {
      await deleteComment({
        variables: { id },
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  
  if (comments.length === 0) {
    return <div className="text-gray-500 text-center py-4">No comments yet</div>;
  }
  
  return (
    <div className="space-y-6">
      {comments.map((comment) => {
        const isAuthor = user?.id === comment.author.id;
        
        return (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Link to={`/profile/${comment.author.id}`} className="font-medium text-gray-900 hover:underline">
                  {comment.author.username}
                </Link>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">{formatRelativeTime(comment.createdAt)}</span>
              </div>
              
              {isAuthor && (
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="text-gray-700">
              {comment.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-1">{paragraph}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;