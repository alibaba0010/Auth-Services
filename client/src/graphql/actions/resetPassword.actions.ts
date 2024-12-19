import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const RESET_PASSWORD: DocumentNode = gql`
  mutation resetPassword(
    $password: String!
    $confirmPassword: String!
    $token: String!
  ) {
    resetPassword(
      resetPasswordInput: {
        password: $password
        confirmPassword: $confirmPassword
        token: $token
      }
    ) {
      message
    }
  }
`;
