import React, { useEffect, useState } from "react";
import { Select, Tag, Space, DatePicker, ConfigProvider } from "antd";
import { cinemaAPI } from "../../service/axios/api";
import { setAllCinemaAction } from "../../service/redux/action/cinemaAction";
import useSelection from "antd/es/table/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";

// Loại Phim
const options = [
  {
    value: "Hành Động",
  },
  {
    value: "Kinh Dị",
  },
  {
    value: "Hài",
  },
  {
    value: "Viển Tưởng",
  },
];

const tagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        backgroundColor: "crimson",
        color: "#fff",
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

const ToolMovie = () => {
  const { listCinema } = useSelector((state) => state.cinemaReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllCinemaAction());
  }, []);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorText: "#fff",
            backgroundColor: "#fff",
            optionSelectedColor: "crimson",
          },
        },
      }}
    >
      <div className="col">
        <Select
          className="w-full "
          placeholder="Loai Phim"
          mode="multiple"
          tagRender={tagRender}
          options={options}
        />
      </div>
      <div className="col">
        <Select
          className="w-full"
          showSearch
          placeholder="Rap Chieu Phim"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={listCinema.map((item) => ({
            value: item?.maHeThongRap,
            label: item?.tenHeThongRap,
          }))}
        />
      </div>
      <div className="col">
        <Space className="w-full" direction="vertical">
          <DatePicker className="w-full" onChange={onChange} />
        </Space>
      </div>
    </ConfigProvider>
  );
};
export default ToolMovie;
