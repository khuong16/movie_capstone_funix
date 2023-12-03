import React from "react";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import "./style.css";
import { changeToSortDate } from "../../../../base/base";

export default function CardMovie({ movie }) {
  return (
    <div className="card-movie group relative">
      <div className="card-image aspect-h-1 aspect-w-1 w-full overflow-hidden group-hover:opacity-75 lg:aspect-none ">
        <img
          src={movie?.hinhAnh}
          alt={movie?.maPhim}
          className="h-[350px] w-full object-cover"
        />
      </div>
      <div className="card-content p-2 w-full ">
        <a className="card-name block h-[40px] mt-1" href={movie?.trailer}>
          {movie?.tenPhim}
        </a>
        {/* Rate */}
        <Rate
          disabled
          allowHalf
          defaultValue={Math.round(movie?.danhGia / 2)}
        />

        <p className="card-date mb-2">
          <i className="bi bi-calendar-heart mx-1"></i>
          {changeToSortDate(movie?.ngayKhoiChieu)}
        </p>
        <div className="w-full  flex flex-row gap-1">
          <Link
            to={`/Datve/${movie?.maPhim}`}
            className="card-booking w-full px-[0.3rem] py-[0.2rem]"
          >
            Đặt Vé
          </Link>
          <Link
            to={`/Movie/${movie?.maPhim}`}
            className="card-detail w-full px-[0.3rem] py-[0.2rem]"
            type="button"
          >
            Chi Tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
