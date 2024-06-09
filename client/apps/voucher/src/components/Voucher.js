import icCancel from "../../assets/images/ic_cancel.svg";
import icEdit from "../../assets/images/ic_edit.svg";
import icTrash from "../../assets/images/ic_trash.svg";
import icVerify from "../../assets/images/ic_verify.svg";

import React, { useState } from "react";

export default function Voucher({ editing = false, type, value, minOrder, maxDiscount, onDelete }) {
  const [_editing, setEditing] = React.useState(editing);

  const [_maxDiscount, setMaxDiscount] = React.useState(maxDiscount);
  const [_minOrder, setMinOrder] = React.useState(minOrder);
  const [_type, setType] = React.useState(type);
  const [_value, setValue] = React.useState(value);

  const verify = () => {
    setEditing(false);
  }

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  const [toDate, setToDate] = React.useState(yyyy + '-' + mm + '-' + dd);

  console.log(_type);

  return (<div className="voucher">
    <div className="info">
      <div style={{ "fontSize": "22px", "fontWeight": "700" }}>
        <input disabled={!editing} onChange={(e) => setValue(e.target.value)} type="number" style={{ "fontSize": "22px", "fontWeight": "700" }} value={editing ? _value : _value.toLocaleString('vi-VN')}></input>
        <select disabled={!editing} onChange={(e) => setType(e.target.value)} value={_type}>
          <option value={0}>%</option>
          <option value={1}>VND</option>
        </select>
      </div>
      <div>
        Đơn hàng từ <input disabled={!editing} onChange={(e) => setMinOrder(e.target.value)} type="number" value={editing ? _minOrder : _minOrder.toLocaleString('vi-VN')}></input>
        đ -
        Tối đa <input disabled={!editing} onChange={(e) => setMaxDiscount(e.target.value)} type="number" value={editing ? _maxDiscount : _maxDiscount.toLocaleString('vi-VN')}></input> đ
      </div>
      <div style={{ "display": "flex", "gap": "10px" }}>Ngày hết hạn
        <input disabled={!editing} type="date" className="range-date" max={today} onChange={(e) => setToDate(e.target.value)} value={toDate}></input>
      </div>
    </div>
    {editing ?
      <button className="function" onClick={verify}><img src={icVerify}></img></button> :
      <button className="function" onClick={() => setEditing(true)}><img src={icEdit}></img></button>
    }
    {editing ?
      <button className="function" onClick={(e) => setEditing(false)}><img src={icCancel}></img></button> :
      <button className="function" onClick={onDelete} ><img src={icTrash}></img></button>
    }
  </div>);
}