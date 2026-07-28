export interface Review {
  id: string;
  listingId: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdDate: string;
}

export interface ReviewPage {
  content: Review[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface AddReviewRequest {
  listingId: string;
  userId: string;
  rating: number;
  comment?: string;
}