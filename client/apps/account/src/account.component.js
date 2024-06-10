import './index.css';

import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
// import { toast } from '@TachMonShop/notification';

import MyProfile from './components/MyProfile';
import ChangePassword from './components/ChangePassword';
import ShopProfile from './components/ShopProfile';
import UnregisterShop from './components/UnregsiterShop';

export default function Account(props) {
  document.title = "TachMonShop | Tài khoản"

  const [menu, setMenu] = React.useState(0);

  const updateProfile = (profile) => {

  }

  const changePassword = (passwordSet) => {

  }

  const updateShop = (profile) => {

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
          <div style={{ "color": "#DB4444" }}>Sâm</div>
        </div>
        <div id="body">
          <div className="menu">
            <div className="menu-title">Manage My Account</div>
            <div className="menu-option">
              <a onClick={() => setMenu(0)} style={{ "color": menu == 0 ? "#db4444" : "rgba(0,0,0,0.5)" }}>My Profile</a>
              <a onClick={() => setMenu(1)} style={{ "color": menu == 1 ? "#db4444" : "rgba(0,0,0,0.5)" }}>Change password</a>
            </div>
            <div className="menu-title">My Shop</div>
            <div className="menu-option">
              <a onClick={() => setMenu(2)} style={{ "color": menu == 2 ? "#db4444" : "rgba(0,0,0,0.5)" }}>Shop profile</a>
              <a onClick={() => setMenu(3)} style={{ "color": menu == 3 ? "#db4444" : "rgba(0,0,0,0.5)" }}>Unregister shop</a>
            </div>
          </div>
          <div id="manage">
            {menu == 0 ? <MyProfile onSubmit={(e) => updateProfile(e)} />
              : menu == 1 ? < ChangePassword onSubmit={(e) => changePassword(e)} />
                : menu == 2 ? <ShopProfile onSubmit={(e) => updateShop(e)} />
                  : <UnregisterShop />
            }
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}
