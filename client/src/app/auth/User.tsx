import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/actions/user.actions";

const User = () => {
  const { loading, data } = useQuery(GET_USER);
  return {
    loading,
    user: data?.getLoggedInUser?.user,
  };
};

export default User;
