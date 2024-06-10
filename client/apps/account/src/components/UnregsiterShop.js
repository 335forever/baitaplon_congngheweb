import React from "react"
import { Button } from "@chakra-ui/react";

export default function UnregisterShop({ onSubmit }) {
  const [_reason, setReason] = React.useState();
  const [_new, setNew] = React.useState();
  const [_confirm, setConfirm] = React.useState();

  return (<div className="main" id="change-password">
    <div className="title">Hủy shop</div>
    <div className="row">
      <div className="textfield">
        <div>Lý do (tùy chọn)</div>
        <input onChange={(e) => setReason(e.target.value)} value={_reason}></input>
      </div>
    </div>
    <div className="row">
      <div className="textfield">
        <div>Mật khẩu mới</div>
        <input onChange={(e) => setNew(e.target.value)} type="password" value={_new}></input>
      </div>
    </div><div className="row">
      <div className="textfield">
        <div>Xác nhận mật khẩu mới</div>
        <input onChange={(e) => setConfirm(e.target.value)} type="password" value={_confirm}></input>
      </div>
    </div>
    <div className="function">
      <Button colorScheme="red" onClick={() => onSubmit({ _new, _confirm })}>Xác nhận</Button>
    </div>
  </div>)
}