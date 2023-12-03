import { useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { userAPI } from "../../service/axios/api";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "antd";
import { SET_USER } from "../../service/redux/constant/constant";
import "./style.css";
function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  console.log("12233423");

  const items = [
    { label: "Thông tin", key: 2 },
    {
      label: (
        <button
          className="w-full h-full rounded-sm bg-gray-200"
          onClick={handleLogOut}
        >
          <i className="bi bi-box-arrow-right"></i>
        </button>
      ),
      key: 5,
    },
  ];

  /* */
  useEffect(() => {
    const fetchInfoUser = async () => {
      try {
        let account = await userAPI.getInfoAccount();
        if (account != null) {
          dispatch({ type: SET_USER, payload: { ...account } });
        }
      } catch (error) {
        console.error(error);
      }
    };
    user.taiKhoan && fetchInfoUser();
  }, []);

  useEffect(() => {
    if (user?.maLoaiNguoiDung === "QuanTri ") {
      items.unshift({ label: <Link to="/User">Admin</Link>, key: 0 });
    }
  }, [user]);

  function handleLogOut() {
    localStorage.removeItem("User");
    window.location.href = "/";
  }

  /* render */
  return (
    <header className="header min-w-full sticky top-0 z-50">
      <div className="container-fluid">
        <nav className="lg:px-6 py-2.5">
          <div className="flex flex-nowrap justify-between items-center mx-auto">
            <Link to="/" className="flex items-center">
              <img
                src=""
                className="mr-3 h-6 sm:h-9"
                alt="Funix Logo"
              />
            </Link>
            <div className="flex items-center lg:order-2">
              <div>
                {user?.taiKhoan ? (
                  // Logout
                  <Dropdown placement="bottomLeft" arrow menu={{ items }}>
                    <span className=" cursor-pointer text-sm text-login capitalize">
                      {user?.hoTen}
                    </span>
                  </Dropdown>
                ) : (
                  // Login
                  <Link className="text-login text-sm" to="/Login">
                    Đăng Nhập
                  </Link>
                )}
              </div>
              {/* Toggle Button */}
              <button
                onClick={() => {
                  document
                    .querySelector("#mobile-menu-2")
                    .classList.toggle("hidden");
                }}
                className="lg:hidden block px-4 ml-3 rounded outline-none"
                type="button"
              >
                {/*Toggle Icon */}
                <i className="bi bi-list text-[#fff]"></i>
              </button>
            </div>
            <div
              className="hidden justify-center items-center flex-row py-3 lg:py-0 absolute left-0 top-[55px] w-full bg-slate-600 lg:bg-transparent lg:static lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li className="nav-item">
                  <Link to="/" className=" block py-2 pr-4 pl-3 text-sm">
                    Trang Chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className=" block py-2 pr-4 pl-3 text-sm">
                    Đặt Vé
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="#" className=" block py-2 pr-4 pl-3 text-sm">
                    Liên Hệ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);
