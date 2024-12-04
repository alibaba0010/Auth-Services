"use client";

import { DocumentNode, gql } from "@apollo/client";

export const REGISTER_USER: DocumentNode = gql`
  mutation RegisterUser(
    $name: String!
    $password: String!
    $email: String!
    $contact: Float!
  ) {
    registerUser(
      registerInput: {
        name: $name
        email: $email
        password: $password
        contact: $contact
      }
    ) {
      activation_token
    }
  }
`;
