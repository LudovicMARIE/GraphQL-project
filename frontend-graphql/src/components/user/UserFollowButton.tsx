// src/components/user/UserFollowButton.tsx
import React from 'react';
import { Button } from '../ui/Button';
import { useFollowUserMutation, useUnfollowUserMutation, useIsFollowingQuery } from '../../generated/graphql';
import { useAuthContext } from '../../context/AuthContext';

interface UserFollowButtonProps {
  userId: string;
}

const UserFollowButton: React.FC<UserFollowButtonProps> = ({ userId }) => {
  const { currentUser, isAuthenticated } = useAuthContext();
  const { data, loading, refetch } = useIsFollowingQuery({
    variables: { 
      followerId: currentUser?.id || '', 
      followingId: userId 
    },
    skip: !isAuthenticated || !currentUser?.id
  });

  const [followUser, { loading: followLoading }] = useFollowUserMutation({
    onCompleted: () => refetch()
  });
  
  const [unfollowUser, { loading: unfollowLoading }] = useUnfollowUserMutation({
    onCompleted: () => refetch()
  });

  if (!isAuthenticated || currentUser?.id === userId) {
    return null;
  }

  const isFollowing = data?.isFollowing || false;
  const isLoading = loading || followLoading || unfollowLoading;

  const handleToggleFollow = async () => {
    if (isFollowing) {
      await unfollowUser({ 
        variables: { 
          followerId: currentUser?.id || '', 
          followingId: userId 
        } 
      });
    } else {
      await followUser({ 
        variables: { 
          followerId: currentUser?.id || '', 
          followingId: userId 
        } 
      });
    }
  };

  return (
    <Button
      onClick={handleToggleFollow}
      disabled={isLoading}
      variant={isFollowing ? "outline" : "primary"}
    >
      {isLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default UserFollowButton;