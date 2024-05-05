import { useQuery } from "react-query";
import { Suspense, useState, useRef, useLayoutEffect, useEffect } from "react";
import { clsx } from "clsx"
import "./banner.css";

import { getBanners } from "../../controllers/banner.controller";

export function Banner() {
  console.log("Hello Banner");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BannerContent />
    </Suspense>
  );
}

function BannerContent() {
  const banners = useQuery(["banner"], getBanners, { suspense: true });

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const bannerRef = useRef();

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useLayoutEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === banners.data.length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    return resetTimeout;
  }, [index]);

  return (
    <div ref={bannerRef} className="slideshow">
      <div
        className="slideshow-slider"
        style={{
          transform: `translateX(${-index * 100}%)`,
        }}
      >
        {banners.data.map((banner, i) => (
          <div className="slide" key={i}>
            <img className="h-full w-full" src={banner} />
          </div>
        ))}
      </div>
      <div className="slideshow-dots">
        {banners.data.map((_, i) => (
          <div
            key={i}
            className={clsx("slideshow-dot", index === i && "active")}
            onClick={() => {
              setIndex(i);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
