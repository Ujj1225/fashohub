import{r as v,d as w,j as e,B as x}from"./index-Dn45rCbr.js";import{c as O,g as A}from"./orderApiSlice-B-AJ7Rxk.js";import{j as C}from"./userApiSlice-BcONqH5P.js";import{u as D,M as _}from"./Modal-1q3nvwzu.js";import{S as t}from"./Skeleton-9Y7E4ClX.js";import{D as L}from"./Divider-Dc33vHdl.js";import"./CloseButton-BFRpwHX3.js";import"./use-media-query-jqO5_DAj.js";import"./UnstyledButton-BWqOA1Vn.js";import"./create-safe-context-91HhculZ.js";const G=()=>{var m;const[h,{open:g,close:a}]=D(!1),[d,p]=v.useState(),{oid:n}=w(),{data:s,isLoading:u,error:i,refetch:f}=O(n),{data:l,isLoading:j,error:o,refetch:b}=C(),[y,{isLoading:c}]=A(),N=async()=>{if(d)try{await y({oid:n,dpid:d}).unwrap(),f(),a(),b(),x.success("Order assigned successfully.")}catch(r){x.error("Failed to assign order",r)}};return e.jsxs("div",{className:"py-14 flex flex-col items-center w-[75%] md:w-full p-2",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Order Assignment"}),u?e.jsxs("div",{className:"flex flex-col gap-y-2 w-[75%] md:w-full",children:[e.jsx(t,{height:50}),e.jsx(t,{height:50})]}):i?e.jsx("p",{children:(m=i==null?void 0:i.data)==null?void 0:m.meesage}):e.jsxs("div",{className:"",children:[e.jsxs("p",{className:"font-bold text-gray-600 mt-4",children:["Order ID: ",s._id]}),e.jsxs("p",{className:"font-bold text-gray-600 mt-4",children:["Customer ID: ",s.user._id]}),e.jsxs("p",{className:"font-bold text-gray-600 mt-4",children:["Customer Name: ",s.user.name]}),e.jsxs("p",{className:"font-bold text-gray-600 mt-4",children:["Customer Phone: ",s.user.phone]}),e.jsxs("div",{className:"font-bold text-gray-600 mt-4 bg-green-300 border p-1 rounded",children:["Assigned To:"," ",s!=null&&s.assignedTo?e.jsx("span",{children:s==null?void 0:s.assignedTo}):"Not yet assigned"]}),e.jsx("button",{className:"font-bold text-sm text-center w-full border rounded py-1 mt-4 hover:border-black",onClick:g,children:"Assign Order"})]}),e.jsx(_,{opened:h,onClose:a,title:"Delivery Partners",children:j?e.jsxs("div",{children:[e.jsx(t,{height:50}),e.jsx(t,{height:50}),e.jsx(t,{height:50}),e.jsx(t,{height:50}),e.jsx(t,{height:50})]}):o?e.jsx("p",{children:o.data.message}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex flex-col gap-y-4",children:l.length===0?e.jsx("p",{children:"No delivery partners"}):e.jsxs(e.Fragment,{children:[l.map(r=>e.jsxs("div",{className:"w-full",children:[e.jsxs("button",{className:`flex flex-row xsm:flex-col gap-x-4 border p-1 rounded-sm w-full ${d===r._id?"bg-gray-200":""} ${(s==null?void 0:s.assignedTo)&&(s==null?void 0:s.assignedTo)===r._id&&"border-2 border-green-400"}`,onClick:()=>p(r._id),children:[e.jsx("p",{children:r.name}),e.jsx("p",{children:r._id})]}),e.jsx(L,{my:"xs"})]},r._id)),e.jsx("button",{className:"bg-blue-500 text-white rounded-sm py-0.5",onClick:N,disabled:!d||c,children:c?"Saving...":"Save"})]})})})})]})};export{G as default};
