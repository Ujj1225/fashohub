import{r as b,j as e,L as w,B as i}from"./index-Dn45rCbr.js";import{j as f,k as g}from"./productsApiSlice-C1zCf8O4.js";import{c as N}from"./index-Va4Lcz8a.js";import{S as a}from"./Skeleton-9Y7E4ClX.js";import"./iconBase-wTF-khsr.js";const S=()=>{var n;const[l,c]=b.useState(""),{data:t,isLoading:m,error:d,refetch:h}=f(),[x,{isLoading:j}]=g(),u=t==null?void 0:t.filter(s=>s.name.toLowerCase().includes(l.toLowerCase())||s.brand.toLowerCase().includes(l.toLowerCase())||s.seller.toLowerCase().includes(l.toLowerCase())),p=async s=>{var o;if(window.confirm("Are you sure you want to delete the product?"))try{await x(s).unwrap(),h(),i.success("Product deleted")}catch(r){console.log(r),i.error(((o=r==null?void 0:r.data)==null?void 0:o.message)||r.error)}};return e.jsxs("div",{className:"py-14 flex flex-col items-center w-[75%] md:w-full p-2",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"All Products"}),e.jsx("div",{className:"flex my-4 w-full justify-around",children:e.jsx("input",{type:"text",placeholder:"Search by name, brand or vendor",className:"border p-2 mr-4 rounded w-1/2 sm:w-full xsm:placeholder:text-xs",value:l,onChange:s=>c(s.target.value)})}),j&&e.jsx("p",{className:"text-lg font-semibold",children:"Deleting user..."}),m?e.jsxs("div",{className:"flex flex-col gap-y-2 w-[75%] md:w-full",children:[e.jsx(a,{height:50}),e.jsx(a,{height:50}),e.jsx(a,{height:50}),e.jsx(a,{height:50}),e.jsx(a,{height:50})]}):d?e.jsx("p",{children:(n=d==null?void 0:d.data)==null?void 0:n.meesage}):e.jsxs("table",{className:"w-5/6 bg-gray-50 border border-collapse mt-4 md:w-full md:text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"border p-2",children:"Name"}),e.jsx("th",{className:"border p-2",children:"Image"}),e.jsx("th",{className:"border p-2 sm:hidden",children:"Brand"}),e.jsx("th",{className:"border p-2 md:hidden",children:"Price"}),e.jsx("th",{className:"border p-2 md:hidden",children:"Vendor"})]})}),e.jsx("tbody",{children:u.map(s=>e.jsxs("tr",{children:[e.jsx("td",{className:"border p-2 overflow-hidden whitespace-nowrap text-ellipsis w-auto hover:underline hover:text-blue-800",children:e.jsx(w,{to:`/product/${s._id}`,children:s.name})}),e.jsx("td",{className:"border p-2",children:e.jsx("img",{className:"w-10 h-10",src:s.image1,alt:"item"})}),e.jsx("td",{className:"border p-2 sm:hidden",children:s.brand}),e.jsx("td",{className:"border p-2 md:hidden",children:s.sellingPrice}),e.jsx("td",{className:"border p-2 md:hidden",children:s.seller}),e.jsx("td",{className:"border p-2 ",children:e.jsx("button",{className:"ml-4 sm:ml-1",onClick:()=>p(s._id),children:e.jsx(N,{style:{color:"red"}})})})]},s._id))})]})]})};export{S as default};
