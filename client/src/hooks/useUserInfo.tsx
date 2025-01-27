import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/actions/user.actions";

const useUserInfo = () => {
  const { loading, data } = useQuery(GET_USER);
  return {
    loading,
    user: data?.currentUser?.user,
  };
};

export default useUserInfo;
