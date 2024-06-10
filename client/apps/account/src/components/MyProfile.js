import icAvatar from "../../assets/images/ic_avatar.svg"

import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

export default function MyProfile({ avatar, name, email, phone, address, birthday, onSubmit }) {
  const [_avatar, setAvatar] = React.useState();
  const [_name, setName] = React.useState(name);
  const [_email, setEmail] = React.useState(email);
  const [_phone, setPhone] = React.useState(phone);
  const [_address, setAddress] = React.useState(address);
  const [_dob, setDob] = React.useState(birthday);

  return (<div className="main" id="my-profile">
    <div className="title">Thông tin cá nhân</div>
    <div className="row">
      <button><img src={avatar == null ? icAvatar : avatar} alt=""></img></button>
      <div className="textfield">
        <div>Họ và tên</div>
        <input onChange={(e) => setName(e.target.value)} value={_name}></input>
      </div>
      <div className="textfield">
        <div>Ngày sinh</div>
        <input onChange={(e) => setDob(e.target.value)} type="date" value={_dob}></input>
      </div>
    </div>
    <div className="row">
      <div className="textfield">
        <div>Email</div>
        <input onChange={(e) => setEmail(e.target.value)} value={_email}></input>
      </div>
      <div className="textfield">
        <div>Số điện thoại</div>
        <input onChange={(e) => setPhone(e.target.value)} type="number" value={_phone}></input>
      </div>
    </div>
    <div className="row">
      <div className="textfield">
        <div>Địa chỉ</div>
        <input onChange={(e) => setAddress(e.target.value)} value={_address}></input>
      </div>
    </div>
    <div className="function">
      <Button colorScheme="red" onClick={() => onSubmit({ _name, _email, _phone, _address, _dob })}>Xác nhận</Button>
    </div>
  </div>)
}