import { useForm } from '@tanstack/react-form';
import { useRegisterMutation } from '../../mutations';
import { Link, useNavigate } from '@tanstack/react-router';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import registerImage from '../../assets/register.jpg';
import { useState } from 'react';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';

const RegisterPage = () => {
  const { mutate: register, isPending, error } = useRegisterMutation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: ({ value }) => {
        const errors: Record<string, string> = {};

        if (!value.email) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
          errors.email = 'Please enter a valid email address';
        }

        if (!value.password) {
          errors.password = 'Password is required';
        } else if (value.password.length < 8) {
          errors.password = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(value.password)) {
          errors.password = 'Password must contain an uppercase letter';
        } else if (!/[a-z]/.test(value.password)) {
          errors.password = 'Password must contain a lowercase letter';
        } else if (!/[0-9]/.test(value.password)) {
          errors.password = 'Password must contain a number';
        } else if (!/[^A-Za-z0-9]/.test(value.password)) {
          errors.password = 'Password must contain a special character';
        }

        if (value.password !== value.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }

        return Object.keys(errors).length > 0 ? { fields: errors } : undefined;
      },
    },
    onSubmit: async ({ value }) => {
      register(value, {
        onSuccess: () => navigate({ to: '/user', replace: true }),
      });
    },
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '90vh' }}>
      <img
        src={registerImage}
        alt="Register Image"
        style={{
          width: '50vw',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ alignSelf: 'flex-start' }} variant="h2">
            FABRIK
          </Typography>
          <Typography sx={{ alignSelf: 'flex-start' }} variant="h1">
            Create Account
          </Typography>
          <Typography sx={{ mb: 4, alignSelf: 'flex-start' }} variant="subtitle1">
            Already have an account?{' '}
            <Link to={'/login'} style={{ color: 'inherit' }}>
              Sign in
            </Link>
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
              <form.Field name="email">
                {(field) => (
                  <TextField
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    label={'Email'}
                    error={!!field.state.meta.errors.length}
                    helperText={field.state.meta.errors[0]}
                    sx={{ width: '30vw' }}
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
                    error={!!field.state.meta.errors.length}
                    helperText={field.state.meta.errors[0]}
                    type={showPassword ? 'text' : 'password'}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    label={'Password'}
                    sx={{ width: '30vw' }}
                  />
                )}
              </form.Field>
              <form.Field name="confirmPassword">
                {(field) => (
                  <Box>
                    <TextField
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      error={!!field.state.meta.errors.length}
                      helperText={field.state.meta.errors[0]}
                      type={showPassword ? 'text' : 'password'}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      label={'Confirm Password'}
                      sx={{ width: '30vw' }}
                    />
                  </Box>
                )}
              </form.Field>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,
                gap: 2,
              }}
            >
              <Button variant={'contained'} type="submit" disabled={isPending} fullWidth>
                {isPending ? 'Creating...' : 'Create Account'}
              </Button>
            </Box>
          </form>
          <Typography>{error?.message}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
