import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { setAllCinemaAction, setAllGroupCinemaAction } from '../../service/redux/action/cinemaAction';
import { changeToSortDate } from '../../base/base';

const Cinema = () => {
    const dispatch = useDispatch();
    const { listCinema } = useSelector(state => state.cinemaReducer);
    const { listGroupCinema } = useSelector(state => state.cinemaReducer);


    useEffect(() => {
        dispatch(setAllCinemaAction());
        dispatch(setAllGroupCinemaAction("BHDStar"));
    }, []);

    const handleChangeCinema = (maHeThonRap) => {
        dispatch(setAllGroupCinemaAction(maHeThonRap));
    }

    const renderMoviesByGroupCinema = (list = []) => {
        return list?.map((movies, index) => {
            let { ngayChieuGioChieu } = movies?.lstLichChieuTheoPhim[0];
            let ngayChieu = changeToSortDate(ngayChieuGioChieu);
            let gioChieu = new Date(ngayChieuGioChieu).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            /* */
            return (movies?.dangChieu && <div key={`MoviesByGroupCinema-${index}`} className='border p-1 lg:p-2 w-full hover:bg-slate-200'>
                <div className='flex flex-col flex-grow-0 md:flex-row lg:flex-row gap-x-2 gap-y-2'>
                    <img className='block object-fill w-[100px] h-[130px] flex-shrink-0' src={movies?.hinhAnh} />
                    <div className='flex-grow w-full flex flex-col justify-between items-start '>
                        <p className='mb-3 uppercase font-medium text-[#000] whitespace-normal h-[45px] w-[180px] max-w-full md:w-[250px] lg:w-[350px]  text-[0.6rem]  md:text-[0.7rem] lg:text-[0.8rem]'>{movies?.tenPhim}</p>
                        <Link className="text-white bg-[#414141] rounded-xl px-2 py-[2px] mb-2 text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] " to={`/Movie/${movies?.maPhim}`} >Chi Tiết</Link>
                        <Link className='text-[#fff] bg-[#414141] rounded-xl px-2 py-[2px] text-[0.4rem] md:text-[0.5rem] lg:text-[0.7rem]' to={`/Datve/${movies?.maPhim}`}>
                            <i className="bi bi-calendar2-minus mr-1"></i> <span className='text-[#f50]'>{ngayChieu}</span> ~ {gioChieu}
                        </Link>
                    </div>
                </div>
            </div>)})
    }

    return (
        <Tabs
            tabPosition="left"
            defaultActiveKey=''
            className='w-full h-[70vh]'
            onChange={handleChangeCinema}
            items={
                listCinema.map((cinema) => {
                    return {
                        // Logo Cinema
                        label: <img className='object-cover h-[35px] w-[35px] md:w-[55px] md:h-[55px] lg:w-[70px] lg:h-[70px]' src={`${cinema.logo}`} title={`${cinema?.biDanh}`} alt={`${cinema?.biDanh}`} />,
                        key: cinema?.maHeThongRap,
                        style: { paddingLeft: 0 },
                        children:
                            <Tabs tabPosition="left"
                                className='min-w-max h-[70vh]'
                                items={
                                    listGroupCinema[0]?.lstCumRap.map(groupCinema => {
                                        return {
                                            // Address Cinema
                                            label: <div className='w-[25vw] md:w-[30vw] lg:w-[25vw]'>
                                                <h4 className='text-left whitespace-normal text-[crimson] font-semibold uppercase text-[0.6rem]  md:text-[0.7rem] lg:text-[0.8rem]' > {groupCinema?.tenCumRap}</h4>
                                                <p className='text-left whitespace-normal text-[#515151] text-[0.5rem]  md:text-[0.6rem] lg:text-[0.7rem]'>{groupCinema?.diaChi}</p>
                                            </div >,
                                            key: groupCinema?.maCumRap,
                                            style: { paddingLeft: 0 },
                                            // Movies of Cinema
                                            children: <div className='rounded-lg h-[70vh] overflow-y-scroll w-[calc(100vw - 80px - 40vw)] md:w-[calc(100vw- 80px - 30vw)] lg:w-[calc(100vw - 80px - 25vw)]'>{renderMoviesByGroupCinema(groupCinema?.danhSachPhim)}</div>
                                        }
                                    })
                                } />
                    };  
                })
            }
        >
        </Tabs >
    );
}
export default Cinema;