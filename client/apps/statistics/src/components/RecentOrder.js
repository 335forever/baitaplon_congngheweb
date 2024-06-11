import icAvatar from "../../assets/images/ic_avatar.png";
import icCancelled from "../../assets/images/ic_cancelled.svg";
import icDelivering from "../../assets/images/ic_delivering.svg";
import icDelivered from "../../assets/images/ic_delivered.svg";
import icProcessing from "../../assets/images/ic_processing.svg";
import { StatLabel } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { findUser } from "../../../../api/src/controllers/account.controller";

export default function RecentOrder({ orderID, accountID, total, status, orderDate }) {
  var statusBackground, statusForeground, statusIcon, statusLabel;
  switch (status) {
    case 1:
      statusBackground = "#FFE5EC";
      statusForeground = "#FF316A";
      statusIcon = icCancelled;
      statusLabel = "Đã hủy"
      break;
    case 0:
      statusBackground = "#FFF2DA";
      statusForeground = "#FFAA04";
      statusIcon = icProcessing;
      statusLabel = "Đang xử lý"
      break;
    case 2:
      statusBackground = "#CAFBEC";
      statusForeground = "#0DA678";
      statusIcon = icDelivered;
      statusLabel = "Đã giao"
      break;
    default:
      break;
  }

  const [user, setUser] = React.useState();
  const [diffTime, setDiffTime] = React.useState(0);

  async function getUser() {
    const res = await findUser({ accountId: accountID })
    setUser(res)
  }

  function getDiff() {
    const _orderDate = new Date(orderDate);
    const now = new Date();

    // Tính chênh lệch thời gian bằng milisecond
    const timeDifference = now - _orderDate;

    // Chuyển đổi chênh lệch thời gian từ milisecond sang giây, phút, giờ, ngày
    const hours = Math.ceil(minutes / 60);
    const days = Math.floor(hours / 24);

    setDiffTime(days * 24 + hours)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="order">
      <div style={{ "display": "flex", "flex": "1 0 50.6%", "gap": "6px" }}>
        <img src={icAvatar} alt=""></img>
        <div>
          <div style={{ "color": "#3B4758", "fontSize": "16px", "fontWeight": "700" }}>{user ? user.name : ''}</div>
          <div style={{ "color": "#586A84", "fontSize": "12px", "fontWeight": "300" }}>{diffTime / 24} ngày {diffTime % 24} giờ trước</div>
        </div>
      </div>
      <div style={{ "color": "#586A84", "flex": "1 0 29.26%", "fontWeight": "500" }}>{total.toLocaleString('vi-VN')} VND</div>
      <div className="order-status" style={{ "backgroundColor": statusBackground }}>
        <img src={statusIcon} style={{ "height": "50%" }}></img>
        <div style={{ "color": statusForeground, "fontSize": "12px" }}>{statusLabel}</div>
      </div>
    </div>
  )
}