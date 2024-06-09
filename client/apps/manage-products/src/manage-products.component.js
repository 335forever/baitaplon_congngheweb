import "./index.css";

import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Product from "./components/Product";

import icAdd from "../assets/images/ic_add.svg";
import imgProduct from "../assets/images/product.svg";
import DropdownGrid from "./components/DropdownGrid";

const products = [
  {
    "id": 1,
    "image": imgProduct,
    "name": "HAVIT HV-G92 Gamepad",
    "price": 5000000
  },
  {
    "id": 2,
    "image": imgProduct,
    "name": "HAVIT HV-G92 Gamepad",
    "price": 5000000
  },
  {
    "id": 3,
    "image": imgProduct,
    "name": "HAVIT HV-G92 Gamepad",
    "price": 5000000
  },
  {
    "id": 4,
    "image": imgProduct,
    "name": "HAVIT HV-G92 Gamepad",
    "price": 5000000
  },
  {
    "id": 5,
    "image": imgProduct,
    "name": "HAVIT HV-G92 Gamepad",
    "price": 5000000
  },
  {
    "id": 6,
    "image": imgProduct,
    "name": "HAVIT HV-G92 Gamepad",
    "price": 5000000
  }
]

export default function ManageProducts(props) {
  return (
    <div id="wrapper">
      <div id="filter">
        <div className="classify">
          <div>Sắp xếp theo</div>
          <select style={{ "fontFamily": "Inter" }}>
            <option value="Tên">Tên</option>
            <option value="Ngày tạo">Ngày tạo</option>
            <option value="Giá">Giá</option>
          </select>
        </div>
        <div className="classify">
          <div>Danh mục</div>
          <DropdownGrid></DropdownGrid>
        </div>
      </div>
      <div id="list">
        <button style={{ "backgroundColor": "#f5f5f5", "borderRadius": "8px" }}><img src={icAdd} alt="" /></button>
        {products.map((e) => <Product key={e.id} {...e}></Product>)}
      </div>
    </div>
  );
}
