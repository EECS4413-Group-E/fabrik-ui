import { type ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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

import { fetchCurrentUser, fetchOrders, fetchWishlist } from '../../Api';
import { useChangeEmailMutation, useChangePasswordMutation, useLogoutMutation } from '../../mutations';
import { queryKeys } from '../../queries';
import { fabrikColors } from '../../theme';

const UserPage = () => {
  const logoutMutation = useLogoutMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const changeEmailMutation = useChangeEmailMutation();

  const [emailInput, setEmailInput] = useState('');
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');

  const { data: user, isLoading: isUserLoading, isError: isUserError } = useQuery({
    queryKey: queryKeys.currentUser(),
    queryFn: fetchCurrentUser,
  });

  const { data: wishlist = [], isLoading: isWishlistLoading } = useQuery({
    queryKey: queryKeys.wishlist(),
    queryFn: fetchWishlist,
  });

  const { data: orders = [], isLoading: isOrdersLoading } = useQuery({
    queryKey: queryKeys.orders(),
    queryFn: fetchOrders,
  });

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
  const handleSaveEmail = () => {
    const normalizedEmail = emailInput.trim();
    if (!normalizedEmail) {
      return;
    }
    if (normalizedEmail === displayedEmail) {
      setIsEmailDialogOpen(false);
      return;
    }
    changeEmailMutation.mutate(
      {newEmail: normalizedEmail},
      {
        onSuccess: () => {
          setIsEmailDialogOpen(false);
          setSnackbarMessage('Your email address was updated successfully.');
        },
      },
    );
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const resetPasswordForm = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordValidationError('');
  };

  const handleOpenPasswordDialog = () => {
    resetPasswordForm();
    changePasswordMutation.reset();
    setIsPasswordDialogOpen(true);
  };

  const handleClosePasswordDialog = () => {
    if (changePasswordMutation.isPending) {
      return;
    }

    setIsPasswordDialogOpen(false);
    resetPasswordForm();
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
    setEmailInput(displayedEmail);
    changeEmailMutation.reset();
    setIsEmailDialogOpen(true);
  };

  const handleChangePassword = () => {
    setPasswordValidationError('');

    if (
      !oldPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      setPasswordValidationError('All password fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordValidationError('The new passwords do not match.');
      return;
    }

    if (oldPassword === newPassword) {
      setPasswordValidationError(
        'Your new password must be different from your current password.',
      );
      return;
    }

    changePasswordMutation.mutate(
      {
        oldPassword,
        newPassword,
      },
      {
        onSuccess: () => {
          setIsPasswordDialogOpen(false);
          resetPasswordForm();
          setSnackbarMessage('Your password was changed successfully.');
        },
      },
    );
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
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <StatCard
                      icon={<FavoriteBorderOutlinedIcon />}
                      label="Wishlist"
                      value={isWishlistLoading ? '—' : wishlist.length}
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

            <TextField
              autoFocus
              fullWidth
              required
              type="email"
              label="Email address"
              value={emailInput}
              disabled={changeEmailMutation.isPending}
              onChange={(event) => {
                setEmailInput(event.target.value);
                changeEmailMutation.reset();
              }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              color="inherit"
              disabled={changeEmailMutation.isPending}
              onClick={handleCloseEmailDialog}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              disabled={
                changeEmailMutation.isPending ||
                !emailInput.trim() ||
                emailInput.trim() === displayedEmail
              }
              onClick={handleSaveEmail}
            >
              {changeEmailMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
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

              {passwordValidationError && (
                <Alert severity="error">{passwordValidationError}</Alert>
              )}

              {changePasswordMutation.isError && (
                <Alert severity="error">
                  Your password could not be changed. Check your current password and try again.
                </Alert>
              )}

              <TextField
                autoFocus
                fullWidth
                required
                type="password"
                label="Current password"
                value={oldPassword}
                disabled={changePasswordMutation.isPending}
                onChange={(event) => {
                  setOldPassword(event.target.value);
                  setPasswordValidationError('');
                }}
              />

              <TextField
                fullWidth
                required
                type="password"
                label="New password"
                value={newPassword}
                disabled={changePasswordMutation.isPending}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                  setPasswordValidationError('');
                }}
              />

              <TextField
                fullWidth
                required
                type="password"
                label="Confirm new password"
                value={confirmPassword}
                disabled={changePasswordMutation.isPending}
                error={Boolean(confirmPassword) && newPassword !== confirmPassword}
                helperText={
                  Boolean(confirmPassword) && newPassword !== confirmPassword
                    ? 'The passwords do not match.'
                    : ' '
                }
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setPasswordValidationError('');
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleChangePassword();
                  }
                }}
              />
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

            <Button
              variant="contained"
              disabled={
                changePasswordMutation.isPending ||
                !oldPassword.trim() ||
                !newPassword.trim() ||
                !confirmPassword.trim() ||
                newPassword !== confirmPassword
              }
              onClick={handleChangePassword}
            >
              {changePasswordMutation.isPending
                ? 'Changing password...'
                : 'Change password'}
            </Button>
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
}

const StatCard = ({ icon, label, value }: StatCardProps) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
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
);

export default UserPage;