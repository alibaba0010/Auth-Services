import { DocumentNode, gql } from "@apollo/client";

export const LOGIN_USER: DocumentNode = gql`
mutation LoginUser(
   $email: String!,
   password: String!
){
   loginUser(
      email: $email,
      password: $password
   ){}
}
`;
