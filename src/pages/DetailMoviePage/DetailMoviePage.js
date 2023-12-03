import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { moviesAPI } from "../../service/axios/api";
import { Rate } from "antd";
import ReactPlayer from "react-player";
import { changeToSortDate } from "../../base/base";
import "./style.css";

function DetailMoviePage() {
  const volumnRef = useRef(0);
  const volumnInterval = useRef();
  const reactPlayerRef = useRef();
  const [detailMovie, setDetailMovie] = useState({});
  const [videoState, setVideoState] = useState({
    muted: true,
    playing: true,
    volume: 0,
    seeking: false,
  });
  const { maPhim } = useParams();
  /* */
  let date = changeToSortDate(detailMovie?.ngayKhoiChieu);

  useEffect(() => {
    window.scroll(0, 0);
    const fetchDetailMovie = async () => {
      try {
        moviesAPI
          .getDetail(maPhim)
          .then((res) => {
            setDetailMovie(res?.data.content);
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetailMovie();
    return () => {
      volumnInterval.current && clearInterval(volumnInterval.current);
    };
  }, [maPhim]);

  const inScreaseVolumn = useCallback(() => {
    volumnInterval.current = setInterval(() => {
      if (volumnRef.current < 100) {
        volumnRef.current += 1;
        setVideoState({
          ...videoState,
          volume: (volumnRef.current * 1) / 100,
          playing: true,
          muted: false,
        });
        return;
      }
      clearInterval(volumnInterval.current);
    }, 100);
  }, []);

  return (
    <>
      <main className="detail-movie min-w-full max-w-full max-h-max ">
        <div className="container w-full h-fit">
          <div className="detail-content px-0 py-3 md:py-5 lg:py-7 flex flex-col h-full md:h-[70vh] lg:h-full md:flex-row lg:flex-row gap-2 md:gap-3 lg:gap-4">
            <div className="detail-image flex-shrink-0 w-full md:w-[45vw] lg:w-[30vw]">
              <img
                className="block object-contain lg:object-fill w-full h-full"
                src={detailMovie?.hinhAnh}
                title={detailMovie?.tenPhim}
                alt={detailMovie?.biDanh}
              />
              <div className="detail-booking">
                <Link
                  to={`/Datve/${detailMovie?.maPhim}`}
                  className="btn-booking block w-[80px] h-[80px]"
                >
                  Đặt Vé
                </Link>
              </div>
            </div>
            <div className="detail-info flex-grow">
              <h3 className="detail-name mb-2 text-[1rem] md:text-[1.2rem] lg:text-[1.7rem]">
                {detailMovie?.tenPhim}
              </h3>
              <Rate
                className="mb-2"
                allowHalf
                disabled
                value={detailMovie?.danhGia / 2}
              />
              <p className="detail-date mb-2 text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
                Ngày Khởi Chiếu : <span>{date}</span>
              </p>
              <p className="detail-desc capitalize my-2">{detailMovie?.moTa}</p>
            </div>
          </div>

          <div className="w-full h-[30vh] md:h-[45vh] lg:h-[80vh]">
            <ReactPlayer
              ref={reactPlayerRef}
              onReady={() => inScreaseVolumn()}
              volume={videoState.volume}
              muted={videoState.muted}
              playing={videoState.playing}
              controls={true}
              width="100%"
              height="100%"
              url={detailMovie?.trailer}
            ></ReactPlayer>
          </div>
        </div>
      </main>
    </>
  );
}

export default DetailMoviePage;
