import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import  client  from './apollo-client';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Profile from './components/user/UserProfile';
import Settings from './components/user/Settings';
import ArticleDetail from './components/articles/ArticleDetail';
import CreateArticle from './components/articles/CreateArticle';
import EditArticle from './components/articles/EditArticle';
// import NotFound from './components/pages/Home';
import PrivateRoute from './components/auth/PrivateRoute';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/user/:username" element={<Profile />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              
              <Route path="/settings" element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } />
              
              <Route path="/create-article" element={
                <PrivateRoute>
                  <CreateArticle />
                </PrivateRoute>
              } />
              
              <Route path="/edit-article/:id" element={
                <PrivateRoute>
                  <EditArticle />
                </PrivateRoute>
              } />
              
              {/* <Route path="/404" element={<NotFound />} /> */}
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;