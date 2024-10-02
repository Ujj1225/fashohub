import{r as reactExports,a as useNavigate,j as jsxRuntimeExports,B}from"./index-Dn45rCbr.js";import{u as useGetBannersQuery,a as useAddBannerMutation}from"./bannerApiSlice-CHsXB93S.js";import{e as useUploadProductImageMutation}from"./productsApiSlice-C1zCf8O4.js";import{S as Skeleton}from"./Skeleton-9Y7E4ClX.js";const AdminBannerScreen=()=>{var r;const[image1,setImage1]=reactExports.useState(""),[link1,setLink1]=reactExports.useState(""),[image2,setImage2]=reactExports.useState(""),[link2,setLink2]=reactExports.useState(""),[image3,setImage3]=reactExports.useState(""),[link3,setLink3]=reactExports.useState(""),[image4,setImage4]=reactExports.useState(""),[link4,setLink4]=reactExports.useState(""),[image5,setImage5]=reactExports.useState(""),[link5,setLink5]=reactExports.useState(""),[image6,setImage6]=reactExports.useState(""),[link6,setLink6]=reactExports.useState(""),[image7,setImage7]=reactExports.useState(""),[link7,setLink7]=reactExports.useState(""),[image8,setImage8]=reactExports.useState(""),[link8,setLink8]=reactExports.useState(""),[image9,setImage9]=reactExports.useState(""),[link9,setLink9]=reactExports.useState(""),[image10,setImage10]=reactExports.useState(""),[link10,setLink10]=reactExports.useState(""),navigate=useNavigate(),{data:banners,isLoading:bannerLoading,error:bannerError,refetch}=useGetBannersQuery(),[addBanner,{isLoading}]=useAddBannerMutation(),[uploadProductImage,{isLoading:loadingUpload}]=useUploadProductImageMutation(),uploadFileHandler=async(a,n)=>{var m;const s=a.target.files[0];if(s.size>3e5){B.error("Each image must be less than 300KB");return}const i=new FormData;i.append("image",s);try{const t=await uploadProductImage(i).unwrap();switch(B.success(t.message),n){case"image1":setImage1(t.image);break;case"image2":setImage2(t.image);break;case"image3":setImage3(t.image);break;case"image4":setImage4(t.image);break;case"image5":setImage5(t.image);break;case"image6":setImage6(t.image);break;case"image7":setImage7(t.image);break;case"image8":setImage8(t.image);break;case"image9":setImage9(t.image);break;case"image10":setImage10(t.image);break;default:break}}catch(t){B.error(((m=t==null?void 0:t.data)==null?void 0:m.message)||t.error)}},handleBannerSubmit=async a=>{var n;a.preventDefault();try{await addBanner({image1,link1,image2,link2,image3,link3,image4,link4,image5,link5,image6,link6,image7,link7,image8,link8,image9,link9,image10,link10}).unwrap(),B.success("Banner Saved"),refetch(),navigate("/admin")}catch(s){B.error(((n=s==null?void 0:s.data)==null?void 0:n.message)||s.error)}};return reactExports.useEffect(()=>{banners&&banners.length>0&&(setImage1(banners[0].image1||""),setLink1(banners[0].link1||""),setImage2(banners[0].image2||""),setLink2(banners[0].link2||""),setImage3(banners[0].image3||""),setLink3(banners[0].link3||""),setImage4(banners[0].image4||""),setLink4(banners[0].link4||""),setImage5(banners[0].image5||""),setLink5(banners[0].link5||""),setImage6(banners[0].image6||""),setLink6(banners[0].link6||""),setImage7(banners[0].image7||""),setLink7(banners[0].link7||""),setImage8(banners[0].image8||""),setLink8(banners[0].link8||""),setImage9(banners[0].image9||""),setLink9(banners[0].link9||""),setImage10(banners[0].image10||""),setLink10(banners[0].link10||""))},[banners]),jsxRuntimeExports.jsxs("div",{className:"py-14 flex flex-col items-center w-[75%] md:w-full p-2",children:[jsxRuntimeExports.jsx("h2",{className:"text-xl font-semibold",children:"Manage Banners"}),bannerLoading?jsxRuntimeExports.jsxs("div",{className:"flex flex-col gap-y-2 w-[75%] md:w-full mt-4",children:[jsxRuntimeExports.jsx(Skeleton,{height:200}),jsxRuntimeExports.jsx(Skeleton,{height:200}),jsxRuntimeExports.jsx(Skeleton,{height:200}),jsxRuntimeExports.jsx(Skeleton,{height:200}),jsxRuntimeExports.jsx(Skeleton,{height:200})]}):bannerError?jsxRuntimeExports.jsx("p",{children:(r=bannerError==null?void 0:bannerError.data)==null?void 0:r.meesage}):jsxRuntimeExports.jsxs("form",{className:"w-full px-20 sm:px-1 mt-2",onSubmit:handleBannerSubmit,children:[console.log(banners),jsxRuntimeExports.jsx("p",{className:"text-red-500 font-bold text-center mb-1",children:"Image1 , 2 and 3 are required"}),jsxRuntimeExports.jsxs("div",{className:"bg-gray-100 rounded p-2 w-full mb-1 border border-black",children:[jsxRuntimeExports.jsx("p",{children:"Image 1 *"}),jsxRuntimeExports.jsxs("div",{className:"flex flex-col gap-y-2",children:[jsxRuntimeExports.jsx("input",{type:"text",placeholder:"Image1 URL (Required)",value:image1,required:!0,onChange:a=>setImage1(a.target.value),className:"px-2 py-1 border"}),jsxRuntimeExports.jsx("input",{type:"file",onChange:a=>uploadFileHandler(a,"image1")}),jsxRuntimeExports.jsx("input",{type:"text",placeholder:"Link Associated with Image1 (required)",value:link1,required:!0,onChange:a=>setLink1(a.target.value),className:"px-2 py-1 border mb-0 mt-0"}),loadingUpload&&jsxRuntimeExports.jsx("p",{className:"text-xs font-thin",children:"Loading..."})]})]}),jsxRuntimeExports.jsxs("div",{className:"bg-gray-100 rounded p-2 w-full mb-1 border border-black",children:[jsxRuntimeExports.jsx("p",{children:"Image 2 *"}),jsxRuntimeExports.jsxs("div",{className:"flex flex-col gap-y-2",children:[jsxRuntimeExports.jsx("input",{type:"text",placeholder:"Image2 URL (Required)",value:image2,required:!0,onChange:a=>setImage2(a.target.value),className:"px-2 py-1 border"}),jsxRuntimeExports.jsx("input",{type:"file",onChange:a=>uploadFileHandler(a,"image2")}),jsxRuntimeExports.jsx("input",{type:"text",placeholder:"Link Associated with Image2 (required)",value:link2,required:!0,onChange:a=>setLink2(a.target.value),className:"px-2 py-1 border"}),loadingUpload&&jsxRuntimeExports.jsx("p",{className:"text-xs font-thin",children:"Loading..."})]})]}),jsxRuntimeExports.jsxs("div",{className:"bg-gray-100 rounded p-2 w-full mb-1 border border-black",children:[jsxRuntimeExports.jsx("p",{children:"Image 3 *"}),jsxRuntimeExports.jsxs("div",{className:"flex flex-col gap-y-2",children:[jsxRuntimeExports.jsx("input",{type:"text",placeholder:"Image3 URL (Required)",value:image3,required:!0,onChange:a=>setImage3(a.target.value),className:"px-2 py-1 border  "}),jsxRuntimeExports.jsx("input",{type:"file",onChange:a=>uploadFileHandler(a,"image3")}),jsxRuntimeExports.jsx("input",{type:"text",placeholder:"Link Associated with Image3 (required)",value:link3,required:!0,onChange:a=>setLink3(a.target.value),className:"px-2 py-1 border  "}),loadingUpload&&jsxRuntimeExports.jsx("p",{className:"text-xs font-thin",children:"Loading..."})]})]}),[4,5,6,7,8,9,10].map(num=>jsxRuntimeExports.jsxs("div",{className:"bg-gray-100 rounded p-2 w-full mb-1 border border-black",children:[jsxRuntimeExports.jsx("p",{children:`Image ${num}`}),jsxRuntimeExports.jsxs("div",{className:"flex flex-col gap-y-2",children:[jsxRuntimeExports.jsx("input",{type:"text",placeholder:`Image${num} URL`,value:eval(`image${num}`),onChange:e=>eval(`setImage${num}(e.target.value)`),className:"px-2 py-1 border"}),jsxRuntimeExports.jsx("input",{type:"file",onChange:a=>uploadFileHandler(a,`image${num}`)}),jsxRuntimeExports.jsx("input",{type:"text",placeholder:`Link Associated with Image${num}`,value:eval(`link${num}`),onChange:e=>eval(`setLink${num}(e.target.value)`),className:"px-2 py-1 border"}),loadingUpload&&jsxRuntimeExports.jsx("p",{className:"text-xs font-thin",children:"Loading..."})]})]},`image${num}`)),jsxRuntimeExports.jsx("button",{type:"submit",className:"mt-4 px-8 py-2 bg-green-700 text-white font-bold rounded",children:isLoading?"Saving...":"Save"})]})]})};export{AdminBannerScreen as default};
