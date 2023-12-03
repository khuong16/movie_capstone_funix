import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import "./style.css";
import { userAPI } from "../../service/axios/api";
import { useNavigate } from "react-router-dom";
import { setLocaleStorage } from "../../base/base";

const Register = () => {
  const [loaiNguoiDung, setLoaiNguoiDung] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      userAPI
        .getTypeUser()
        .then((res) => {
          let data = res.data.content;
          let options = data.map((typeUser) => ({
            value: typeUser?.maLoaiNguoiDung,
            label: typeUser?.tenLoai,
          }));
          setLoaiNguoiDung(options);
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onFinish = async (values) => {
    try {
      if (values) {
        let newUser = {
          taiKhoan: values.taiKhoan,
          matKhau: values.matKhau,
          email: values.email,
          soDt: values.soDt,
          maNhom: values.maNhom,
          hoTen: values.hoTen,
        };
        await userAPI
          .postNewUser(newUser)
          .then((res) => {
            /* User check Remember */
            let infoUser = {
              taiKhoan: values?.taiKhoan,
              matKhau: values?.matKhau,
            };

            /* Save accesToken into LocaleStorage*/
            let isLogin = setLocaleStorage("User", infoUser);

            isLogin &&
              message.open({ type: "success", content: res?.data.message });
            setTimeout(() => {
              navigate("/Login");
            }, 2000);
          })
          .catch((err) => {
            console.log();
            throw err?.response.data.content || "Đăng ký không thành công!";
          });
      }
    } catch (error) {
      message.open({ type: "error", content: error });
    }
  };

  const onFinishFailed = (error) => {
    console.log(error);
  };

  return (
    <ConfigProvider
      theme={{
        // Globale Token
        token: {
          colorText: "#fff",
          colorPrimaryHover: "#fff",
        },
        // Components Token
        components: {
          Input: {
            colorBgContainer: "transparent",
            colorBorder: "gray",
            hoverBorderColor: "#fff",
            hoverBg: "rgb(255, 255, 255, 0.5)",
            activeBorderColor: "#fff",
            activeShadow: "none",
            colorText: "#fff",
          },

          Select: {
            colorBgContainer: "transparent",
            colorBorder: "gray",
            optionSelectedColor: "crimson",
          },
        },
      }}
    >
      <main className="register py-5">
        <div className="container flex items-center justify-center md:justify-end">
          <div className="register-content p-5">
            <h3 className="title pb-2">Đăng Ký</h3>
            <Form
              className="frmRegister px-5 py-5 mx-auto"
              name="formRegister"
              layout="vertical"
              initialValues={{
                taiKhoan: "",
                matKhau: "",
                hoTen: "",
                soDt: "",
                maNhom: "",
                maLoaiNguoiDung: "",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {/* Tai Khoan */}
              <Form.Item
                label="Tài Khoản :"
                name="taiKhoan"
                rules={[
                  {
                    required: true,
                    message: "Tài khoản trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Row>
                {/* Mat Khau */}
                <Col className="w-full lg:pr-2 lg:w-1/2">
                  <Form.Item
                    label="Mật Khẩu :"
                    name="matKhau"
                    rules={[
                      {
                        required: true,
                        message: "Mật khẩu trống!",
                      },
                    ]}
                  >
                    <Input type="password" />
                  </Form.Item>
                </Col>
                {/* Nhâp lai mat khau */}
                <Col className="w-full lg:pl-2 lg:w-1/2">
                  <Form.Item
                    label="Nhập Lại Mật Khẩu"
                    name={"rematKhau"}
                    rules={[
                      {
                        required: true,
                        message: "Mật khẩu trống!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("matKhau") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Mật khẩu không giống!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input type="password" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                {/* Ho Ten */}
                <Col className="w-full lg:pr-2 lg:w-1/2">
                  <Form.Item label="Họ và Tên : " name={"hoTen"}>
                    <Input />
                  </Form.Item>
                </Col>
                {/* So Dien Thoai */}
                <Col className="w-full lg:pl-2 lg:w-1/2">
                  <Form.Item
                    label="Số Điện Thoại : "
                    name={"soDt"}
                    rules={[
                      { message: "Số điện thoại trống" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!isNaN(value) && value.length > 5) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Nhập sai số điện thoại")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* Email */}
              <Form.Item
                label="Email :"
                name={"email"}
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Email không hợp lệ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Row>
                {/* maNhom */}
                <Col className="w-full lg:pr-2 lg:w-1/2">
                  <Form.Item label="Mã Nhóm : " name={"maNhom"}>
                    <Select
                      id={"Select-GroupUser"}
                      style={{ activeBorderColor: "red" }}
                      showSearch
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={[
                        {
                          value: "GP01",
                          label: "GP01",
                        },
                        {
                          value: "GP02",
                          label: "GP02",
                        },
                        {
                          value: "GP03",
                          label: "GP03",
                        },
                      ]}
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item className="w-full flex justify-center items-center">
                <>
                  <Button className="px-3 mx-2 lg:px-7" htmlType="submit">
                    Đăng Ký
                  </Button>
                  <Button htmlType="reset" className="px-3 mx-2 lg:px-7">
                    Xóa
                  </Button>
                </>
              </Form.Item>
            </Form>
          </div>
        </div>
      </main>
    </ConfigProvider>
  );
};
export default Register;
