// src/components/user/Profile.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../generated/graphql';
import ArticleList from '../articles/ArticleList';
import { Button } from '../ui/Button';
import UserStats from './UserStats';
import UserFollowButton from './UserFollowButton';
import { useAuthContext } from '../../context/AuthContext';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { currentUser } = useAuthContext();
  const { data, loading, error } = useGetUserQuery({
    variables: { username: username || '' },
    skip: !username
  });

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!data?.user) return <div className="p-4">User not found</div>;

  const user = data.user;
  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
          {isOwnProfile ? (
            <Button href="/settings" variant="outline">Edit Profile</Button>
          ) : (
            <UserFollowButton userId={user.id} />
          )}
        </div>
        
        {user.bio && (
          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
          </div>
        )}
        
        <UserStats userId={user.id} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Posts by {user.username}</h2>
        <ArticleList authorId={user.id} />
      </div>
    </div>
  );
};

export default Profile;