import "./index.css";
import React, { useState, useEffect } from "react";
import Parcel from "single-spa-react/parcel";

import { Button, ChakraProvider } from "@chakra-ui/react";
import Order from "./components/order";
import item1 from "../assets/images/item1.svg"
import item2 from "../assets/images/item2.svg"
// import { NavRoute } from "@TachMonShop/styleguide"
import { approveOrders, getOrders, manageOrders } from "../../../api/src/controllers/order.controller";
import { getShopInfo, getUserInfo } from "../../../api/src/controllers/account.controller";

const menus = ['Tất cả', 'Đã hủy', 'Chờ xác nhận', 'Đã xác nhận']

export default function orderlist() {
  const [mode, setMode] = useState(0);
  const [orders, setOrders] = React.useState();
  const [seller, setSeller] = React.useState(false);

  async function getRole() {
    const res = await getShopInfo(() => { setSeller(false) });

    if (res) { setSeller(true); mngOrders(); }
    else getorders();
  }

  const getorders = async () => {
    const res = await getOrders();
    if (res) setOrders(res)
  }

  const mngOrders = async () => {
    const res = await manageOrders();
    if (res) setOrders(res);
  }

  async function onCancel({ orderId, msgToUser }) {
    const res = await approveOrders({ orderId, msgToUser, status: 1 });
    if (res) getorders();
  }

  async function onConfirm({ orderId, msgToUser }) {
    console.log({ orderId, msgToUser, status: 2 })
    const res = await approveOrders({ orderId, msgToUser, status: 2 });
    if (res) getorders();
  }

  useEffect(() => {
    getRole();
  }, [])

  return (
    <ChakraProvider>
      <div className="wrapper">
        {/* <Parcel
          config={NavRoute}
          names={["Trang chủ", "Tài khoản", "Đơn hàng đã đặt"]}
        /> */}
        <div className="body">
          <div className="mode">
            {menus.map((e, index) =>
              <a key={index} onClick={() => setMode(index)} style={{ color: mode == index ? '#DB4444' : 'rgba(0,0,0,0.5)', fontWeight: mode == index ? '600' : '400' }}>{e}</a>)
            }
          </div>
          <div className="order-list">
            {orders ?
              orders.map((e, index) => (e.status == mode - 1 || mode == 0 ?
                <Order key={e.orderID} seller={seller} {...e} onCancel={(m) => onCancel({ msgToUser: m, orderId: e.orderID })} onConfirm={(m) => onConfirm({ msgToUser: m, orderId: e.orderID })} />
                : <div></div>)) : <></>}
          </div>
        </div>
      </div>
    </ChakraProvider >
  );
}
