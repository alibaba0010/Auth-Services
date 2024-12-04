import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const ACTIVATE_USER: DocumentNode = gql`
  mutation ActivateUser($token: String!, $activation_token: String!) {
    activateUser(
      activationInput: { token: $token, activation_token: $activation_token }
    ) {
      user {
        id
        name
        email
        password
        contact
      }
    }
  }
`;
