import './index.css';

import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
// import { toast } from '@TachMonShop/notification';

import MyProfile from './components/MyProfile';
import ChangePassword from './components/ChangePassword';
import ShopProfile from './components/ShopProfile';
import { changePassword, getShopInfo, getUserInfo, upToShop, update, updateShop } from '../../../api/src/controllers/account.controller';

export default function Account(props) {
  document.title = "TachMonShop | Tài khoản"

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
    getProfile()
  }, []);


  const updateProfile = (_profile) => {
    update(_profile, () => { /* toast*/ }, () => {/* toast*/ });
  }

  const chgPassword = (passwordSet) => {
    changePassword(passwordSet,
      () => {/*toast success*/ },
      (err) => {
        if (err.statuscode == 401) {
          // Toast warnign wrong old password
        }
      })
  }

  const updShop = (_profile) => {
    if (profile.isShoper) updateShop(_profile, () => {/* toast success*/ }, () => {/*toast error*/ });
    else
      upToShop(_profile, () => {/* toast success*/ }, () => {/*toast error*/ });
  }


  return (
    <ChakraProvider>
      <div id="wrapper">
        <div id="route">
          <div style={{ "flexGrow": "1" }}>
            <a style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Tài khoản </a>
            /
            <a> My Account</a>
          </div>
          <div>Welcome!</div>
          <div style={{ "color": "#DB4444" }}>{profile ? profile.name : ''}</div>
        </div>
        <>
          {profile && <div id="body">
            <div className="menu">
              <div className="menu-title">Manage My Account</div>
              <div className="menu-option">
                <a onClick={() => setMenu(0)} style={{ "color": menu == 0 ? "#db4444" : "rgba(0,0,0,0.5)" }}>My Profile</a>
                <a onClick={() => setMenu(1)} style={{ "color": menu == 1 ? "#db4444" : "rgba(0,0,0,0.5)" }}>Change password</a>
              </div>
              <div className="menu-title">My Shop</div>
              <div className="menu-option">
                <a onClick={() => setMenu(2)} style={{ "color": menu == 2 ? "#db4444" : "rgba(0,0,0,0.5)" }}>Shop profile</a>
                {/* {profile.isShoper ? <a onClick={() => setMenu(3)} style={{ "color": menu == 3 ? "#db4444" : "rgba(0,0,0,0.5)" }}>Unregister shop</a> : <></>} */}
              </div>
            </div>
            <div id="manage">
              {menu == 0 ? profile && <MyProfile {...profile} onSubmit={(e) => updateProfile(e)} />
                : menu == 1 ? < ChangePassword {...shop} onSubmit={(e) => chgPassword(e)} />
                  : menu == 2 ? <ShopProfile {...shop} onSubmit={(e) => updShop(e)} />
                    : <></>
              }
            </div>
          </div>}
        </>
      </div>
    </ChakraProvider >
  );
}
