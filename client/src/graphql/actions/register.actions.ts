"use client";

import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $password: String!
    $email: String!
    $contact: Float!
  ) {
    registerUser(
      registerDto: {
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
