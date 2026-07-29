import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Rating,
  TextField,
  Typography,
} from '@mui/material';

import { reviewsQueryOptions } from '../../queries';
import { useAddReviewMutation } from '../../mutations';
import { useForm } from '@tanstack/react-form';
import type { AddReviewRequest } from '../../models/Review';
import { useAuth } from '../../hooks/useAuth';
import { fabrikColors } from '../../theme';

type ReviewsSectionProps = {
  listingId: string;
};

const getErrorMessage = (error: unknown) => {
  const possibleApiError = error as {
    response?: { data?: { message?: string } };
  };

  return possibleApiError.response?.data?.message ?? 'Unable to submit your review.';
};

const ReviewsSection = ({ listingId }: ReviewsSectionProps) => {
  const { data: reviewPage, isLoading } = useQuery(reviewsQueryOptions(listingId));

  const { isLoggedIn } = useAuth();

  const { mutate: addReview, isPending, isError, error } = useAddReviewMutation(listingId);

  const [rating] = useState<number | null>(5);

  const form = useForm({
    defaultValues: {
      rating: 5,
      comment: '',
    } as AddReviewRequest,
    onSubmit: async ({ value }) => {
      addReview(value, {});
    },
  });

  const reviews = reviewPage?.content ?? [];

  return (
    <Box sx={{ mt: 6 }}>
      <Divider sx={{ mb: 3 }} />
      <Box sx= {{ my: 2 }}>
        <Typography variant="h3" sx={{ my: 2 }}>
          Reviews   
        </Typography>
        <Typography variant="body1">
          Love it? Leave a review!
        </Typography>
      </Box>
      {isLoggedIn ? (
        <Box sx={{ mb: 4, maxWidth: 520 }}>
          <form>
            <form.Field name="rating">
              {(field) => (
                <Rating
                  value={field.state.value}
                  onChange={(_, newValue) => field.handleChange(newValue as number)}
                />
              )}
            </form.Field>

            <form.Field name="comment">
              {(field) => (
                <TextField
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Share your thoughts (optional)"
                  multiline
                  rows={3}
                  fullWidth
                  sx={{ mt: 2 }}
                />
              )}
            </form.Field>

            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              disabled={!rating || isPending}
              sx={{ mt: 2 }}
            >
              {isPending ? 'Submitting...' : 'Submit Review'}
            </Button>

            {isError && (
              <Typography color="error" sx={{ mt: 1 }}>
                {getErrorMessage(error)}
              </Typography>
            )}
          </form>
        </Box>
      ) : (
        <Typography sx={{ mb: 4 }}>Sign in to write a review.</Typography>
      )}
      <Divider sx={{ mb: 2 }} />

      {isLoading ? (
        <CircularProgress />
      ) : reviews.length === 0 ? (
        <Typography>No reviews yet. Be the first to review this item.</Typography>
      ) : (
        reviews.map((review) => (
          <Box
            key={review.id}
            sx={{ mb: 3, backgroundColor: fabrikColors.linen, py: 3, px: 2, borderRadius: 1 }}
          >
            <Rating value={review.rating} readOnly size="small" />
            <Typography variant="body2" color="textSecondary">
              {new Date(review.createdDate).toLocaleDateString()}
            </Typography>
            <Divider sx={{ my: 1 }} />

            {review.comment && (
              <Typography variant="body1" sx={{ mt: 0.5, my: 2 }}>
                {review.comment}
              </Typography>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

export default ReviewsSection;
