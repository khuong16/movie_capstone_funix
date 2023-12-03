import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { moviesAPI } from "../../service/axios/api";
import { ConfigProvider, Tabs } from "antd";
import moment from "moment/moment";

const onChange = (key) => {};
export default function TheaterMovie() {
  const [theater, SetTheater] = useState([]);
  const { maPhim } = useParams();
  useEffect(() => {
    moviesAPI
      .getDetailBooking(maPhim)
      .then((res) => {
        SetTheater(res.data.content.heThongRapChieu);
      })
      .catch((err) => {
        console.log("🚀 ~ file: TheaterMovie.js:16 ~ useEffect ~ err:", err);
      });
  });
  let renderBooking = () => {
    return theater.map((heThong) => {
      return {
        key: heThong.maHeThongRap,
        label: <img className="w-16" src={heThong.logo} alt="" />,
        children: (
          <div
            style={{
              maxHeight: 500,
              overflowY: "auto",
            }}
          >
            {heThong.cumRapChieu.map((cumRap) => {
              return (
                <div key={cumRap.tenCumRap} className="mt-3">
                  <p className="font-semibold">{cumRap.tenCumRap}</p>
                  <p>{cumRap.diaChi}</p>
                  <div className="flex gap-3">
                    {cumRap.lichChieuPhim.slice(0, 6).map((lichChieu) => {
                      return (
                        <Link
                          to={`/buy/${lichChieu?.maLichChieu}`}
                          key={lichChieu.maLichChieu}
                          className="inline-block px-2 py-1 rounded bg-red-500 text-white max-w-[120px]"
                          type="button"
                        >
                          {moment(lichChieu.ngayChieuGioChieu).format(
                            "DD/MM/YY - hh:mm"
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ),
      };
    });
  };

  return (
    <div className="container py-20">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F63E02",
            borderRadius: 2,
            colorBgContainer: "#fff",
          },
        }}
      >
        <Tabs
          style={{
            maxHeight: 500,
          }}
          className="max-w-full"
          defaultActiveKey="1"
          items={renderBooking()}
          tabPosition="left"
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
}
