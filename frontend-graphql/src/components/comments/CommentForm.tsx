import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateCommentMutation } from '../../generated/graphql';
import Button from '../ui/Button';

interface CommentFormProps {
  articleId: string;
}

interface CommentFormData {
  content: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
  const [createComment, { loading }] = useCreateCommentMutation({
    refetchQueries: ['GetArticle'],
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>();
  
  const onSubmit = async (data: CommentFormData) => {
    try {
      await createComment({
        variables: {
          data: {
            content: data.content,
            articleId,
          },
        },
      });
      
      reset();
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
      <div className="mb-3">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Add a comment
        </label>
        <textarea
          id="content"
          rows={3}
          {...register("content", {
            required: "Comment text is required",
          })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Share your thoughts..."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;