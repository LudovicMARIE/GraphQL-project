import React from 'react';
import { useGetUserStatsQuery } from '../../generated/graphql';

interface UserStatsProps {
  userId: string;
}

const UserStats: React.FC<UserStatsProps> = ({ userId }) => {
  const { data, loading } = useGetUserStatsQuery({
    variables: { userId },
    skip: !userId
  });

  if (loading) return <div>Loading stats...</div>;

  const stats = data?.userStats || { articleCount: 0, followerCount: 0, followingCount: 0 };

  return (
    <div className="flex space-x-6 text-center py-2">
      <div>
        <div className="font-semibold">{stats.articleCount}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
      </div>
      <div>
        <div className="font-semibold">{stats.followerCount}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
      </div>
      <div>
        <div className="font-semibold">{stats.followingCount}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
      </div>
    </div>
  );
};

export default UserStats;