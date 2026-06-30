import { useEffect, useState } from "react";
import type { User } from "../models/User";
import { fetchUserData } from "../Api";

export const UserPage = () => {

const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const loadUser = async () => {
          try {
              setLoading(true);
              setError(null);

              const user = await fetchUserData();
              setUser(user);
          } catch (err) {
              setError("Failed to fetch user.");
          } finally {
              setLoading(false);
          }
      };

      loadUser();
  }, []);

  return (
    <div>
      <h1>User Page</h1>
      {
        loading ? <p>Loading...</p> : 
          error ? <p>Error: {error}</p> :
          <div>
            <p>User ID: {user ? user.id : "Something went wrong"}</p>
            <p>User Email: {user ? user.email : "Something went wrong"}</p>
            <p>User Role: {user ? user.role : "Something went wrong"}</p>
          </div>
      }
    </div>
  );
}

export default UserPage;