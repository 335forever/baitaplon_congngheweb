import icAvatar from "../../assets/images/ic_avatar.svg"

import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

export default function ShopProfile({ avatar, name, address, phone, email, taxId, onSubmit }) {
  const [_name, setName] = React.useState(name);
  const [_email, setEmail] = React.useState(email);
  const [_phone, setPhone] = React.useState(phone);
  const [_address, setAddress] = React.useState(address);
  const [_taxId, setTaxId] = React.useState(taxId);

  return (<div className="main" id="shop-profile">
    <div className="title">Thông tin cá nhân</div>
    <div className="notify">* Bạn hiện giờ chưa phải là người bán, bấm nút Xác nhận đồng nghĩa bạn sẽ đăng ký trở thành người bán</div>
    <div className="row">
      <button><img src={avatar == null ? icAvatar : avatar} alt=""></img></button>
      <div className="textfield">
        <div>Tên shop</div>
        <input onChange={(e) => setName(e.target.value)} value={_name}></input>
      </div>
    </div>
    <div className="row">
      <div className="textfield">
        <div>Mã số thuế</div>
        <input onChange={(e) => setTaxId(e.target.value)} type="number" value={_taxId}></input>
      </div>
      <div className="textfield">
        <div>Số điện thoại</div>
        <input onChange={(e) => setPhone(e.target.value)} type="number" value={_phone}></input>
      </div>
    </div>
    <div className="row">
      <div className="textfield">
        <div>Email</div>
        <input onChange={(e) => setEmail(e.target.value)} value={_email}></input>
      </div>
      <div className="textfield">
        <div>Địa chỉ</div>
        <input onChange={(e) => setAddress(e.target.value)} value={_address}></input>
      </div>
    </div>
    <div className="function">
      <Button colorScheme="red" onClick={() => onSubmit({ _name, _email, _phone, _address, _taxId })}>Xác nhận</Button>
    </div>
  </div>)
}