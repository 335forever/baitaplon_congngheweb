import icAvatar from "../../assets/images/ic_avatar.svg"

import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { uploadImages } from "../../../../api/src/controllers/account.controller";

export default function ShopProfile({ avatar, name, address, phone, email, taxid, onSubmit }) {
  const [_avatar, setAvatar] = React.useState(avatar);
  const [_name, setName] = React.useState(name);
  const [_email, setEmail] = React.useState(email);
  const [_phone, setPhone] = React.useState(phone);
  const [_address, setAddress] = React.useState(address);
  const [_taxId, setTaxId] = React.useState(taxid);

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
    if (_name == null) {
      setNotify('Không được để trống tên shop')
      return;
    } else if (_email == null) {
      setNotify('Không được để trống email')
      return;
    } else if (_phone == null) {
      setNotify('Không được để trống số điện thoại')
      return;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(_email)) {
      setNotify('Email không hợp lệ')
      return;
    } else if (!/^0\d{9}$/.test(_phone)) {
      setNotify('Số điện thoại không hợp lệ')
      return;
    } else if (_taxId == null) {
      setNotify('Không được để trống mã số thuế')
      return;
    }

    if (image) {
      const formData = new FormData();
      formData.append('images[]', image);

      uploadImages(
        formData,
        (res) => {/*toast failed to upload image*/
        },
        (res) => {
          console.log(res);
          onSubmit({ name: _name, email: _email, phone: _phone, address: _address, taxid: _taxId, avatar: res.data.images.image1 })
        },
      )
    } else {
      if (avatar == null) setNotify('Phải có ảnh đại diện');
      else onSubmit({ name: _name, email: _email, phone: _phone, address: _address, taxid: _taxId, avatar: avatar })
    }
  }

  return (<div className="main" id="shop-profile">
    <div className="title">Thông tin cá nhân</div>
    <div className="notify">{name == null ? '* Bạn hiện giờ chưa phải là người bán, bấm nút Xác nhận đồng nghĩa bạn sẽ đăng ký trở thành người bán' : ''}</div>
    <div className="row">
      <div className="image-upload">
        <label htmlFor="file-input">
          <img key={_avatar} src={_avatar == null ? icAvatar : _avatar} alt="Chọn ảnh" />
        </label>
        <input id="file-input" type="file" onChange={handleFiles} />
      </div>
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
    <div className="row">
      <div className="notify">{notify}</div>
    </div>
    <div className="function">
      <Button colorScheme="red" onClick={submit}>Xác nhận</Button>
    </div>
  </div>)
}