import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { moviesAPI } from "../../service/axios/api";
import "../Booking/style.css";
import Header from "../../components/Header/Header";
import { message } from "antd";

export default function BuyTicket() {
  const { maLichChieu } = useParams();
  const [room, setRoom] = useState([]);
  const [selectSeat, setSelectSeat] = useState([]);
  let navigate = useNavigate();
  let userLogin = JSON.parse(localStorage.getItem("User"));

  let getBooking = () => {
    moviesAPI
      .getToBuy(maLichChieu)
      .then((res) => {
        console.log(
          "🚀 ~ file: BuyTicket.js:14 ~ .then ~ res:",
          res.data.content
        );
        setRoom(res.data.content);
      })
      .catch((err) => {
        console.log("🚀 ~ file: BuyTicket.js:17 ~ getBooking ~ err:", err);
      });
  };
  useEffect(() => {
    getBooking();
  }, []);
  let renderListSeat = () => {
    return (
      room?.danhSachGhe &&
      room?.danhSachGhe.map((seat) => {
        return (
          <span
            key={seat.maGhe}
            className={`${seat.loaiGhe === "Vip" ? "gheVip" : "gheThuong"}  ${
              seat.daDat === true ? "gheDaDat" : "cursor-pointer"
            }`}
            onClick={() => handleSelectChair(seat)}
            style={{
              backgroundColor: isSelected(seat) ? "green" : "",
            }}
          >
            {seat.daDat === false ? seat.tenGhe : "X"}
          </span>
        );
      })
    );
  };
  let chooseSeat = () => {
    return selectSeat?.map((seat) => {
      return <span key={seat.maGhe}>Seat:{seat.tenGhe}, </span>;
    });
  };

  let totalPay = () => {
    return selectSeat.reduce((sum, { giaVe }) => {
      return sum + giaVe;
    }, 0);
  };

  let renderBill = () => {
    let { diaChi, gioChieu, ngayChieu, tenCumRap, tenPhim, tenRap } =
      room.thongTinPhim || [];
    return (
      <table className="w-100 listBuy bg-red-300">
        <tbody>
          <tr>
            <th className="font-medium">Tên Phim:</th>
            <td className="text-green-500 hover:text-yellow-200">{tenPhim}</td>
          </tr>
          <tr>
            <th className="font-medium">Địa Chỉ</th>
            <td className="text-green-500 hover:text-yellow-200">{diaChi}</td>
          </tr>
          <tr>
            <th className="font-medium">Tên Rạp:</th>
            <td className="text-green-500 hover:text-yellow-200">{tenRap}</td>
          </tr>
          <tr>
            <th className="font-medium">Tên Cụm Rạp:</th>
            <td className="text-green-500 hover:text-yellow-200">
              {tenCumRap}
            </td>
          </tr>
          <tr>
            <th className="font-medium">Ngày Chiếu </th>
            <td className="text-green-500 hover:text-yellow-200">
              {ngayChieu}
            </td>
          </tr>
          <tr>
            <th className="font-medium">Suất Chiếu</th>
            <td className="text-green-500 hover:text-yellow-200">
              {gioChieu}-{ngayChieu}
            </td>
          </tr>
          <tr>
            <th className="font-medium">Chỗ chọn</th>
            <td className="text-green-500 hover:text-yellow-200">
              {chooseSeat()}
            </td>
          </tr>
          <tr>
            <th className="font-medium">Tổng tiền</th>
            <td className="text-black hover:text-yellow-200">
              {totalPay().toLocaleString()}VNĐ
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  let handleBuyTicket = () => {
    if (selectSeat.length == 0) {
      return message.error("hãy chọn chỗ ngồi bạn mong muốn trước");
    }
    let danhSachVe = selectSeat.map((seat) => {
      return {
        maGhe: seat.maGhe,
        giaVe: seat.giaVe,
      };
    });

    let ticket = {
      maLichChieu: maLichChieu,
      danhSachVe,
    };
    if (userLogin) {
      moviesAPI
        .bookingTicket(ticket)
        .then((res) => {
          setSelectSeat([]);
          getBooking();
          message.success(res.data.content);
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: BuyTicket.js:137 ~ handleBuyTicket ~ err:",
            err
          );
          message.error("mua vé thất bại");
        });
    } else {
      message.error("bạn chưa đăng nhập ");
      navigate("/Login");
    }
  };

  let isSelected = (seat) => {
    return selectSeat?.some((chair) => chair.maGhe === seat.maGhe);
  };

  let handleSelectChair = (seat) => {
    if (seat.daDat) {
      return;
    }
    if (isSelected(seat)) {
      setSelectSeat((prevSelectChair) =>
        prevSelectChair.filter((chair) => chair.maGhe !== seat.maGhe)
      );
    } else {
      setSelectSeat((prevSelectChair) => [...prevSelectChair, seat]);
    }
  };
  return (
    <div>
      <Header />
      <div className="bookingMovie bg-slate-500">
        <div className="container py-5 gap-5  lg:flex ">
          <div>
            <div className="grow grid grid-cols-10 gap-5 bg-gray-400 shadow-neutral-950">
              {renderListSeat()}
            </div>
            <div className="flex items-center justify-center gap-3 mt-5">
              <span className="gheThuong inline-block"></span>
              <span>Ghế thường</span>

              <span className="gheVip inline-block"></span>
              <span>Ghế Vip</span>

              <span className="gheDaDat inline-block">X</span>
              <span>Ghế đã đặt</span>
            </div>
          </div>
          <div className="px-7 mt-5">
            {renderBill()}
            <div
              className="bg-red-500 h-16 text-white text-2xl font-bold text-center leading-[64px] hover:bg-red-400 cursor-pointer"
              onClick={() => {
                handleBuyTicket();
              }}
            >
              Mua vé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
