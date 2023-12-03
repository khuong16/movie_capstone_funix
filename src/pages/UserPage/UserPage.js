import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Modal, Table, Tag, message } from "antd";
import { adminService } from "../../service/axios/api";
import toast from "react-hot-toast";
export default function UserPage() {
  // gọi api lấy danh sách người dùng
  const [user, setUser] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userDelete, setUserDelete] = useState();
  const [userDetail, setUserDetail] = useState();
  const getUser = () => {
    adminService
      .getUserList("?manhom=GP00")
      .then((res) => {
        let userList = res.data.content.map((u, i) => ({ ...u, key: i }));
        setUser(userList);
      })
      .catch((err) => {
        console.log("🚀 ~ file: UserPage.js:15 ~ getUser ~ err:", err);
      });
  };
  const handleUpdateUser = async (value) => {
    try {
      const res = await adminService.updateUser({
        ...userDetail,
        ...value,
      });
      setOpenDrawer(false);
      setUserDetail(undefined);
      getUser();
      message.success("cập nhật user thành công");
    } catch (err) {
      message.error(err.response.data.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "hoTen",
      key: "name",
    },
    {
      title: "Gmail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Type",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text) => {
        if (text == "KhachHang") {
          return <Tag color="green">Khách Hàng</Tag>;
        } else {
          return <Tag color="red">Quản trị</Tag>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (value, recordItem, index) => {
        return (
          <div className="flex gap-5">
            <Button
              style={{ borderColor: "green", width: "80px" }}
              primary
              onClick={async () => {
                try {
                  const res = await adminService.getUserDetailId(
                    recordItem.taiKhoan
                  );
                  if (res) {
                    setUserDetail(res.data.content);
                    setOpenDrawer(true);
                  }
                } catch (err) {
                  console.log(
                    "🚀 ~ file: UserPage.js:68 ~ onClick={ ~ err:",
                    err
                  );
                }
              }}
            >
              Edit
            </Button>
            <Button
              danger
              onClick={() => {
                setUserDelete(recordItem);
                setIsOpenModal(true);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
      with: 100,
    },
  ];
  return (
    <div>
      <Table dataSource={user} columns={columns} />;
      <Modal
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
        }}
        onOk={async () => {
          try {
            await adminService.deleteUser(userDelete.taiKhoan);
            message.success("xóa user thành công !");
            getUser();
          } catch (err) {
            message.error(err.response.data.content);
          } finally {
            setIsOpenModal(false);
          }
        }}
        style={{ color: "red" }}
        okButtonProps={{ style: { backgroundColor: "red" } }}
      >
        <p>Xác nhận xóa thông tin user {userDelete?.taiKhoan}</p>
      </Modal>
      {userDetail && (
        <Drawer
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
            setUserDetail(undefined);
          }}
          title="Chỉnh Sửa thông tin User"
        >
          <Form onFinish={handleUpdateUser}>
            <Form.Item
              label="Full Name"
              name="hoTen"
              initialValue={userDetail?.hoTen}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="soDT"
              initialValue={userDetail?.soDT}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              initialValue={userDetail?.email}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="matKhau"
              initialValue={userDetail?.matKhau}
            >
              <Input.Password />
            </Form.Item>

            <Button
              className="btn-submit"
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "green",
                textAlign: "center",
                width: "100px",
              }}
            >
              Update
            </Button>
          </Form>
        </Drawer>
      )}
    </div>
  );
}
