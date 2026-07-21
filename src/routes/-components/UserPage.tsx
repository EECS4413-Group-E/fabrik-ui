import { useQuery } from '@tanstack/react-query';
import { currentUserQueryOptions } from '../../queries';
import { Box, Typography } from '@mui/material';

export const UserPage = () => {
  const { data: user, isError, isLoading, error } = useQuery(currentUserQueryOptions());

  return (
    <Box sx={{ alignSelf: 'center' }}>
      <Typography variant={'h1'}>User Page</Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : isError ? (
        <Typography>Error: {error.message}</Typography>
      ) : (
        <Box>
          <Typography>User ID: {user?.id}</Typography>
          <Typography>User Email: {user?.email}</Typography>
          <Typography>User Role: {user?.role}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserPage;
