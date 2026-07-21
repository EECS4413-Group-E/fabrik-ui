import { useForm } from '@tanstack/react-form';
import { Link, useNavigate } from '@tanstack/react-router';
import type { LoginRegisterRequest } from '../../models/User';
import { useLoginMutation } from '../../mutations';
import { Box, Button, TextField, Typography } from '@mui/material';

const LoginPage = () => {
  const { mutate: login, isPending, error } = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginRegisterRequest,
    onSubmit: async ({ value }) => {
      login(value, {
        onSuccess: () => navigate({ to: '/user', replace: true }),
      });
    },
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography sx={{ mb: 2 }} variant="h1">
        Login
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
          <form.Field name="email">
            {(field) => (
              <TextField
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label={'Email'}
              />
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <TextField
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="password"
                label={'Password'}
              />
            )}
          </form.Field>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Button type="submit" variant={'contained'} disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
          <Link to="/register">Register</Link>
        </Box>
      </form>
      <Typography>{error?.message}</Typography>
    </Box>
  );
};

export default LoginPage;
