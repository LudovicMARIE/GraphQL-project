// src/components/pages/Home.tsx
import React, { useState } from 'react';
import ArticleList from '../articles/ArticleList';
import CreateArticle from '../articles/CreateArticle';
import { useAuthContext } from '../../context/AuthContext';
import FeedFilters from '../feed/FeedFilters';

enum SortBy {
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST',
  MOST_LIKED = 'MOST_LIKED',
  LEAST_LIKED = 'LEAST_LIKED'
}

const Home: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const [authorFilter, setAuthorFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NEWEST);
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      {isAuthenticated && (
        <div className="mb-8">
          <CreateArticle />
        </div>
      )}
      
      <FeedFilters 
        authorFilter={authorFilter}
        setAuthorFilter={setAuthorFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <ArticleList 
        authorId={authorFilter} 
        sortBy={sortBy}
      />
    </div>
  );
};

export default Home;