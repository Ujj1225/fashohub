import{q as a}from"./index-Dn45rCbr.js";const e="/api/banner",r=a.injectEndpoints({endpoints:n=>({getBanners:n.query({query:()=>({url:e,method:"GET"})}),addBanner:n.mutation({query:t=>({url:e,method:"POST",body:t,credentials:"include"})})})}),{useGetBannersQuery:s,useAddBannerMutation:i}=r;export{i as a,s as u};
