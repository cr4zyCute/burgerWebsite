import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Review } from '../types';
import { SEED_REVIEWS } from '../db/seed-data';

interface ReviewsState {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'isApproved'>) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  toggleFeatured: (id: string) => void;
  deleteReview: (id: string) => void;
  getApprovedReviews: () => Review[];
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: SEED_REVIEWS,

      addReview: (data) => {
        const newReview: Review = {
          ...data,
          id: `rev-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          isApproved: true, // auto-approve for demonstration, can be unapproved in admin
        };
        set((state) => ({ reviews: [newReview, ...state.reviews] }));
      },

      approveReview: (id) => {
        set((state) => ({
          reviews: state.reviews.map((r) => (r.id === id ? { ...r, isApproved: true } : r)),
        }));
      },

      rejectReview: (id) => {
        set((state) => ({
          reviews: state.reviews.map((r) => (r.id === id ? { ...r, isApproved: false } : r)),
        }));
      },

      toggleFeatured: (id) => {
        set((state) => ({
          reviews: state.reviews.map((r) => (r.id === id ? { ...r, isFeatured: !r.isFeatured } : r)),
        }));
      },

      deleteReview: (id) => {
        set((state) => ({
          reviews: state.reviews.filter((r) => r.id !== id),
        }));
      },

      getApprovedReviews: () => {
        return get().reviews.filter((r) => r.isApproved);
      },
    }),
    {
      name: 'burger-craft-reviews',
    }
  )
);
