import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "../../service/axios/api";
import { Rate } from "antd";
import TheaterMovie from "./TheaterMovie";

export default function MovieDetail() {
  const { maPhim } = useParams();
  console.log(maPhim);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    moviesAPI
      .getDetail(maPhim)
      .then((res) => {
        console.log(
          "🚀 ~ file: MovieDetail.js:13 ~ .then ~ res:",
          res.data.content
        );
        setDetail(res.data.content);
      })
      .catch((err) => {
        console.log("🚀 ~ file: MovieDetail.js:16 ~ useEffect ~ err:", err);
      });
  }, []);

  return (
    <div className="">
      <div className="container p-20 bg-blue-300">
        <div className="bg-gray-300 rounded-lg shadow-2xl md:flex-col-reverse">
          <div className="md:flex ">
            <img
              alt=""
              src={detail.hinhAnh}
              className="md:max-w-full max-h-full rounded-lg md:rounded-r-none md:rounded-l-lg h-96 object-cover shrink-0"
            />
            <TheaterMovie />
          </div>
          <div className="p-6">
            <h2 className="font-bold text-xl md:text-3xl mb-2 text-orange-700">
              {detail.tenPhim}
            </h2>
            <p className="text-orange-700">{detail.moTa}</p>
            <Rate disabled value={detail.danhGia / 2} className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
