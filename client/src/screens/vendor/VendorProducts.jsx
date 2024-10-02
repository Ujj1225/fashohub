import React from "react";
import {
  useGetProductByVendorQuery,
  useDeleteProductMutation,
} from "../../store/slices/productsApiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const VendorProducts = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: vendorProducts,
    isLoading: productsLoading,
    isError: productsError,
    error: fetchError,
    refetch,
  } = useGetProductByVendorQuery(userInfo._id);

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the product?")) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
        toast.success("Product deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full">
      <h2 className="text-xl font-semibold">Your Products</h2>
      {productsLoading && (
        <p className="text-lg font-semibold">Loading your products...</p>
      )}
      {loadingDelete && (
        <p className="text-lg font-semibold">Deleting product...</p>
      )}
      {productsError && <p>{fetchError.message}</p>}
      <table className="w-5/6 bg-gray-50 border border-collapse mt-4 md:w-full md:text-sm">
        <thead>
          <tr>
            <th className="border p-2">NAME</th>
            <th className="border p-2">IMAGE</th>
            <th className="border p-2 sm:hidden">SELLING PRICE</th>
            <th className="border p-2 md:hidden">PRIMARY CATEGORY</th>
            <th className="border p-2 md:hidden">BRAND</th>
          </tr>
        </thead>
        <tbody>
          {vendorProducts && vendorProducts.length > 0
            ? vendorProducts.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2 overflow-hidden whitespace-nowrap text-ellipsis w-auto hover:underline hover:text-blue-800">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </td>
                  <td className="border p-2">
                    <img className="w-10 h-10" src={item.image1} alt="item" />
                  </td>
                  <td className="border p-2 sm:hidden">
                    Rs. {item.sellingPrice}
                  </td>
                  <td className="border p-2 md:hidden">
                    {item.primaryCategory}
                  </td>
                  <td className="border p-2 md:hidden">{item.brand}</td>
                  <td className="border py-2 pl-6 pr-0 ">
                    <Link to={`/vendor/product/${item._id}/edit`}>
                      <button className="mr-4 sm:mr-1">
                        <FaEdit color="blue" />
                      </button>
                    </Link>
                    <button
                      className="ml-4 sm:ml-1"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrash style={{ color: "red" }} />
                    </button>
                  </td>
                </tr>
              ))
            : !productsLoading && (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No products found.
                  </td>
                </tr>
              )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorProducts;
