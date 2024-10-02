import React, { useState } from "react";
import { useGetOrderByIdQuery } from "../../store/slices/orderApiSlice";
import { useParams } from "react-router-dom";
import { Skeleton, Modal, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useGetDeliveryPartnersQuery } from "../../store/slices/userApiSlice";
import { useAssignOrderMutation } from "../../store/slices/orderApiSlice";
import { toast } from "react-toastify";

const AdminOrderAssignment = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState();

  const { oid } = useParams();
  const {
    data: order,
    isLoading: orderLoading,
    error: orderError,
    refetch: orderRefetch,
  } = useGetOrderByIdQuery(oid);
  const {
    data: dp,
    isLoading: dpLoading,
    error: dpError,
    refetch: dpRefetch,
  } = useGetDeliveryPartnersQuery();

  const [assignOrder, { isLoading: assignLoading }] = useAssignOrderMutation();

  const handleAssignOrder = async () => {
    if (selectedPartnerId) {
      try {
        await assignOrder({ oid, dpid: selectedPartnerId }).unwrap();
        orderRefetch();
        close();
        dpRefetch();
        toast.success("Order assigned successfully.");
      } catch (error) {
        toast.error("Failed to assign order", error);
      }
    }
  };

  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full p-2">
      <h2 className="text-xl font-semibold">Order Assignment</h2>
      {orderLoading ? (
        <div className="flex flex-col gap-y-2 w-[75%] md:w-full">
          <Skeleton height={50} />
          <Skeleton height={50} />
        </div>
      ) : orderError ? (
        <p>{orderError?.data?.meesage}</p>
      ) : (
        <div className="">
          <p className="font-bold text-gray-600 mt-4">Order ID: {order._id}</p>
          <p className="font-bold text-gray-600 mt-4">
            Customer ID: {order.user._id}
          </p>
          <p className="font-bold text-gray-600 mt-4">
            Customer Name: {order.user.name}
          </p>
          <p className="font-bold text-gray-600 mt-4">
            Customer Phone: {order.user.phone}
          </p>
          <div className="font-bold text-gray-600 mt-4 bg-green-300 border p-1 rounded">
            Assigned To:{" "}
            {order?.assignedTo ? (
              <span>{order?.assignedTo}</span>
            ) : (
              "Not yet assigned"
            )}
          </div>
          <button
            className="font-bold text-sm text-center w-full border rounded py-1 mt-4 hover:border-black"
            onClick={open}
          >
            Assign Order
          </button>
        </div>
      )}
      <Modal opened={opened} onClose={close} title="Delivery Partners">
        {dpLoading ? (
          <div>
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
          </div>
        ) : dpError ? (
          <p>{dpError.data.message}</p>
        ) : (
          <>
            <div className="flex flex-col gap-y-4">
              {dp.length === 0 ? (
                <p>No delivery partners</p>
              ) : (
                <>
                  {dp.map((partner) => (
                    <div key={partner._id} className="w-full">
                      <button
                        className={`flex flex-row xsm:flex-col gap-x-4 border p-1 rounded-sm w-full ${
                          selectedPartnerId === partner._id ? "bg-gray-200" : ""
                        } ${
                          order?.assignedTo &&
                          order?.assignedTo === partner._id &&
                          "border-2 border-green-400"
                        }`}
                        onClick={() => setSelectedPartnerId(partner._id)}
                      >
                        <p>{partner.name}</p>
                        <p>{partner._id}</p>
                      </button>
                      <Divider my={"xs"} />
                    </div>
                  ))}
                  <button
                    className="bg-blue-500 text-white rounded-sm py-0.5"
                    onClick={handleAssignOrder}
                    disabled={!selectedPartnerId || assignLoading}
                  >
                    {assignLoading ? "Saving..." : "Save"}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrderAssignment;
