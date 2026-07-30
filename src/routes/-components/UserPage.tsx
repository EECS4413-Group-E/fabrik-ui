import { type ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { useAuth } from '../../hooks/useAuth';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';

import { useChangeEmailMutation, useChangePasswordMutation, useLogoutMutation } from '../../mutations';
import { currentUserQueryOptions, ordersQueryOptions, wishlistQueryOptions } from '../../queries';
import { fabrikColors } from '../../theme';
import { useNavigate } from '@tanstack/react-router';

const UserPage = () => {
  const logoutMutation = useLogoutMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const changeEmailMutation = useChangeEmailMutation();

  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { isLoggedIn } = useAuth();

  const { data: user, isLoading: isUserLoading, isError: isUserError } = useQuery(currentUserQueryOptions());
  const { data: wishlist = [],isLoading: isWishlistLoading } = useQuery(wishlistQueryOptions(isLoggedIn));
  const { data: orders = [], isLoading: isOrdersLoading } = useQuery(ordersQueryOptions());

  const displayedEmail = user?.email ?? '';
  const avatarInitial = displayedEmail.charAt(0).toUpperCase();
  const createdDateValue = user?.createdDate;

 const memberSince = (() => {
   if (!createdDateValue) {
    return 'Unavailable';
   }

  const createdDate = new Date(createdDateValue);

  if (Number.isNaN(createdDate.getTime())) {
    return 'Unavailable';
  }
  return new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(createdDate);
  })();

  const accountType = user?.role === 'ADMIN' ? 'Administrator' : 'Customer';
  const emailForm = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: ({ value }) => {
      const normalizedEmail = value.email.trim();

      if (normalizedEmail === displayedEmail) {
        setIsEmailDialogOpen(false);
        return;
      }

      changeEmailMutation.mutate(
        { newEmail: normalizedEmail },
        {
          onSuccess: () => {
            setIsEmailDialogOpen(false);
            setSnackbarMessage(
              'Your email address was updated successfully.',
            );
          },
        },
      );
    },
  });

  const passwordForm = useForm({
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: ''},
    onSubmit: ({ value }) => {
      changePasswordMutation.mutate(
        {
          oldPassword: value.oldPassword,
          newPassword: value.newPassword,
        },
        {
          onSuccess: () => {
            setIsPasswordDialogOpen(false);
            passwordForm.reset();
            setSnackbarMessage(
              'Your password was changed successfully.',
            );
          },
        },
      );
    },
  });

  

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  

  const handleOpenPasswordDialog = () => {
    passwordForm.reset();
    changePasswordMutation.reset();
    setIsPasswordDialogOpen(true);
  };

  const handleClosePasswordDialog = () => {
    if (changePasswordMutation.isPending) {
      return;
    }

    setIsPasswordDialogOpen(false);
    passwordForm.reset();
    changePasswordMutation.reset();
  };

  const handleCloseEmailDialog = () => {
    if (changeEmailMutation.isPending) {
      return;
    }

    setIsEmailDialogOpen(false);
    changeEmailMutation.reset();
  };

  const handleOpenEmailDialog = () => {
    emailForm.reset({ email: displayedEmail });
    changeEmailMutation.reset();
    setIsEmailDialogOpen(true);
  };

  

  if (isUserLoading) {
    return (
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isUserError || !user) {
    return (
      <Box
        sx={{
          minHeight: '70vh',
          backgroundColor: 'background.default',
          px: { xs: 2, md: 4 },
          py: 6,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Alert severity="error">
            We could not load your account information. Please try again.
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Stack spacing={1} sx={{ mb: { xs: 4, md: 5 } }}>
          <Typography component="h1" variant="h1">
            My Account
          </Typography>

          <Typography color="text.secondary">
            Manage your account information, rewards, and security.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent
                sx={{
                  p: { xs: 3, md: 4 },
                  '&:last-child': { pb: { xs: 3, md: 4 } },
                }}
              >
                <Stack spacing={2.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 112,
                      height: 112,
                      backgroundColor: fabrikColors.terracotta,
                      color: 'primary.contrastText',
                      fontFamily: "'Italiana', serif",
                      fontSize: '2rem',
                    }}
                  >
                    {avatarInitial}
                  </Avatar>

                  <Box>
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                      {accountType}
                    </Typography>
                  </Box>

                  <Divider flexItem />

                  <Stack spacing={1.75} sx={{ width: '100%' }}>
                    <ProfileSummaryRow
                      icon={<EmailOutlinedIcon fontSize="small" />}
                      label="Email"
                      value={displayedEmail}
                    />

                    <ProfileSummaryRow
                      icon={<CalendarMonthOutlinedIcon fontSize="small" />}
                      label="Member since"
                      value={memberSince}
                    />

                    <ProfileSummaryRow
                      icon={<PersonOutlineOutlinedIcon fontSize="small" />}
                      label="Account type"
                      value={accountType}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              <Card>
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    '&:last-child': { pb: { xs: 3, md: 4 } },
                  }}
                >
                  <Box>
                    <Typography variant="h6" component="h2" sx={{ textTransform: 'uppercase' }}>
                      Account Information
                    </Typography>

                    <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                      Review and update your account details.
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5, letterSpacing: '0.04em' }}
                      >
                        Email address
                      </Typography>

                      <Typography sx={{ fontWeight: 500, wordBreak: 'break-word' }}>
                        {displayedEmail}
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      startIcon={<EditOutlinedIcon />}
                      onClick={handleOpenEmailDialog}
                    >
                      Edit email
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              <Card
                sx={{
                  backgroundColor: fabrikColors.charcoal,
                  color: fabrikColors.parchment,
                  borderColor: fabrikColors.charcoal,
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    '&:last-child': { pb: { xs: 3, md: 4 } },
                  }}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                    }}
                  >
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          display: 'grid',
                          placeItems: 'center',
                          backgroundColor: fabrikColors.terracotta,
                          color: 'primary.contrastText',
                        }}
                      >
                        <StarsOutlinedIcon />
                      </Box>

                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: fabrikColors.border, letterSpacing: '0.08em' }}
                        >
                          FABRIK REWARDS
                        </Typography>

                        <Typography variant="h2" sx={{ color: fabrikColors.parchment, mt: 0.5 }}>
                          {user.storePoints} points
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography sx={{ maxWidth: 300, color: fabrikColors.border }}>
                      Earn store points when you shop and use them toward future rewards.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              <Box>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mb: 2, textTransform: 'uppercase' }}
                >
                  Account Overview
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                      icon={<ShoppingBagOutlinedIcon />}
                      label="Orders"
                      value={isOrdersLoading ? '—' : orders.length}
                      link="/orders"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                      icon={<FavoriteBorderOutlinedIcon />}
                      label="Wishlist"
                      value={isWishlistLoading ? '—' : wishlist.length}
                      link="/wishlist"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                      icon={<StarsOutlinedIcon />}
                      label="Points"
                      value={user.storePoints}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Card>
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    '&:last-child': { pb: { xs: 3, md: 4 } },
                  }}
                >
                  <Typography variant="h6" component="h2" sx={{ textTransform: 'uppercase' }}>
                    Security
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                    Manage your account password and sign-in security.
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                    }}
                  >
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          display: 'grid',
                          placeItems: 'center',
                          backgroundColor: fabrikColors.parchment,
                          border: `1px solid ${fabrikColors.border}`,
                          color: fabrikColors.charcoal,
                        }}
                      >
                        <LockOutlinedIcon />
                      </Box>

                      <Box>
                        <Typography sx={{ fontWeight: 500 }}>Password</Typography>
                        <Typography color="text.secondary">••••••••••••</Typography>
                      </Box>
                    </Stack>

                    <Button variant="outlined" onClick={handleOpenPasswordDialog}>
                      Change password
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    '&:last-child': { pb: { xs: 3, md: 4 } },
                  }}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: { xs: 'stretch', sm: 'center' },
                    }}
                  >
                    <Box>
                      <Typography variant="h6" component="h2" sx={{ textTransform: 'uppercase' }}>
                        Finished for now?
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                        Sign out securely from your Fabrik account.
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      startIcon={<LogoutOutlinedIcon />}
                      disabled={logoutMutation.isPending}
                      onClick={handleLogout}
                    >
                      {logoutMutation.isPending ? 'Signing out...' : 'Log out'}
                    </Button>
                  </Stack>

                  {logoutMutation.isError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      We could not log you out. Please try again.
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        <Dialog
          open={isEmailDialogOpen}
          onClose={handleCloseEmailDialog}
          fullWidth
          maxWidth="xs"
          slotProps={{
            paper: {
              sx: {
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
              },
            },
          }}
        >
          <DialogTitle>
            <Typography variant="h3" component="span">
              Update email address
            </Typography>
          </DialogTitle>

          <DialogContent>
            {changeEmailMutation.isError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Your email address could not be updated. Please try again.
              </Alert>
            )}
            <emailForm.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const normalizedEmail = value.trim();

                  if (!normalizedEmail) {
                    return 'Email is required';
                  }

                  if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ) {
                    return 'Please enter a valid email address';
                  }
                  return undefined;
                },
              }}> 
              {(field) => (
                <TextField
                  autoFocus
                  fullWidth
                  required
                  type="email"
                  label="Email address"
                  value={field.state.value}
                  disabled={changeEmailMutation.isPending}
                  error={field.state.meta.errors.length > 0}
                  helperText={field.state.meta.errors[0] ?? ' '}
                  onChange={(event) => {
                    field.handleChange(event.target.value);
                    changeEmailMutation.reset();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      void emailForm.handleSubmit();
                    }
                  }}
                />
              )}
            </emailForm.Field>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              color="inherit"
              disabled={changeEmailMutation.isPending}
              onClick={handleCloseEmailDialog}
            >
              Cancel
            </Button>

            <emailForm.Subscribe
              selector={(state) => state}>
              {(state) => (
                <Button
                  variant="contained"
                  disabled={ changeEmailMutation.isPending ||
                    !state.canSubmit ||
                    state.values.email.trim() === displayedEmail }
                  onClick={() => void emailForm.handleSubmit()}
                >
                  {changeEmailMutation.isPending ? 'Saving...' : 'Save'}
                </Button>
              )}
            </emailForm.Subscribe>
          </DialogActions>
        </Dialog>

        <Dialog
          open={isPasswordDialogOpen}
          onClose={handleClosePasswordDialog}
          fullWidth
          maxWidth="xs"
          slotProps={{
            paper: {
              sx: {
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
              },
            },
          }}
        >
          <DialogTitle>
            <Typography variant="h3" component="span">
              Change password
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Typography color="text.secondary">
                Enter your current password and choose a new password.
              </Typography>

              {changePasswordMutation.isError && (
                <Alert severity="error">
                  Your password could not be changed. Check your current password and try again.
                </Alert>
              )}

              <passwordForm.Field
                name="oldPassword"
                validators={{
                  onChange: ({ value }) =>
                    value.trim()
                      ? undefined
                      : 'Current password is required',
                }}>
                {(field) => (
                  <TextField
                    autoFocus
                    fullWidth
                    required
                    type="password"
                    label="Current password"
                    value={field.state.value}
                    disabled={changePasswordMutation.isPending}
                    error={field.state.meta.errors.length > 0}
                    helperText={field.state.meta.errors[0] ?? ' '}
                    onChange={(event) => {
                      field.handleChange(event.target.value);
                      changePasswordMutation.reset();
                    }}/>
                )}
              </passwordForm.Field>

              <passwordForm.Field
                name="newPassword"
                validators={{
                  onChangeListenTo: ['oldPassword'],
                  onChange: ({ value, fieldApi }) => {
                    if (!value) {
                      return 'New password is required';
                    }

                    if (value.length < 8) {
                      return 'Password must be at least 8 characters';
                    }

                    if (!/[A-Z]/.test(value)) {
                      return 'Password must contain an uppercase letter';
                    }

                    if (!/[a-z]/.test(value)) {
                      return 'Password must contain a lowercase letter';
                    }

                    if (!/[0-9]/.test(value)) {
                      return 'Password must contain a number';
                    }

                    if (!/[^A-Za-z0-9]/.test(value)) {
                      return 'Password must contain a special character';
                    }

                    if ( value === fieldApi.form.getFieldValue('oldPassword')) {
                      return ( 'Your new password must be different from your current password'
                      );
                    }

                    return undefined;
                  },
                }}>
                {(field) => (
                  <TextField
                    fullWidth
                    required
                    type="password"
                    label="New password"
                    value={field.state.value}
                    disabled={changePasswordMutation.isPending}
                    error={field.state.meta.errors.length > 0}
                    helperText={field.state.meta.errors[0] ?? ' '}
                    onChange={(event) => {
                      field.handleChange(event.target.value);
                      changePasswordMutation.reset();
                    }}
                  />
                )}
              </passwordForm.Field>

              <passwordForm.Field
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ['newPassword'],
                  onChange: ({ value, fieldApi }) => {
                    if (!value) {
                      return 'Please confirm your new password';
                    }
                    if ( value !== fieldApi.form.getFieldValue('newPassword')) {
                      return 'The new passwords do not match';
                    }
                    return undefined;
                  },
                }}>
                {(field) => (
                  <TextField
                    fullWidth
                    required
                    type="password"
                    label="Confirm new password"
                    value={field.state.value}
                    disabled={changePasswordMutation.isPending}
                    error={field.state.meta.errors.length > 0}
                    helperText={field.state.meta.errors[0] ?? ' '}
                    onChange={(event) => {
                      field.handleChange(event.target.value);
                      changePasswordMutation.reset();
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        void passwordForm.handleSubmit();
                      }
                    }}
                  />
                )}
              </passwordForm.Field>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              color="inherit"
              disabled={changePasswordMutation.isPending}
              onClick={handleClosePasswordDialog}
            >
              Cancel
            </Button>

            <passwordForm.Subscribe
              selector={(state) => state.canSubmit}
            >
              {(canSubmit) => (
                <Button
                  variant="contained"
                  disabled={ changePasswordMutation.isPending || !canSubmit }
                  onClick={() => void passwordForm.handleSubmit()}
                >
                  {changePasswordMutation.isPending ? 'Changing password...' : 'Change password'}
                </Button>
              )}
            </passwordForm.Subscribe>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={Boolean(snackbarMessage)}
          autoHideDuration={3500}
          onClose={() => setSnackbarMessage('')}
          message={snackbarMessage}
        />
      </Box>
    </Box>
  );
};

interface ProfileSummaryRowProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const ProfileSummaryRow = ({ icon, label, value }: ProfileSummaryRowProps) => (
  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
    <Box
      sx={{
        mt: 0.25,
        display: 'flex',
        color: fabrikColors.terracottaDark,
      }}
    >
      {icon}
    </Box>

    <Box sx={{ minWidth: 0, textAlign: 'left' }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', letterSpacing: '0.06em', textTransform: 'uppercase' }}
      >
        {label}
      </Typography>

      <Typography variant="body2" sx={{ fontWeight: 500, wordBreak: 'break-word' }}>
        {value}
      </Typography>
    </Box>
  </Stack>
);

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  link?: string;
}

const StatCard = ({ icon, label, value, link }: StatCardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent
        onClick={() => {
          if (link) {
            navigate({ to: link })
          }
        }}
        sx={{ ":hover": { cursor: link ? 'pointer' : 'default' } }}
      >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            display: 'grid',
            placeItems: 'center',
            backgroundColor: fabrikColors.parchment,
            border: `1px solid ${fabrikColors.border}`,
            color: fabrikColors.terracottaDark,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography variant="h3" sx={{ color: 'primary.main', lineHeight: 1 }}>
            {value}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {label}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
)};

export default UserPage;