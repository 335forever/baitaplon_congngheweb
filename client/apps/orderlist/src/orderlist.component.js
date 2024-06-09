import "./index.css";
import React, { useState } from "react";
import { Button, ChakraProvider } from "@chakra-ui/react";
import Order from "./components/order";
import item1 from "../assets/images/item1.svg"
import item2 from "../assets/images/item2.svg"

const menus = ['Tất cả', 'Đã giao', 'Đang giao', 'Chờ xác nhận', 'Đã hủy']

const orders = [
  {
    name: 'Shop ABC',
    status: 3,
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
    status: 4,
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

  function getRole() {
    // Get userRole
  }

  function getOrders() {

  }

  return (
    <ChakraProvider>
      <div className="wrapper">
        <div className="navigator">
          <a style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Tài khoản </a>
          /
          <a> Danh sách đơn hàng</a>
        </div>
        <div className="body">
          <div className="mode">
            {menus.map((e, index) => <a key={index} onClick={() => setMode(index)} style={{ color: mode == index ? '#DB4444' : 'rgba(0,0,0,0.5)', fontWeight: mode == index ? '600' : '400' }}>{e}</a>)}
          </div>
          <div className="list">
            {orders.map((e, index) => (e.status == mode || mode == 0 ? <Order key={index} seller={seller} {...e} /> : <div></div>))}
          </div>
        </div>
      </div>
    </ChakraProvider >
  );
}
