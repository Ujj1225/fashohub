import React from "react";
import { useGetOrderByIdQuery } from "../../store/slices/orderApiSlice";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mantine/core";
import { useGetUserProfileQuery } from "../../store/slices/userApiSlice";
import {
  useUpdateOrderToDeliveredMutation,
  useUpdateOrderToPaidMutation,
} from "../../store/slices/orderApiSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const OrderScreen = () => {
  const { oid } = useParams();
  const { data: order, isLoading, error, refetch } = useGetOrderByIdQuery(oid);
  const { data: user } = useGetUserProfileQuery();
  const [updateOrderToDelivered, { isLoading: deliveryLoading }] =
    useUpdateOrderToDeliveredMutation();
  const [updateOrderToPaid, { isLoading: payLoading }] =
    useUpdateOrderToPaidMutation();

  const handleMarkDelivery = async (oid) => {
    Swal.fire({
      text: "Are you sure the order has been delivered?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, it's delivered!",
      cancelButtonText: "No, cancel",
      width: "300px",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateOrderToDelivered(oid).unwrap();
          toast.success("The order has been marked as delivered");
          refetch();
        } catch (error) {
          toast.error(error?.data?.message || error?.error);
        }
      }
    });
  };
  const handleMarkPay = async (oid) => {
    Swal.fire({
      text: "Are you sure the order has been paid?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, it's paid!",
      cancelButtonText: "No, cancel",
      width: "300px",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateOrderToPaid(oid).unwrap();
          toast.success("The order has been marked as paid");
          refetch();
        } catch (error) {
          toast.error(error?.data?.message || error?.error);
        }
      }
    });
  };

  return (
    <div className="p-10 sm:p-4 xsm:p-2">
      {isLoading ? (
        <div className="flex flex-col gap-y-4">
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </div>
      ) : error ? (
        <p className="font-bold text-center">
          {error.data.message || error.error}
        </p>
      ) : (
        <div className="text-gray-500 font-bold text-base flex flex-col gap-y-2">
          <h2 className="text-lg text-gray-600 font-bold">Order Details:</h2>
          <div className="flex justify-between xsm:flex-col">
            <div>
              <p>Order Id: {order._id}</p>
              <p>
                Payment: {order.isPaid ? "Paid" : "Not Paid"}
                {order.paidAt && <span>, {order.paidAt.slice(0, 10)}</span>}
              </p>
              <p>
                Delivery: {order.isDelivered ? "Delivered" : "Not Delivered"}
                {order.deliveredAt && (
                  <span>, {order.deliveredAt.slice(0, 10)}</span>
                )}
              </p>
              <p>Order Placed On: {order.createdAt.slice(0, 10)}</p>
              <p>Payment Method: {order.paymentMethod}</p>
            </div>
            {(user?.isAdmin || user?.isDeliveryPartner) && (
              <div className="flex flex-col gap-y-2 xsm:mt-2">
                {!order.isDelivered && (
                  <button
                    className="bg-blue-600 font-bold text-white p-2 rounded hover:cursor-pointer hover:bg-blue-500 w-40 sm:w-36"
                    onClick={() => handleMarkDelivery(order._id)}
                    disabled={deliveryLoading}
                  >
                    {deliveryLoading ? "Loading..." : "Mark Delivered"}
                  </button>
                )}
                {!order.isPaid && (
                  <button
                    className="bg-green-600 font-bold text-white p-2 rounded hover:cursor-pointer hover:bg-green-500 w-40 sm:w-36"
                    onClick={() => handleMarkPay(order._id)}
                    disabled={payLoading}
                  >
                    {payLoading ? "Loading..." : "Mark Paid"}
                  </button>
                )}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-bold text-gray-700 mt-2">Customer Details:</h2>
            <div className="flex items-center border px-2 py-1 rounded shadow gap-x-2 xsm:gap-x-1">
              <div className="w-full">
                <p>User Id: {order.user._id}</p>
                <p>Name: {order.user.name}</p>
                <p>Phone: {order.user.phone}</p>
                <p>Email: {order.delivery.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-gray-700 mt-2">Products Details:</h2>
            {order.bag.products.map((product) => (
              <div
                key={product.product}
                className="flex items-center border px-2 py-1 rounded shadow gap-x-2 xsm:gap-x-1"
              >
                <img src={product.image} className="w-20 h-20" alt="img" />
                <div className="w-full">
                  <p className="text-black w-full text-ellipsis whitespace-nowrap overflow-hidden">
                    {product.brand}
                  </p>
                  <p className="font-light text-black text-ellipsis whitespace-nowrap overflow-hidden">
                    {product.name}
                  </p>
                  <div className="flex items-center">
                    <p className="w-1/3">Size: {product.size}</p>
                    <p className="w-1/3">Qty: {product.quantity}</p>
                    <p className="w-1/3">Rs. {product.sellingPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-bold text-gray-700 mt-2">Delivery Details:</h2>
            <div className="flex items-center border px-2 py-1 rounded shadow gap-x-2 xsm:gap-x-1">
              <div className="w-full">
                <p>Area: {order.delivery.area}</p>
                <p>District: {order.delivery.district}</p>
                <p>Province: {order.delivery.province}</p>
                {order.delivery.landmark.replace(/\s+/g, "") !== "" && (
                  <p>Landmark: {order.delivery.landmark}</p>
                )}
                {order.delivery.description.replace(/\s+/g, "") !== "" && (
                  <p>Description: {order.delivery.description}</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-gray-700 mt-2">Price Details:</h2>
            <div className="flex items-center border px-2 py-1 rounded shadow gap-x-2 xsm:gap-x-1">
              <div className="w-full">
                <p>Items Price: Rs. {order.bag.itemPrice}</p>
                <p>Shipping Price: Rs. {order.bag.shippingPrice}</p>
                <p>Total Price: Rs. {order.bag.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderScreen;
