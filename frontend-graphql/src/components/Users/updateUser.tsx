import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { gql, useMutation } from "@apollo/client";
import { User } from '../../gql/graphql';
import { graphql } from '../../gql/gql';

const UPDATE_USER_MUTATION = graphql(`
  mutation Mutation($updateUserId: ID!, $username: String, $password: String, $bio: String) {
    updateUser(id: $updateUserId, username: $username, password: $password, bio: $bio) {
      code
      success
      message
      user {
        id
        email
        username
        bio
      }
    }
  }
`);

interface UpdateUserResponse {
  updateUser: {
    code: string;
    success: boolean;
    message: string;
    user: User;
  }
}