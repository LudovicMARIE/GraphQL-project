import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { HeartIcon, ChatIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { 
  useGetArticleQuery, 
  useLikeArticleMutation, 
  useUnlikeArticleMutation,
  useDeleteArticleMutation
} from '../../generated/graphql';
import { useAuth } from '../../context/AuthContext';
import { formatDate, formatRelativeTime } from '../../utils/dateUtils';
import Button from '../ui/Button';
import CommentForm from '../comments/CommentForm';
import CommentList from '../comments/CommentList';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const { data, loading, error } = useGetArticleQuery({
    variables: { id: id || '' },
    skip: !id,
  });
  
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();
  const [deleteArticle, { loading: deleteLoading }] = useDeleteArticleMutation();
  
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  if (error || !data?.article) {
    return <div className="text-center py-8 text-red-500">Error loading article</div>;
  }
  
  const article = data.article;
  const isAuthor = user?.id === article.author.id;
  
  const handleLikeToggle = async () => {
    if (!isAuthenticated) return;
    
    try {
      if (article.likedByMe) {
        await unlikeArticle({ 
          variables: { id: article.id },
          refetchQueries: ['GetArticle'],
        });
      } else {
        await likeArticle({ 
          variables: { id: article.id },
          refetchQueries: ['GetArticle'],
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  
  const handleDelete = async () => {
    if (!isAuthor) return;
    
    try {
      await deleteArticle({
        variables: { id: article.id },
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to={`/profile/${article.author.id}`} className="font-medium text-gray-900 hover:underline">
              {article.author.username}
            </Link>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">{formatDate(article.createdAt)}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">{formatRelativeTime(article.createdAt)}</span>
          </div>
          
          {isAuthor && (
            <div className="flex space-x-2">
              <Link to={`/edit/${article.id}`} className="text-gray-500 hover:text-gray-700">
                <PencilIcon className="h-5 w-5" />
              </Link>
              <button 
                onClick={() => setShowDeleteConfirm(true)} 
                className="text-gray-500 hover:text-red-600"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        <div className="prose max-w-none mb-6">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map(({ tag }) => (
              <span key={tag.id} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                {tag.name}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center text-gray-500 border-t pt-4">
          <button 
            onClick={handleLikeToggle}
            className={`flex items-center mr-6 ${
              article.likedByMe ? 'text-red-500' : 'hover:text-gray-700'
            }`}
            disabled={!isAuthenticated}
          >
            {article.likedByMe ? (
              <HeartIconSolid className="h-5 w-5 mr-1" />
            ) : (
              <HeartIcon className="h-5 w-5 mr-1" />
            )}
            {article._count.likes}
          </button>
          
          <div className="flex items-center">
            <ChatIcon className="h-5 w-5 mr-1" />
            {article._count.comments}
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Article</h3>
            <p className="mb-6">Are you sure you want to delete this article? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Comments</h2>
        
        {isAuthenticated ? (
          <CommentForm articleId={article.id} />
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
            <p className="text-gray-600">
              <Link to="/signin" className="text-primary-600 hover:underline">Sign in</Link> to add a comment
            </p>
          </div>
        )}
        
        <CommentList comments={article.comments} />
      </div>
    </div>
  );
};

export default ArticleDetail;