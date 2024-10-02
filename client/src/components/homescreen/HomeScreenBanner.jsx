import { useGetBannersQuery } from "../../store/slices/bannerApiSlice";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";
import { Skeleton } from "@mantine/core";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useMediaQuery } from "@mantine/hooks";

const HomeScreenBanner = () => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTab = useMediaQuery("(max-width: 1105px)");

  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const {
    data: banners,
    isLoading: bannersLoading,
    error: bannersError,
  } = useGetBannersQuery();

  return (
    <div className="bg-gray-400 w-4/5 sm:w-11/12 mx-auto mt-10 rounded">
      {bannersLoading ? (
        <Skeleton height={isMobile ? 150 : isTab ? 300 : 400} />
      ) : bannersError ? (
        <p>Error occurred.</p>
      ) : banners && banners.length > 0 ? (
        <Carousel
          loop
          withIndicators
          withControls={false}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          height={isMobile ? 150 : isTab ? 300 : 400}
          styles={{
            indicator: {
              borderRadius: "50%",
              height: "12px",
              width: "12px",
              backgroundColor: "whitesmoke",
            },
          }}
        >
          {banners[0].image1 && (
            <Carousel.Slide>
              <Link to={banners[0].link1}>
                <img
                  src={banners[0].image1}
                  alt="img1"
                  className="h-full w-full rounded"
                />
              </Link>
            </Carousel.Slide>
          )}
          {banners[0].image2 && (
            <Carousel.Slide>
              <Link to={banners[0].link2}>
                <img
                  src={banners[0].image2}
                  alt="img2"
                  className="h-full w-full rounded"
                />
              </Link>
            </Carousel.Slide>
          )}
          {banners[0].image3 && (
            <Carousel.Slide>
              <Link to={banners[0].link3}>
                <img
                  src={banners[0].image3}
                  alt="img3"
                  className="h-full w-full rounded"
                />
              </Link>
            </Carousel.Slide>
          )}
          {banners[0].image4 && (
            <Carousel.Slide>
              <Link to={banners[0].link4}>
                <img
                  src={banners[0].image4}
                  alt="img4"
                  className="h-full w-full rounded"
                />
              </Link>
            </Carousel.Slide>
          )}
          {banners[0].image5 && (
            <Carousel.Slide>
              <Link to={banners[0].link5}>
                <img
                  src={banners[0].image5}
                  alt="img5"
                  className="h-full w-full rounded"
                />
              </Link>
            </Carousel.Slide>
          )}
          {banners[0].image6 && (
            <Carousel.Slide>
              <Link to={banners[0].link6}>
                <img
                  src={banners[0].image6}
                  alt="img6"
                  className="h-full w-full rounded"
                />
              </Link>
            </Carousel.Slide>
          )}
          {banners[0].image7 && (
            <Carousel.Slide>
              <Link to={banners[0].link7}>
                <img
                  src={banners[0].image7}
                  alt="img7"
                  className="h-full w-full rounded"
                />
              </Link>
            </Carousel.Slide>
          )}
          {banners[0].image8 && (
            <Carousel.Slide>
              <Link to={banners[0].link8}>
                <img
                  src={banners[0].image8}
                  alt="img8"
                  className="h-full w-full rounded"
                />
              </Link>
            </Carousel.Slide>
          )}
          {banners[0].image9 && (
            <Carousel.Slide>
              <Link to={banners[0].link9}>
                <img
                  src={banners[0].image9}
                  alt="img9"
                  className="h-full w-full rounded"
                />
              </Link>
            </Carousel.Slide>
          )}
          {banners[0].image10 && (
            <Carousel.Slide>
              <Link to={banners[0].link10}>
                <img
                  src={banners[0].image10}
                  alt="img10"
                  className="h-full w-full rounded"
                />
              </Link>
            </Carousel.Slide>
          )}
        </Carousel>
      ) : (
        <p className="text-xl text-center py-40 font-bold">
          Please add a banner from admin panel
        </p>
      )}
    </div>
  );
};

export default HomeScreenBanner;
