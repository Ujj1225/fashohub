import{r as t,a as le,j as e,B as m}from"./index-Dn45rCbr.js";import{c as g}from"./categoriesData-CWHIy4Sq.js";import{h as ne,e as de}from"./productsApiSlice-C1zCf8O4.js";const me=()=>{const[h,B]=t.useState(""),[b,F]=t.useState(""),[j,y]=t.useState(""),[f,v]=t.useState(""),[N,C]=t.useState(""),[S,w]=t.useState(""),[L,P]=t.useState(""),[q,I]=t.useState(""),[z,M]=t.useState(""),[k,H]=t.useState(""),[E,K]=t.useState(""),[R,Q]=t.useState(""),[O,V]=t.useState(""),[n,X]=t.useState(""),[u,D]=t.useState(""),[U,x]=t.useState(""),[o,p]=t.useState([{size:"",quantity:""}]),Y=le(),[G,{isLoading:J}]=ne(),[W,{isLoading:d}]=de(),Z=()=>{p([...o,{size:"",quantity:""}])},A=(a,s,r)=>{const c=[...o];c[a][s]=r,p(c)},_=a=>{const s=[...o];s.splice(a,1),p(s)},$=a=>{X(a.target.value),D(""),x("")},ee=a=>{D(a.target.value),x("")},ae=a=>{x(a.target.value)},te=()=>n?Object.keys(g[n]):[],se=()=>n&&u?g[n][u]:[],re=async a=>{var s;a.preventDefault();try{await G({name:h,brand:b,image1:j,image2:f,image3:N,image4:S,image5:L,image6:q,primaryCategory:n,secondaryCategory:u,tertiaryCategory:U,description:z,sellingPrice:k,actualPrice:E,off:R,sizes:o,seller:O}).unwrap(),m.success("Product Created"),Y("/vendor")}catch(r){m.error(((s=r==null?void 0:r.data)==null?void 0:s.message)||r.error)}},i=async(a,s)=>{var T;const r=a.target.files[0];if(r.size>2e5){m.error("Each image must be less than 200KB");return}const c=new FormData;c.append("image",r);try{const l=await W(c).unwrap();switch(m.success(l.message),s){case"image1":y(l.image);break;case"image2":v(l.image);break;case"image3":C(l.image);break;case"image4":w(l.image);break;case"image5":P(l.image);break;case"image6":I(l.image);break;default:break}}catch(l){m.error(((T=l==null?void 0:l.data)==null?void 0:T.message)||l.error)}};return e.jsxs("div",{className:"py-14 flex flex-col items-center w-[75%] md:w-full md:px-2",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Create A New Product"}),J&&e.jsx("p",{className:"text-xs font-thin",children:"Creating a new product..."}),e.jsxs("form",{className:"bg-gray-50 px-4 py-6 mt-4 rounded-lg shadow-lg w-2/3 md:px-2 md:w-full",onSubmit:re,children:[e.jsxs("div",{className:"mt-4 mb-2",children:[e.jsxs("p",{children:["Product Name ",e.jsx("span",{className:"text-red-600 font-extrabold",children:"*"})]}),e.jsx("input",{type:"text",className:"border border-gray-400 rounded-sm w-full p-1",placeholder:"Enter product name",required:!0,value:h,onChange:a=>B(a.target.value),maxLength:"100"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("p",{children:["Product Brand ",e.jsx("span",{className:"text-red-600 font-extrabold",children:"*"})]}),e.jsx("input",{type:"text",className:"border border-gray-400 rounded-sm w-full p-1",placeholder:"Enter product brand",required:!0,value:b,onChange:a=>F(a.target.value),maxLength:"30"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("p",{children:["Images",e.jsx("span",{className:"text-red-600 font-extrabold",children:"*"}),e.jsx("span",{className:"ml-1 text-xs font-light italic",children:"Atleast 1, atmost 6. Each image shall be maximum of 200kb"})]}),e.jsxs("div",{className:"flex flex-col gap-y-2",children:[e.jsx("input",{type:"text",placeholder:"Image1 URL (Required)",value:j,required:!0,onChange:a=>y(a.target.value),className:"px-2 py-1 border mb-0 mt-4",disabled:!0}),e.jsx("input",{type:"file",onChange:a=>i(a,"image1")}),d&&e.jsx("p",{className:"text-xs font-thin",children:"Loading..."})]}),e.jsxs("div",{className:"flex flex-col gap-y-2",children:[e.jsx("input",{type:"text",placeholder:"Image2 URL (Optional)",value:f,onChange:a=>v(a.target.value),className:"px-2 py-1 border mb-0 mt-4",disabled:!0}),e.jsx("input",{type:"file",onChange:a=>i(a,"image2")}),d&&e.jsx("p",{className:"text-xs font-thin",children:"Loading..."})]}),e.jsxs("div",{className:"flex flex-col gap-y-2",children:[e.jsx("input",{type:"text",placeholder:"Image3 URL (Optional)",value:N,onChange:a=>C(a.target.value),className:"px-2 py-1 border mb-0 mt-4",disabled:!0}),e.jsx("input",{type:"file",onChange:a=>i(a,"image3")}),d&&e.jsx("p",{className:"text-xs font-thin",children:"Loading..."})]}),e.jsxs("div",{className:"flex flex-col gap-y-2",children:[e.jsx("input",{type:"text",placeholder:"Image4 URL (Optional)",value:S,onChange:a=>w(a.target.value),className:"px-2 py-1 border mb-0 mt-4",disabled:!0}),e.jsx("input",{type:"file",onChange:a=>i(a,"image4")}),d&&e.jsx("p",{className:"text-xs font-thin",children:"Loading..."})]}),e.jsxs("div",{className:"flex flex-col gap-y-2",children:[e.jsx("input",{type:"text",placeholder:"Image5 URL (Optional)",value:L,onChange:a=>P(a.target.value),className:"px-2 py-1 border mb-0 mt-4",disabled:!0}),e.jsx("input",{type:"file",onChange:a=>i(a,"image5")}),d&&e.jsx("p",{className:"text-xs font-thin",children:"Loading..."})]}),e.jsxs("div",{className:"flex flex-col gap-y-2",children:[e.jsx("input",{type:"text",placeholder:"Image6 URL (Optional)",value:q,onChange:a=>I(a.target.value),className:"px-2 py-1 border mb-0 mt-4",disabled:!0}),e.jsx("input",{type:"file",onChange:a=>i(a,"image6")}),d&&e.jsx("p",{className:"text-xs font-thin",children:"Loading..."})]})]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("p",{children:["Primary Category"," ",e.jsx("span",{className:"text-red-600 font-extrabold",children:"*"})]}),e.jsxs("select",{className:"border border-gray-400 rounded-sm w-full p-1",value:n,onChange:$,required:!0,children:[e.jsx("option",{value:"",children:"Select Primary Category"}),Object.keys(g).map(a=>e.jsx("option",{value:a,children:a},a))]})]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("p",{children:["Secondary Category",e.jsx("span",{className:"text-red-600 font-extrabold",children:"*"})]}),e.jsxs("select",{className:"border border-gray-400 rounded-sm w-full p-1",value:u,onChange:ee,required:!0,children:[e.jsx("option",{value:"",children:"Select Secondary Category"}),te().map(a=>e.jsx("option",{value:a,children:a},a))]})]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("p",{children:["Tertiary Category"," ",e.jsx("span",{className:"text-red-600 font-extrabold",children:"*"})]}),e.jsxs("select",{className:"border border-gray-400 rounded-sm w-full p-1",value:U,onChange:ae,required:!0,children:[e.jsx("option",{value:"",children:"Select Tertiary Category"}),se().map(a=>e.jsx("option",{value:a,children:a},a))]})]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("p",{children:["Product Description"," ",e.jsx("span",{className:"text-red-600 font-extrabold",children:"*"}),e.jsx("span",{className:"ml-1 text-xs font-light italic",children:"You can use # for a title, and -- for bullet points"})]}),e.jsx("textarea",{rows:"4",type:"text",className:"border border-gray-400 rounded-sm w-full p-1",placeholder:"Enter product description",value:z,required:!0,onChange:a=>M(a.target.value),maxLength:"2000"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("p",{children:["Selling Price (in Rs)"," ",e.jsx("span",{className:"text-red-600 font-extrabold",children:"*"})]}),e.jsx("input",{type:"text",className:"border border-gray-400 rounded-sm w-full p-1",placeholder:"Enter selling price",required:!0,value:k,onChange:a=>H(a.target.value),maxLength:"6"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("p",{children:["Actual Price (in Rs)"," ",e.jsx("span",{className:"text-red-600 font-extrabold",children:"*"})]}),e.jsx("input",{type:"text",className:"border border-gray-400 rounded-sm w-full p-1",placeholder:"Enter actual price",required:!0,value:E,onChange:a=>K(a.target.value),maxLength:"6"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("p",{children:["Discount Percentage",e.jsx("span",{className:"text-red-600 font-extrabold",children:"*"}),e.jsx("span",{className:"ml-1 text-xs font-light italic",children:"Enter simply 25 for 25%"})]}),e.jsx("input",{type:"text",className:"border border-gray-400 rounded-sm w-full p-1",placeholder:"Enter discount percentage",required:!0,value:R,onChange:a=>Q(a.target.value),maxLength:"2"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("p",{children:"Sizes"}),e.jsx("button",{type:"button",className:"bg-blue-700 px-2 py-0.5 ml-4 rounded-full hover:bg-blue-600 text-white font-bold mt-2",onClick:Z,children:"+ Add Field"})]}),o.map((a,s)=>e.jsxs("div",{className:"flex items-center mt-2",children:[e.jsx("input",{type:"text",className:"border border-gray-400 rounded-sm w-1/2 p-1 mr-2",placeholder:"Size",value:a.size,onChange:r=>A(s,"size",r.target.value),maxLength:"4"}),e.jsx("input",{type:"number",className:"border border-gray-400 rounded-sm w-1/4 p-1 mr-2",placeholder:"Quantity",value:a.quantity,onChange:r=>A(s,"quantity",r.target.value),maxLength:"4"}),e.jsx("button",{type:"button",className:"bg-red-600 px-3 py-0.5 rounded-full hover:bg-red-500 text-white font-bold",onClick:()=>_(s),children:"X"})]},s))]}),e.jsxs("div",{className:"mb-2",children:[e.jsxs("p",{children:["Shop Name",e.jsx("span",{className:"text-red-600 font-extrabold",children:"*"})]}),e.jsx("input",{type:"text",className:"border border-gray-400 rounded-sm w-full p-1",placeholder:"Enter your shop name",required:!0,value:O,onChange:a=>V(a.target.value),maxLength:"50"})]}),e.jsx("button",{className:"bg-blue-500 px-4 py-1 rounded-lg hover:bg-blue-600 text-white font-bold",children:"Create Product"})]})]})};export{me as default};
