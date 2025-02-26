import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateArticleMutation } from '../../generated/graphql';
import Button from '../ui/Button';

interface CreateArticleFormData {
  title: string;
  content: string;
  published: boolean;
}

const CreateArticle: React.FC = () => {
  const navigate = useNavigate();
  const [createArticle, { loading }] = useCreateArticleMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateArticleFormData>({
    defaultValues: {
      published: true,
    },
  });
  
  const onSubmit = async (data: CreateArticleFormData) => {
    try {
      const response = await createArticle({
        variables: {
          data: {
            title: data.title,
            content: data.content,
            published: data.published,
          },
        },
      });
      
      if (response.data?.createArticle) {
        navigate(`/article/${response.data.createArticle.id}`);
      }
    } catch (err) {
      console.error("Error creating article:", err);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      
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
              Publish immediately
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
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;