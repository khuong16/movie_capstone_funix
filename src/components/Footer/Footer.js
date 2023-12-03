import React from "react";
import "./style.css";

export default function Footer() {
  return (
    <footer className="min-w-full flex flex-col justify-center items-center py-5">
      <div className="container">
        <div className="col"></div>
        <div className="col text-center px-3">
          <h5 className="text-[crimson] font-bold text-lg">
            TIX-SẢN PHẨM CỦA CÔNG TY FUNIX
          </h5>
          <a href="#" className="text-[gray] hover:text-[#fff]">
            Địa chỉ: Hà Nội, Việt Nam
          </a>
          <p className="text-[gray] hover:text-[#fff]">
          </p>

          <a href="#" className="text-[gray] hover:text-[#fff]">
            Số Điện Thoại (Hotline): 1900 88 88
          </a>
        </div>
        <div className="col"></div>
      </div>
    </footer>
  );
}
