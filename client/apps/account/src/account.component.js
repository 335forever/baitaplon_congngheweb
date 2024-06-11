import "./index.css";

import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { toast } from "@TachMonShop/notification";

import { navigateToUrl } from "single-spa"

import MyProfile from "./components/MyProfile";
import ChangePassword from "./components/ChangePassword";
import ShopProfile from "./components/ShopProfile";
import {
  changePassword,
  getShopInfo,
  getUserInfo,
  upToShop,
  updateUser,
  updateShop,
  isSignedIn
} from "@TachMonShop/api";

export default function Account(props) {
  document.title = "TachMonShop | Tài khoản";

  useEffect(() => {
    if (!isSignedIn()) navigateToUrl('/');
  }, []);

  const [menu, setMenu] = React.useState(0);
  const [profile, setProfile] = React.useState();
  const [shop, setShop] = React.useState({});

  async function getProfile() {
    var response = await getUserInfo();

    setProfile(response);

    if (response.isShoper) {
      var res = await getShopInfo();

      setShop(res);

      console.log(res);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  const updateProfile = (_profile) => {
    updateUser(
      _profile,
      () => {
        toast({
          title: "Cập nhật thành công!",
          duration: 1000,
          isClosable: false,
          status: "success",
        });
      },
      () => {
        toast({
          title: "Lỗi",
          description: "Đã có lỗi xảy ra",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    );
  };

  const chgPassword = (passwordSet) => {
    changePassword(
      passwordSet,
      () => {
        toast({
          title: "Cập nhật thành công!",
          duration: 1000,
          isClosable: false,
          status: "success",
        });
      },
      (err) => {
        if (err.response.status == 401) {
          // Toast warnign wrong old password
          toast({
            title: "Lỗi",
            description: "Mật khẩu hiện tại không đúng",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        else {
          toast({
            title: "Lỗi",
            description: "Đã có lỗi xảy ra",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    );
  };

  const updShop = (_profile) => {
    if (profile.isShoper)
      updateShop(
        _profile,
        () => {
          toast({
            title: "Cập nhật thành công!",
            duration: 1000,
            isClosable: false,
            status: "success",
          });
        },
        () => {
          toast({
            title: "Lỗi",
            description: "Đã có lỗi xảy ra",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      );
    else
      upToShop(
        _profile,
        () => {
          toast({
            title: "Chúc mừng bạn đã trở thành đối tác của chúng tôi",
            duration: 1000,
            isClosable: false,
            status: "success",
          });
        },
        () => {
          toast({
            title: "Lỗi",
            description: "Đã có lỗi xảy ra",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      );
  };

  return (
    <ChakraProvider>
      <div id="wrapper">
        <div id="route">
          <div style={{ flexGrow: "1" }}>
            <a style={{ color: "rgba(0, 0, 0, 0.5)" }}>Tài khoản </a>/
            <a> My Account</a>
          </div>
          <div>Welcome!</div>
          <div style={{ color: "#DB4444" }}>{profile ? profile.name : ""}</div>
        </div>
        <>
          {profile && (
            <div id="body">
              <div className="menu">
                <div className="menu-title">Manage My Account</div>
                <div className="menu-option">
                  <a
                    onClick={() => setMenu(0)}
                    style={{ color: menu == 0 ? "#db4444" : "rgba(0,0,0,0.5)" }}
                  >
                    Tài khoản
                  </a>
                  <a
                    onClick={() => setMenu(1)}
                    style={{ color: menu == 1 ? "#db4444" : "rgba(0,0,0,0.5)" }}
                  >
                    Đổi mật khẩu
                  </a>
                </div>
                <div className="menu-title">My Shop</div>
                <div className="menu-option">
                  <a
                    onClick={() => setMenu(2)}
                    style={{ color: menu == 2 ? "#db4444" : "rgba(0,0,0,0.5)" }}
                  >
                    Shop của bạn
                  </a>
                  <a
                    onClick={() => { navigateToUrl('/statistics') }}
                    style={{ color: "rgba(0,0,0,0.5)" }}
                  >
                    Thống kê
                  </a>
                  <a
                    onClick={() => { navigateToUrl('/manage-products') }}
                    style={{ color: "rgba(0,0,0,0.5)" }}
                  >
                    Quản lý sản phẩm
                  </a>
                  <a
                    onClick={() => {/* LINK*/ }}
                    style={{ color: "rgba(0,0,0,0.5)" }}
                  >
                    Đơn hàng
                  </a>
                </div>
              </div>
              <div id="manage">
                {menu == 0 ? (
                  profile && (
                    <MyProfile
                      {...profile}
                      onSubmit={(e) => updateProfile(e)}
                    />
                  )
                ) : menu == 1 ? (
                  <ChangePassword {...shop} onSubmit={(e) => chgPassword(e)} />
                ) : menu == 2 ? (
                  <ShopProfile {...shop} onSubmit={(e) => updShop(e)} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </>
      </div>
    </ChakraProvider>
  );
}
