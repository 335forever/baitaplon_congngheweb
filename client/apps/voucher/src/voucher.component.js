import "./index.css";

import icAdd from "../assets/images/ic_add.svg";

import React, { useState } from "react";
import Voucher from "./components/Voucher";

export default function VoucherList(props) {
  const [vouchers, setVouchers] = useState([{
    id: 1,
    type: 0, // 0: %; 1: VND
    value: 50,
    minOrder: 100000,
    maxDiscount: 20000
  },
  {
    id: 2,
    type: 1, // 0: %; 1: VND
    value: 30000,
    minOrder: 100000,
    maxDiscount: 30000
  },
  {
    id: 3,
    type: 0, // 0: %; 1: VND
    value: 50,
    minOrder: 100000,
    maxDiscount: 20000
  },
  {
    id: 4,
    type: 1, // 0: %; 1: VND
    value: 30000,
    minOrder: 100000,
    maxDiscount: 30000
  },
  {
    id: 5,
    type: 0, // 0: %; 1: VND
    value: 50,
    minOrder: 100000,
    maxDiscount: 20000
  }
  ]);

  const handleDelete = (id) => {
    setVouchers(vouchers.filter(voucher => voucher.id !== id));
  };

  return (
    <div id="wrapper">
      <div id="route">
        <a style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Tài khoản </a>
        /
        <a> Vouchers</a>
      </div>
      <div id="body">
        {vouchers.map((e, index) => (
          <Voucher key={index} {...e} onDelete={() => handleDelete(e.id)} />
        ))}
        <button id="add" onClick={() => setVouchers([...vouchers, { id: vouchers.length + 1, type: 0, value: 0, minOrder: 0, maxDiscount: 0 }])}>
          <img src={icAdd} alt="Add"></img>
        </button>
      </div>
    </div >
  );
}