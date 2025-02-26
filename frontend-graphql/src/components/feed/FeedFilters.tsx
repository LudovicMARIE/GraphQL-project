import React from 'react';
import Button from '../ui/Button';
import { useGetTopAuthorsQuery } from '../../generated/graphql';

enum SortBy {
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST',
  MOST_LIKED = 'MOST_LIKED',
  LEAST_LIKED = 'LEAST_LIKED'
}

interface FeedFiltersProps {
  authorFilter: string | null;
  setAuthorFilter: (id: string | null) => void;
  sortBy: SortBy;
  setSortBy: (sort: SortBy) => void;
}

const FeedFilters: React.FC<FeedFiltersProps> = ({
  authorFilter,
  setAuthorFilter,
  sortBy,
  setSortBy
}) => {
  const { data } = useGetTopAuthorsQuery({ variables: { limit: 5 } });
  const topAuthors = data?.topAuthors || [];

  return (
    <div className="mb-6 bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Sort by</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={sortBy === SortBy.NEWEST ? "primary" : "outline"} 
            size="sm"
            onClick={() => setSortBy(SortBy.NEWEST)}
          >
            Newest
          </Button>
          <Button 
            variant={sortBy === SortBy.OLDEST ? "primary" : "outline"} 
            size="sm"
            onClick={() => setSortBy(SortBy.OLDEST)}
          >
            Oldest
          </Button>
          <Button 
            variant={sortBy === SortBy.MOST_LIKED ? "primary" : "outline"} 
            size="sm"
            onClick={() => setSortBy(SortBy.MOST_LIKED)}
          >
            Most Liked
          </Button>
          <Button 
            variant={sortBy === SortBy.LEAST_LIKED ? "primary" : "outline"} 
            size="sm"
            onClick={() => setSortBy(SortBy.LEAST_LIKED)}
          >
            Least Liked
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Filter by author</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={authorFilter === null ? "primary" : "outline"} 
            size="sm"
            onClick={() => setAuthorFilter(null)}
          >
            All
          </Button>
          
          {topAuthors.map(author => (
            <Button 
              key={author.id}
              variant={authorFilter === author.id ? "primary" : "outline"} 
              size="sm"
              onClick={() => setAuthorFilter(author.id)}
            >
              {author.username}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedFilters;