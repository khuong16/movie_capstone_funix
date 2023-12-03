import React, { useEffect, useState } from "react";
import "./style.css";
import { bannerAPI } from "../../service/axios/api";

function Carousel() {
  const [listBanner, setListBanner] = useState([]);

  useEffect(() => {
    const fetchBannerFromApi = async () => {
      try {
        await bannerAPI
          .getBanners()
          .then((res) => {
            setListBanner(res?.data.content);
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchBannerFromApi();
  }, []);

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide "
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        {/* Indicators */}
        {listBanner?.map((_, index) => {
          return (
            <li
              key={`carousel-indicators-${index}`}
              data-target="#carouselExampleIndicators"
              data-slide-to={index}
              className={`${index == 0 && "active"}`}
            ></li>
          );
        })}
      </ol>
      <div className="carousel-inner ">
        {/* Carousel items */}
        {listBanner?.map((banner, index) => {
          return (
            <div
              key={`carousel-items-${index}`}
              className={`carousel-item + ${index == 0 && "active"}`}
            >
              <img
                className="d-block object-fill w-screen h-[250px] md:h-[450px] lg:object-cover lg:h-[90vh]"
                src={banner?.hinhAnh}
                alt={banner?.maPhim}
              />
            </div>
          );
        })}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}
export default Carousel;
