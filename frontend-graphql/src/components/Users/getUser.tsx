import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { gql, useMutation } from "@apollo/client";
import { User } from '../../gql/graphql';
import { graphql } from '../../gql/gql';

const GET_USER_MUTATION = graphql(`
  query GetUserById($userId: ID!) {
    getUserById(userId: $userId) {
      id
      email
      username
      bio
    }
  }
`);