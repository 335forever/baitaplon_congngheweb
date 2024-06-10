import "./index.css";

import icAdd from "../assets/images/ic_add.svg";
import Voucher from "./components/Voucher";
import {
  createVoucher,
  deleteVoucher,
  getUserInfo,
  getVouchers,
  updateVoucher,
} from "@TachMonShop/api";

import React, { useState, useEffect } from "react";
import Parcel from "single-spa-react/parcel";
import { ChakraProvider } from "@chakra-ui/react";
import { toast } from "@TachMonShop/notification";
import { NavRoute } from "@TachMonShop/styleguide";

export default function VoucherList(props) {
  document.title = "TachMonShop | Vouchers";

  const [vouchers, setVouchers] = React.useState([]);

  const shopId = 21; // Chỗ này anh giúp em lấy shopID với, em không biết anh và anh Quân trao đổi lấy shopID chỗ nào rồi

  async function getData() {
    const data = await getVouchers(shopId);
    setVouchers(data);
  }

  async function crVoucher(voucher) {
    try {
      const status = await createVoucher({ ...voucher });

      if (status) {
        await getData();
      } else {
        toast({
          title: "Không lấy được dữ liệu",
          duration: 1000,
          isClosable: false,
          status: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function delVoucher(voucherid) {
    try {
      const response = deleteVoucher(voucherid);

      if (response) {
        await getData();
      } else {
        toast({
          title: "Lỗi khi xóa voucher",
          duration: 1000,
          isClosable: false,
          status: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updVoucher(voucher) {
    try {
      const response = updateVoucher(voucher);

      if (response) {
        await getData();
      } else {
        toast({
          title: "Lỗi khi cập nhật voucher",
          duration: 1000,
          isClosable: false,
          status: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // getUserInfo();  -- Thực ra phải getUserInfo xong mới getData nhưng em khum biết làm hihi
    getData();
  }, []);

  return (
    <ChakraProvider>
      <div id="wrapper">
        <Parcel
          config={NavRoute}
          names={["Trang chủ", "Tài khoản", "Mã giảm giá"]}
        />
        <div id="body">
          {vouchers.map((e, index) => (
            <Voucher
              key={index}
              {...e}
              onCreate={(voucher) => crVoucher(voucher)}
              onDelete={(voucherId) => delVoucher(voucherId)}
              onUpdate={(voucher) => updVoucher(voucher)}
            />
          ))}
          <button
            id="add"
            onClick={() =>
              setVouchers([
                ...vouchers,
                {
                  discountPercent: 0,
                  expired: new Date().toISOString(),
                  minprice: 0,
                  maxdiscount: 0,
                  quantity: 0,
                },
              ])
            }
          >
            <img src={icAdd} alt="Add"></img>
          </button>
        </div>
      </div>
    </ChakraProvider>
  );
}
