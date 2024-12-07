import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const FORGOT_PASSWORD: DocumentNode = gql`
  mutation LoginUser($email: String!) {
    forgotPassword(loginInput: { email: $email }) {
      message
    }
  }
`;
