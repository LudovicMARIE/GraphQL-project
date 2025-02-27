import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetArticleQuery, useUpdateArticleMutation } from '../../generated/graphql';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

interface EditArticleFormData {
  title: string;
  content: string;
  published: boolean;
}

const EditArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data, loading: queryLoading } = useGetArticleQuery({
    variables: { id: id || '' },
    skip: !id,
  });
  
  const [updateArticle, { loading: mutationLoading }] = useUpdateArticleMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditArticleFormData>();
  
  useEffect(() => {
    if (data?.article) {
      reset({
        title: data.article.title,
        content: data.article.content,
        published: data.article.published,
      });
      
      // Check if current user is the author
      if (data.article.author.id !== user?.id) {
        navigate(`/article/${id}`);
      }
    }
  }, [data, reset, navigate, id, user]);
  
  const onSubmit = async (formData: EditArticleFormData) => {
    if (!id) return;
    
    try {
      const response = await updateArticle({
        variables: {
          id,
          data: {
            title: formData.title,
            content: formData.content,
            published: formData.published,
          },
        },
      });
      
      if (response.data?.updateArticle) {
        navigate(`/article/${id}`);
      }
    } catch (err) {
      console.error("Error updating article:", err);
    }
  };
  
  if (queryLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  if (!data?.article) {
    return <div className="text-center py-8">Article not found</div>;
  }
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 100,
                message: "Title must be less than 100 characters",
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            rows={6}
            {...register("content", {
              required: "Content is required",
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="published"
              type="checkbox"
              {...register("published")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="published" className="font-medium text-gray-700">
              Published
            </label>
            <p className="text-gray-500">
              If unchecked, your post will be saved as a draft.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/article/${id}`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={mutationLoading}>
            {mutationLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;