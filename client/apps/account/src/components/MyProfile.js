import icAvatar from "../../assets/images/ic_avatar.svg"

import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

import { uploadImages } from "@TachMonShop/api";

export default function MyProfile({ avatar, name, email, phone, address, birthday, onSubmit }) {
  const [_avatar, setAvatar] = React.useState(avatar);
  const [_name, setName] = React.useState(name);
  const [_email, setEmail] = React.useState(email);
  const [_phone, setPhone] = React.useState(phone);
  const [_address, setAddress] = React.useState(address);
  const [_dob, setDob] = React.useState(birthday == null ? '' : birthday.split("T")[0]);

  const [image, setImage] = React.useState();

  const [notify, setNotify] = React.useState();

  function handleFiles(event) {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAvatar(fileUrl);
      setImage(file);
    }
  }

  const submit = () => {
    if (_email.length > 0 && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(_email)) {
      setNotify('Email không hợp lệ')
      return;
    } else if (_phone.length > 0 && !/^0\d{9}$/.test(_phone)) {
      setNotify('Số điện thoại không hợp lệ')
      return;
    }

    if (image) {
      const formData = new FormData();
      formData.append('images[]', image);

      uploadImages(
        formData,
        (res) => {
          /*toast failed to upload imgae*/
          console.log(res);
          onSubmit({ name: _name, email: _email, phone: _phone, address: _address, birthday: _dob })
        },
        (res) => {
          console.log(res.data.images.image1);
          onSubmit({ name: _name, email: _email, phone: _phone, address: _address, birthday: _dob, avatar: res.data.images.image1 })
        },
      )
    } else {
      onSubmit({ name: _name, email: _email, phone: _phone, address: _address, birthday: _dob })
    }
  }

  return (<div className="main" id="my-profile">
    <div className="title">Thông tin cá nhân</div>
    <div className="row">
      <div className="image-upload">
        <label htmlFor="file-input">
          <img key={_avatar} src={_avatar == null ? icAvatar : _avatar} alt="Chọn ảnh" />
        </label>
        <input id="file-input" type="file" onChange={handleFiles} />
      </div>
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
    <div className="row">
      <div className="notify">{notify}</div>
    </div>
    <div className="function">
      <Button id="confirmButton" colorScheme="red" onClick={submit}>Xác nhận</Button>
    </div>
  </div >)
}