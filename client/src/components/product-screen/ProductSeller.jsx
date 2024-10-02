import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Skeleton } from "@mantine/core";
import { useGetVendorDetailsQuery } from "../../store/slices/vendorApiSlice";

const ProductSeller = ({ product }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading } = useGetVendorDetailsQuery(product.user);

  return (
    <div className="mt-4">
      <Modal
        opened={opened}
        onClose={close}
        title="Seller Information"
        styles={{ title: { fontWeight: 700, fontSize: "1.5rem" } }}
      >
        {isLoading ? (
          <Skeleton height={400} />
        ) : data ? (
          <div className="flex flex-col gap-y-4">
            <p className="flex flex-col font-bold">
              Name:{" "}
              <span className="text-gray-600 font-medium">{data.name}</span>
            </p>
            <p className="flex flex-col font-bold">
              Location:{" "}
              <span className="text-gray-600 font-medium">{data.location}</span>
            </p>
            <p className="flex flex-col font-bold">
              Contact:{" "}
              <span className="text-gray-600 font-medium">{data.contact}</span>
            </p>
            <p className="flex flex-col font-bold">
              Description:{" "}
              <span className="text-gray-600 font-medium">{data.name}</span>
            </p>
              <p className="flex flex-col font-bold text-[#FF3E6B]">
                email@email.com | +977 98400112233
            </p>
          </div>
        ) : (
          <p>Information about seller currently unavailable.</p>
        )}
      </Modal>

      <div>
        Seller:{" "}
        <span
          className="font-bold text-[#FF3E6B] hover:cursor-pointer"
          onClick={open}
        >
          {data?.name || product.seller}
        </span>{" "}
      </div>
    </div>
  );
};

export default ProductSeller;
