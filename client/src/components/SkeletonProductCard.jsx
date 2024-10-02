import React from "react";
import {Skeleton} from "@mantine/core";

const SkeletonProductCard = () => {
  return (
    <div className="hover:shadow-md w-[210px] mx-auto hover:cursor-pointer h-[360px] pb-2">
      <div className="h-[280px] w-[210px]">
        <Skeleton height={280} width={210} />
      </div>
      <div className="w-[210px] mt-2">
        <Skeleton height={20} />
        <Skeleton height={20} className="mt-2" />
      </div>
    </div>
  );
};

export default SkeletonProductCard;
