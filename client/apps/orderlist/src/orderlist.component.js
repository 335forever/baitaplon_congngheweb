import "./index.css";
import React, { useState, useEffect } from "react";
import Parcel from "single-spa-react/parcel";

import { Button, ChakraProvider } from "@chakra-ui/react";
import Order from "./components/order";
import item1 from "../assets/images/item1.svg"
import item2 from "../assets/images/item2.svg"
// import { NavRoute } from "@TachMonShop/styleguide"
import { getOrders, manageOrders } from "../../../api/src/controllers/order.controller";

const menus = ['Tất cả', 'Đã hủy', 'Chờ xác nhận', 'Đã xác nhận']

const orders = [
  {
    name: 'Shop ABC',
    status: 2,
    products: [
      {
        image: { item1 },
        name: 'H1 Gamepad',
        quantity: 2,
        price: 650000
      },
      {
        image: { item2 },
        name: 'LCD Monitor',
        quantity: 1,
        price: 1100000
      }
    ]
  },
  {
    name: 'Honkai Impact 3 Retail',
    status: 1,
    products: [
      {
        image: { item1 },
        name: 'H1 Gamepad',
        quantity: 2,
        price: 650000
      }
    ]
  }
]

export default function orderlist() {
  const [mode, setMode] = useState(0);
  var seller = false;

  async function getRole() {
    const res = await getUserInfo();

    if (seller = res.isShoper) manageOrders();
    else getOrders();
  }

  useEffect(() => {
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
            {orders.map((e, index) => (e.status == mode - 1 || mode == 0 ? <Order key={index} seller={true} {...e} /> : <div></div>))}
          </div>
        </div>
      </div>
    </ChakraProvider >
  );
}
