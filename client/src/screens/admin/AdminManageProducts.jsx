import React, { useState } from "react";
import {
  useGetAllProductsQuery,
  useDeleteProductByAdminMutation,
} from "../../store/slices/productsApiSlice";
import { Skeleton } from "@mantine/core";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminManageProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: allProducts,
    isLoading: productsLoading,
    error: productsError,
    refetch,
  } = useGetAllProductsQuery();

  const [deleteProductByAdmin, { isLoading: loadingDelete }] =
    useDeleteProductByAdminMutation();

  const filteredProducts = allProducts?.filter((product) => {
    const matchesSearchTerm =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearchTerm;
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the product?")) {
      try {
        await deleteProductByAdmin(id).unwrap();
        refetch();
        toast.success("Product deleted");
      } catch (err) {
        console.log(err)
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="py-14 flex flex-col items-center w-[75%] md:w-full p-2">
      <h2 className="text-xl font-semibold">All Products</h2>

      {/* Search and Filter Section */}
      <div className="flex my-4 w-full justify-around">
        <input
          type="text"
          placeholder="Search by name, brand or vendor"
          className="border p-2 mr-4 rounded w-1/2 sm:w-full xsm:placeholder:text-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loadingDelete && (
        <p className="text-lg font-semibold">Deleting user...</p>
      )}
      {productsLoading ? (
        <div className="flex flex-col gap-y-2 w-[75%] md:w-full">
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </div>
      ) : productsError ? (
        <p>{productsError?.data?.meesage}</p>
      ) : (
        <table className="w-5/6 bg-gray-50 border border-collapse mt-4 md:w-full md:text-sm">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Image</th>
              <th className="border p-2 sm:hidden">Brand</th>
              <th className="border p-2 md:hidden">Price</th>
              <th className="border p-2 md:hidden">Vendor</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td className="border p-2 overflow-hidden whitespace-nowrap text-ellipsis w-auto hover:underline hover:text-blue-800">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </td>
                <td className="border p-2">
                  <img className="w-10 h-10" src={product.image1} alt="item" />
                </td>
                <td className="border p-2 sm:hidden">{product.brand}</td>
                <td className="border p-2 md:hidden">{product.sellingPrice}</td>
                <td className="border p-2 md:hidden">{product.seller}</td>
                <td className="border p-2 ">
                  {/* <Link to={`/admin/user/${user._id}/edit`}>
                    <button className="mr-4 sm:mr-1">
                      <FaEdit color="blue" />
                    </button>
                  </Link> */}
                  <button
                    className="ml-4 sm:ml-1"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaTrash style={{ color: "red" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminManageProducts;
