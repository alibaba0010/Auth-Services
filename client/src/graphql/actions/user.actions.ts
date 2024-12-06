import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const GET_USER: DocumentNode = gql`
  query {
    getLoggedInUser {
      user {
        id
        name
        email
        password
        address
        contact
      }
      accessToken
      refreshToken
      error {
        message
      }
    }
  }
`;
