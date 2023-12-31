import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/utils/api';
import { useRating } from '@/components/context/ratingContext';
import { useAuth } from './useAuth';

export const useProductRating = (id: any) => {
  const { ratingData, setRatingData } = useRating();
  const [commentId, setCommentId] = useState<number[]>([]);
  const { user } = useAuth();

  const fetchProductReviews = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/products/reviews/userReview/${id}`);
      if (response.status === 200) {
        setRatingData((prevData) => ({
          ...prevData,
          ratings: response.data.ratings,
          reviewText: Array.isArray(response.data.review_texts)
            ? response.data.review_texts
            : [response.data.review_texts],
          commentId: response.data.comment_id,
          averageRating: {
            ...prevData.averageRating,
            [id]: response.data.average_rating,
          },
          productId: response.data.product_id,
          userId: response.data.user_id,
        }));
      }
    } catch (error) {
      console.error('Error fetching average rating and reviewText', error);
    }
  }, [id, setRatingData]);

  useEffect(() => {
    fetchProductReviews();
  }, [fetchProductReviews]);

  const handleDeleteComments = useCallback(
    (commentId: number) => {
      axiosInstance
        .delete(`api/products/reviews/deleteReview/${commentId}`, {
          params: {
            userId: user?.id,
          },
        })
        .catch((error) => {
          console.error('Error deleting rating and review text', error);
        });
    },
    [user?.id]
  );

  const [userRating, setUserRating] = useState(0);
  const [reviewUserText, setReviewUserText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const data = {
        rating: userRating,
        review_text: reviewUserText,
        userId: user?.id,
      };

      try {
        const response = await axiosInstance.post(`/api/products/reviews/${id}`, data);

        if (response.status === 201) {
          console.log('Review has been submitted successfully.');
          setUserRating(0);
          setReviewUserText('');
          setErrorMessage('');
        } else {
          console.log('Review submission was not successful.');
          setErrorMessage('Review submission was not successful.');
        }
      } catch (error: any) {
        console.error('Error submitting review', error);
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error submitting review. Please try again later.');
        }
      }
    },
    [id, reviewUserText, user?.id, userRating]
  );

  return {
    commentId,
    setCommentId,
    handleDeleteComments,
    submitHandler,
    errorMessage,
    reviewUserText,
    setReviewUserText,
    userRating,
    setUserRating,
  };
};
