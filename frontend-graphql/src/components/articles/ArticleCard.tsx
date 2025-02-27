import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ChatIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { formatRelativeTime } from '../../utils/dateUtils';
import { useLikeArticleMutation, useUnlikeArticleMutation } from '../../generated/graphql';
import { useAuth } from '../../context/AuthContext';

interface ArticleCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorUsername: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  content,
  createdAt,
  authorId,
  authorUsername,
  likesCount,
  commentsCount,
  isLiked,
}) => {
  const { isAuthenticated } = useAuth();
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      return;
    }
    
    try {
      if (isLiked) {
        await unlikeArticle({ variables: { id } });
      } else {
        await likeArticle({ variables: { id } });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Truncate content if it's too long
  const truncatedContent = content.length > 200 
    ? `${content.substring(0, 200)}...` 
    : content;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-3">
        <Link to={`/profile/${authorId}`} className="font-medium text-gray-900 hover:underline">
          {authorUsername}
        </Link>
        <span className="mx-2 text-gray-300">•</span>
        <span className="text-sm text-gray-500">{formatRelativeTime(createdAt)}</span>
      </div>
      
      <Link to={`/article/${id}`} className="block hover:bg-gray-50 rounded-md -m-4 p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{truncatedContent}</p>
      </Link>
      
      <div className="flex items-center mt-4 text-gray-500">
        <button 
          onClick={handleLikeToggle}
          className={`flex items-center mr-6 ${
            isLiked ? 'text-red-500' : 'hover:text-gray-700'
          }`}
          disabled={!isAuthenticated}
        >
          {isLiked ? (
            <HeartIconSolid className="h-5 w-5 mr-1" />
          ) : (
            <HeartIcon className="h-5 w-5 mr-1" />
          )}
          {likesCount}
        </button>
        
        <Link to={`/article/${id}`} className="flex items-center hover:text-gray-700">
          <ChatIcon className="h-5 w-5 mr-1" />
          {commentsCount}
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;