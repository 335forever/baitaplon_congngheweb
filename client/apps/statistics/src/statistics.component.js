import "./index.css";
import Summarize from "./components/Summarize.js";
import icCustomer from "../assets/images/ic_customers.svg";
import icDiscount from "../assets/images/ic_discount.svg";
import icOrders from "../assets/images/ic_orders.svg";
import icRevenue from "../assets/images/ic_revenue.svg";
import icSearch from "../assets/images/ic_search.svg";

import icAvatar from "../assets/images/ic_avatar.png";

import React, { useState } from "react";
import { ChakraProvider, Progress } from "@chakra-ui/react";
import RecentOrder from "./components/RecentOrder.js";
import BestSeller from "./components/BestSeller.js";

const relateOrders = [
  {
    "avatar": "../../assets/images/ic_avatar.svg",
    "name": "Maxima Smalls",
    "time": new Date(2024, 6, 7, 18, 0, 0),
    "receipt": 350000,
    "status": 1
  },
  {
    "avatar": "../../assets/images/ic_avatar.svg",
    "name": "Maxima Smalls",
    "time": new Date(2024, 6, 6, 18, 0, 0),
    "receipt": 40000,
    "status": 1
  },
  {
    "avatar": "../../assets/images/ic_avatar.svg",
    "name": "Miru Xander",
    "time": new Date(2024, 6, 7, 12, 10, 0),
    "receipt": 18760,
    "status": 2
  },
  {
    "avatar": "../../assets/images/ic_avatar.svg",
    "name": "Lau Baker",
    "time": new Date(2024, 6, 7, 19, 0, 0),
    "receipt": 3200000,
    "status": 3
  },
  {
    "avatar": "../../assets/images/ic_avatar.svg",
    "name": "Ragnar Walls",
    "time": new Date(2024, 5, 31, 18, 0, 0),
    "receipt": 5500,
    "status": 0
  },
  {
    "avatar": "../../assets/images/ic_avatar.svg",
    "name": "Ragnar Walls",
    "time": new Date(2024, 5, 31, 18, 0, 0),
    "receipt": 5500,
    "status": 0
  },
];

const bestSellers = [
  {
    "image": icAvatar,
    "name": "Kính đen",
    "price": 390000,
    "quantity": 705,
    "sale": 151222500
  },
  {
    "image": icAvatar,
    "name": "Kính đen",
    "price": 390000,
    "quantity": 705,
    "sale": 151222500
  },
  {
    "image": icAvatar,
    "name": "Kính đen",
    "price": 390000,
    "quantity": 705,
    "sale": 151222500
  },
  {
    "image": icAvatar,
    "name": "Kính đen",
    "price": 390000,
    "quantity": 705,
    "sale": 151222500
  },
  {
    "image": icAvatar,
    "name": "Kính đen",
    "price": 390000,
    "quantity": 705,
    "sale": 151222500
  }
];
export default function statistics(props) {
  const [fromDate, setFromDate] = React.useState(30);

  return (
    <ChakraProvider>
      <div id="wrapper">
        <div className="time-machine">
          <div>
            <div className="range-label">Thống kê từ</div>
            <input type="date" className="range-date" onChange={(e) => setFromDate(e.target.value)} value={fromDate}></input>
          </div>
          <div>
            <div className="range-label">Thống kê đến</div>
            <input type="date" className="range-date" max={today} onChange={(e) => setToDate(e.target.value)} value={toDate}></input>
          </div>
        </div>
        <div id="overall">
          <Summarize label="DOANH THU THÁNG" total={35000000} unit="VND" percent={6.50} icon={icRevenue} iconColor="#00ff66" />
          <Summarize label="TỔNG GIÁ TRỊ VOUCHER" total={2000000} unit="VND" percent={6.50} icon={icDiscount} iconColor="#000000"></Summarize>
          <Summarize label="SỐ KHÁCH HÀNG" total={34} percent={-2.86} icon={icCustomer} iconColor="#ff59ee"></Summarize>
          <Summarize label="SỐ ĐƠN HÀNG" total={68} percent={-2.86} icon={icOrders} iconColor="#489dec"></Summarize>
        </div>
        <div id="detail">
          <div id="recent-order">
            <div className="detail-label">
              <div>ĐƠN HÀNG GẦN ĐÂY</div>
              <button><img src={icSearch} alt=""></img></button>
            </div>
            <div className="detail-property">
              <div style={{ "flex": "1 0 50.6%" }}>Người mua</div>
              <div style={{ "flex": "1 0 29.26%" }}>Thanh toán</div>
              <div style={{ "flex": "1 0 19.14%" }}>Trạng thái</div>
            </div>
            <div style={{ "maxHeight": "285px", "overflowY": "auto" }}>{relateOrders.map((order, index) => <RecentOrder key={index} {...order} />)}</div>
          </div>
          <div id="best-sellers">
            <div className="detail-label">
              <div>SẢN PHẨM BÁN CHẠY</div>
              <button><img src={icSearch} alt=""></img></button>
            </div>
            <div className="detail-property">
              <div style={{ "flex": "1 0 30%" }}>Sản phẩm</div>
              <div style={{ "flex": "1 0 15%" }}>Giá</div>
              <div style={{ "flex": "1 0 10%" }}>Số lượng</div>
              <div style={{ "flex": "1 0 20%" }}>Doanh thu</div>
              <div style={{ "flex": "1 0 20%" }}>Sale</div>
              <div style={{ "flex": "1 0 5%" }}></div>
            </div>
            {/* <Progress isIndeterminate /> */}
            <div style={{ "maxHeight": "414px", "overflowX": "hidden", "overflowY": "auto" }}>{bestSellers.map((e, index) => <BestSeller key={index} {...e}></BestSeller>)}</div>
          </div>
        </div>
      </div>
    </ChakraProvider >
  );
}
