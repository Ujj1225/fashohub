import{q as t}from"./index-Dn45rCbr.js";const d="/api/delivery",i=t.injectEndpoints({endpoints:e=>({saveAddress:e.mutation({query:s=>({url:d,method:"POST",body:s,credentials:"include"})}),editAddress:e.mutation({query:s=>({url:d,method:"PUT",body:s,credentials:"include"})}),getAddress:e.query({query:()=>({url:d,method:"GET",credentials:"include"})})})}),{useSaveAddressMutation:n,useEditAddressMutation:o,useGetAddressQuery:u}=i;export{n as a,o as b,u};
