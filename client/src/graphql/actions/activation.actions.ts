import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const ACTIVATE_USER: DocumentNode = gql`
  mutation ActivateUser($token: String!, $activationToken: String!) {
    activateUserAccount(
      activationInput: { token: $token, activationToken: $activationToken }
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
