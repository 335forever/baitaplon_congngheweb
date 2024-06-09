import { createVoucher } from "../../../../api/src/TachMonShop-api";
import icCancel from "../../assets/images/ic_cancel.svg";
import icEdit from "../../assets/images/ic_edit.svg";
import icTrash from "../../assets/images/ic_trash.svg";
import icVerify from "../../assets/images/ic_verify.svg";

import React, { useState } from "react";

export default function Voucher({ voucherID, discountPercent, expired, minprice, maxdiscount, quantity, onCreate, onDelete, onUpdate }) {
  const [_editing, setEditing] = React.useState(false);

  const [_maxDiscount, setMaxDiscount] = React.useState(maxdiscount);
  const [_minOrder, setMinOrder] = React.useState(minprice);
  const [_number, setNumber] = React.useState(quantity);
  const [_value, setValue] = React.useState(discountPercent);
  const [toDate, setToDate] = React.useState(expired.split("T")[0]);

  const verify = async () => {
    if (voucherID == null) {

      setEditing(false);

      onCreate({
        discountPercent: _value,
        expired: `${toDate}T23:59:59`,
        minprice: _minOrder,
        maxdiscount: _maxDiscount,
        quantity: _number
      });
    } else {
      setEditing(false);

      onUpdate({
        voucherID: voucherID,
        discountPercent: _value,
        expired: `${toDate}T23:59:59`,
        minprice: _minOrder,
        maxdiscount: _maxDiscount,
        quantity: _number
      });
    }
  }

  const delVoucher = async () => {
    onDelete(voucherID);
  };

  return (<div className="voucher">
    <div className="info">
      <div style={{ "fontSize": "22px", "fontWeight": "700" }}>
        <input disabled={!_editing} onChange={(e) => setValue(parseInt(e.target.value))} type="number" style={{ "fontSize": "22px", "fontWeight": "700" }} value={_editing ? _value : _value.toLocaleString('vi-VN')}></input>
        %
      </div>
      <div>
        Đơn hàng từ <input disabled={!_editing} onChange={(e) => setMinOrder(parseInt(e.target.value))} type="number" value={_editing ? _minOrder : _minOrder.toLocaleString('vi-VN')}></input>
        đ -
        Tối đa <input disabled={!_editing} onChange={(e) => setMaxDiscount(parseInt(e.target.value))} type="number" value={_editing ? _maxDiscount : _maxDiscount.toLocaleString('vi-VN')}></input> đ
      </div>
      <div style={{ "display": "flex", "gap": "10px" }}>Ngày hết hạn
        <input disabled={!_editing} type="date" className="range-date" onChange={(e) => setToDate(e.target.value)} value={toDate}></input>
      </div>
    </div>
    <div style={{ "alignContent": "center" }}>
      Số lượng:
      <input disabled={!_editing} onChange={(e) => setNumber(parseInt(e.target.value))} type="number" value={_number}></input>
    </div>
    {_editing ?
      <button className="function" onClick={verify}><img src={icVerify}></img></button> :
      <button className="function" onClick={() => setEditing(true)}><img src={icEdit}></img></button>
    }
    {_editing ?
      <button className="function" onClick={(e) => setEditing(false)}><img src={icCancel}></img></button> :
      <button className="function" onClick={delVoucher} ><img src={icTrash}></img></button>
    }
  </div>);
}