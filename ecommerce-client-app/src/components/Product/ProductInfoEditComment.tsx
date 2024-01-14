import React, { useState } from 'react';
import axiosInstance from '@/utils/api';
import ButtonPrimary from '@/components/button/ButtonPrimary';
import ButtonSecondary from '@/components/button/ButtonSecondary';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useProductRating } from '../hooks/useProductRating';
import { useRating } from '../context/ratingContext';

interface ProductInfoEditCommentProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  review: any;
  commentId: any;
  ratingsValues?: any;
}

const ProductInfoEditComment = ({
  setIsEditing,
  review,
  ratingsValues,
  commentId,
}: ProductInfoEditCommentProps) => {
  const [editedReview, setEditedReview] = useState(review);
  const [editedRating, setEditedRating] = useState(ratingsValues);
  const { user } = useAuth();
  const { setIsChangesSaved, isChangesSaved } = useRating();
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      axiosInstance.put(`/api/products/reviews/editReview/${commentId}`, {
        rating: editedRating,
        review_text: editedReview,
        userId: user?.id,
      });
      setIsEditing(false);
      setIsChangesSaved(true);
    } catch (error) {
      console.error(error);
    }
  };
  {console.log(isChangesSaved)}
  return (
    <div className="fixed z-20 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg">
        <h2 className="text-sm font-semibold">Change your mind? </h2>
        <div className="p-3 rounded-md mt-4 shadow-ShadowCard">
          <div className="flex justify-start gap-2 mb-10">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <div key={index} className="mr-2">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      className="relative left-6 opacity-0 sm:top-6 sm:left-1"
                      value={currentRating}
                      checked={editedRating === currentRating}
                      onChange={() => setEditedRating(currentRating)}
                    />
                    <FaStar
                      size={20}
                      color={currentRating <= editedRating ? 'yellow' : 'grey'}
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <input
            type="text"
            value={editedReview}
            onChange={(e) => setEditedReview(e.target.value)}
          />
        </div>
        <div className="mt-10 flex justify-center z-20">
          <ButtonSecondary onClick={handleCancelEdit}>Close</ButtonSecondary>
          <ButtonPrimary onClick={handleSaveEdit}>Save</ButtonPrimary>
        </div>
        {isChangesSaved && (
          <>
            <div className="fixed bg-gray-500 w-screen border-black h-40 bottom-0">
              <div className="p-2">
                <p>bang udah kekirim</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductInfoEditComment;
