import React from "react"
import { Button } from "@chakra-ui/react";

export default function ChangePassword({ onSubmit }) {
  const [_old, setOld] = React.useState('');
  const [_new, setNew] = React.useState('');
  const [_confirm, setConfirm] = React.useState('');

  const [notify, setNotify] = React.useState();

  const submit = () => {
    if (_new != _confirm) {
      setNotify("Xác nhận mật khẩu không khớp")
    } else if (_new.length < 8) {
      setNotify("Mật khẩu phải có ít nhất 8 ký tự")
    } else {
      onSubmit({ oldPass: _old, newPass: _new });
    }
  }

  return (<div className="main" id="change-password">
    <div className="title">Đổi mật khẩu</div>
    <div className="row">
      <div className="textfield">
        <div>Mật khẩu cũ</div>
        <input onChange={(e) => setOld(e.target.value)} type="password" value={_old}></input>
      </div>
    </div>
    <div className="row">
      <div className="textfield">
        <div>Mật khẩu mới</div>
        <input onChange={(e) => setNew(e.target.value)} type="password" value={_new}></input>
      </div>
    </div>
    <div className="row">
      <div className="textfield">
        <div>Xác nhận mật khẩu mới</div>
        <input onChange={(e) => setConfirm(e.target.value)} type="password" value={_confirm}></input>
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