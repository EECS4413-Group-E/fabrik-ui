import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "../../queries";

export const UserPage = () => {
  const {
    data: user,
    isError,
    isLoading,
    error,
  } = useQuery(
    userQueryOptions("8ecf8276-e555-41cc-b2ba-e42353dc72b4"),
  );

  return (
    <div>
      <h1>User Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <p>User ID: {user?.id}</p>
          <p>User Email: {user?.email}</p>
          <p>User Role: {user?.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;
