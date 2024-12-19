import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const FORGOT_PASSWORD: DocumentNode = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(forgotPasswordInput: { email: $email }) {
      message
    }
  }
`;
