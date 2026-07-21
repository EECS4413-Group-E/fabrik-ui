import { useForm } from '@tanstack/react-form';
import { useRegisterMutation } from '../../mutations';
import { Link, useNavigate } from '@tanstack/react-router';
import { Box, Button, TextField, Typography } from '@mui/material';

const RegisterPage = () => {
  const { mutate: register, isPending, error } = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      register(value, {
        onSuccess: () => navigate({ to: '/user', replace: true }),
      });
    },
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant={'h1'} sx={{ mb: 2 }}>
        Register
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
          <form.Field
            name="confirmPassword"
            validators={{
              onChangeListenTo: ['password'],
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue('password')) {
                  return 'Passwords do not match';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <Box>
                <TextField
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="password"
                  label={'Confirm Password'}
                ></TextField>
                {field.state.meta.errors.map((err) => (
                  <Box key={err}>{err}</Box>
                ))}
              </Box>
            )}
          </form.Field>
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, gap: 2 }}
        >
          <Button variant={'contained'} type="submit" disabled={isPending}>
            {isPending ? 'Registering...' : 'Register'}
          </Button>
          <Link to="/login">Login</Link>
        </Box>
      </form>
      <Typography>{error?.message}</Typography>
    </Box>
  );
};

export default RegisterPage;
