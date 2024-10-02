import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";

const ProductCarousel = React.memo(({ images }) => {
  const autoplay = useRef(Autoplay({ delay: 1300 }));

  return (
    <Carousel
      loop
      withIndicators
      withControls={false}
      plugins={[autoplay.current]}
      styles={{
        indicator: {
          borderRadius: "50%",
          height: "6px",
          width: "6px",
        },
        indicators: {
          marginBottom: -30,
        },
      }}
      classNames={{
        indicator: "custom-indicator",
        indicators: "custom-indicators",
      }}
    >
      {images.map((image, index) => (
        <Carousel.Slide key={index}>
          <img
            src={image}
            alt={`Image ${index}`}
            className="h-[230px] "
            loading="lazy"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
});

export default ProductCarousel;
