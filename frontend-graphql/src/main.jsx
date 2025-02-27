import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from './Context/UserContext';
// import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx'

import { client } from './apolloClient'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
)
