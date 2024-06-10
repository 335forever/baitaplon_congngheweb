import "./index.css";
import Summarize from "./components/Summarize.js";
import icCustomer from "../assets/images/ic_customers.svg";
import icDiscount from "../assets/images/ic_discount.svg";
import icOrders from "../assets/images/ic_orders.svg";
import icRevenue from "../assets/images/ic_revenue.svg";
import icSearch from "../assets/images/ic_search.svg";

import icAvatar from "../assets/images/ic_avatar.png";

import React, { useState, useEffect } from "react";
import { ChakraProvider, Progress } from "@chakra-ui/react";
import RecentOrder from "./components/RecentOrder.js";
import BestSeller from "./components/BestSeller.js";
import { getCustomerNumber, getIncome, getOrderNumber } from "../../../api/src/controllers/statistics.controller.js";

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
  var today = new Date();

  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth()).padStart(2, '0');
  var yyyy = today.getFullYear();
  const [fromDate, setFromDate] = React.useState(yyyy + '-' + mm + '-' + dd);

  mm = String(today.getMonth() + 1).padStart(2, '0');
  const [toDate, setToDate] = React.useState(yyyy + '-' + mm + '-' + dd);

  var income, customerCount, orderCount;

  const [cusKeyword, setCusKeyword] = React.useState('');
  const [productKeyword, setProductKeyword] = React.useState('');

  useEffect(() => {
    // income = getIncome({ 'from': fromDate, 'to': toDate })
    // customerCount = getCustomerNumber({ 'from': fromDate, 'to': toDate })
    // orderCount = getOrderNumber({ 'from': fromDate, 'to': toDate })
  }, [])

  return (
    <ChakraProvider>
      <div id="wrapper">
        <div className="time-machine">
          <div>
            <div className="range-label">Thống kê từ</div>
            <input type="date" className="range-date" onChange={(e) => setFromDate(e.target.value)} value={fromDate}></input>
          </div>
          <div>
            <div className="range-label"> đến</div>
            <input type="date" className="range-date" max={yyyy + '-' + mm + '-' + dd} onChange={(e) => setToDate(e.target.value)} value={toDate}></input>
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
              <div style={{ "flexGrow": "1" }}>ĐƠN HÀNG GẦN ĐÂY</div>
              <input onKeyDown={(e) => (e.key == 'Enter') ? setCusKeyword(e.target.value) : {}} placeholder="Tên khách hàng"></input>
              <button><img src={icSearch} alt=""></img></button>
            </div>
            <div className="detail-property">
              <div style={{ "flex": "1 0 50.6%" }}>Người mua</div>
              <div style={{ "flex": "1 0 29.26%" }}>Thanh toán</div>
              <div style={{ "flex": "1 0 19.14%" }}>Trạng thái</div>
            </div>
            <div style={{ "maxHeight": "285px", "overflowY": "auto" }}>
              {relateOrders.filter(cus => cus.name.toLowerCase().includes(cusKeyword.toLowerCase())).map((order, index) => <RecentOrder key={index} {...order} />)}
            </div>
          </div>
          <div id="best-sellers">
            <div className="detail-label">
              <div style={{ "flexGrow": "1" }}>SẢN PHẨM BÁN CHẠY</div>
              <input onKeyDown={(e) => (e.key == 'Enter') ? setProductKeyword(e.target.value) : {}} placeholder="Tên sản phẩm"></input>
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
            <div style={{ "maxHeight": "414px", "overflowX": "hidden", "overflowY": "auto" }}>
              {bestSellers.filter(prod => prod.name.toLowerCase().includes(productKeyword.toLowerCase())).map((e, index) => <BestSeller key={index} {...e}></BestSeller>)}
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider >
  );
}
