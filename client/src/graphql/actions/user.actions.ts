import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const GET_USER: DocumentNode = gql`
  query {
    currentUser {
      user {
        id
        name
        email
        password
        address
        contact
        avatars {
          url
        }
      }
      accessToken
      refreshToken
      error {
        message
      }
    }
  }
`;
