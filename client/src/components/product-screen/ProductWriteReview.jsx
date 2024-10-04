import React, { useState } from "react";
import { FaPenNib } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useWriteAReviewMutation } from "../../store/slices/productsApiSlice";
import { toast } from "react-toastify";
import ReviewTextArea from "../copilotkit/reviewTextArea";

const ProductWriteReview = ({ productId, productRefetch }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [writeAReview, { isLoading }] = useWriteAReviewMutation();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    close();
    try {
      await writeAReview({ productId, rating, comment }).unwrap();
      toast.success("Product successfully reviewed.");
      productRefetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
    const handleReviewChange = (value) => {
      setComment(value);
    };

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Write A Review">
        <h2 className="font-bold text-sm">Select Rating</h2>
        <form className="flex flex-col" onSubmit={handleReviewSubmit}>
          <select
            name="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded px-2 py-1"
            required
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Terrible</option>
          </select>
          <h2 className="font-bold text-sm mt-2">Write a Review</h2>
          {/* <textarea
            name="comment"
            rows="4"
            className="border px-2 py-1 rounded"
            placeholder="Leave a review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            maxLength={200}
          ></textarea> */}
          <ReviewTextArea value={comment} onReviewChange={handleReviewChange} />
          <button
            type="submit"
            className="mt-2 border py-1 px-2 rounded bg-[#FF3E6B] text-white font-bold"
          >
            {isLoading ? "Writing..." : "Submit"}
          </button>
        </form>
      </Modal>
      <button
        className="flex items-center gap-x-2 border py-0.5 px-2 text-gray-600 rounded border-gray-300 hover:border-black mt-2"
        onClick={open}
      >
        Leave a Review... <FaPenNib />
      </button>
    </div>
  );
};

export default ProductWriteReview;
