import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  Divider,
  Rating,
  TextField,
  Typography,
} from '@mui/material';

import { reviewsQueryOptions, currentUserQueryOptions } from '../../queries';
import { useAddReviewMutation } from '../../mutations';

type ReviewsSectionProps = {
  listingId: string;
};

const getErrorMessage = (error: unknown) => {
  const possibleApiError = error as {
    response?: { data?: { message?: string } };
  };

  return (
    possibleApiError.response?.data?.message ??
    'Unable to submit your review.'
  );
};

const ReviewsSection = ({ listingId }: ReviewsSectionProps) => {
  const { data: reviewPage, isLoading } = useQuery(
    reviewsQueryOptions(listingId),
  );

  const { data: currentUser } = useQuery(currentUserQueryOptions());

  const addReviewMutation = useAddReviewMutation(listingId);

  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!currentUser || !rating) {
      return;
    }

    addReviewMutation.mutate(
      {
        listingId,
        userId: currentUser.id,
        rating,
        comment: comment.trim() || undefined,
      },
      {
        onSuccess: () => {
          setComment('');
          setRating(5);
        },
      },
    );
  };

  const reviews = reviewPage?.content ?? [];

  return (
    <Box sx={{ mt: 6 }}>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="h3" sx={{ mb: 2 }}>
        Reviews
      </Typography>

      {currentUser ? (
        <Box sx={{ mb: 4, maxWidth: 520 }}>
          <Typography sx={{ mb: 1 }}>Write a review</Typography>

          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
          />

          <TextField
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Share your thoughts (optional)"
            multiline
            rows={3}
            fullWidth
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!rating || addReviewMutation.isPending}
            sx={{ mt: 2 }}
          >
            {addReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
          </Button>

          {addReviewMutation.isError && (
            <Typography color="error" sx={{ mt: 1 }}>
              {getErrorMessage(addReviewMutation.error)}
            </Typography>
          )}
        </Box>
      ) : (
        <Typography sx={{ mb: 4 }}>
          Sign in to write a review.
        </Typography>
      )}

      {isLoading ? (
        <Typography>Loading reviews...</Typography>
      ) : reviews.length === 0 ? (
        <Typography>No reviews yet. Be the first to review this item.</Typography>
      ) : (
        reviews.map((review) => (
          <Box key={review.id} sx={{ mb: 3 }}>
            <Rating value={review.rating} readOnly size="small" />

            {review.comment && (
              <Typography sx={{ mt: 0.5 }}>{review.comment}</Typography>
            )}

            <Typography variant="body2" color="text.secondary">
              {new Date(review.createdDate).toLocaleDateString()}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default ReviewsSection;