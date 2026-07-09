import { useQuery } from "@tanstack/react-query";
import { currentUserQueryOptions } from "../../queries";

export const UserPage = () => {
  const {
    data: user,
    isError,
    isLoading,
    error,
  } = useQuery(
    currentUserQueryOptions(),
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
