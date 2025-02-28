import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { gql, useMutation } from "@apollo/client";
import { User } from '../../gql/graphql';

const GET_USER_MUTATION = gql`
  query GetUserById($userId: ID!) {
  getUserById(userId: $userId) {
    id
    email
    username
    bio
  }
}
`;