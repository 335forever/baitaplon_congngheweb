import icAvatar from "../../assets/images/ic_avatar.png";
import icCancelled from "../../assets/images/ic_cancelled.svg";
import icDelivering from "../../assets/images/ic_delivering.svg";
import icDelivered from "../../assets/images/ic_delivered.svg";
import icProcessing from "../../assets/images/ic_processing.svg";
import { StatLabel } from "@chakra-ui/react";

export default function RecentOrder({ avatar, name, time, receipt, status }) {
  var statusBackground, statusForeground, statusIcon, statusLabel;
  switch (status) {
    case 0:
      statusBackground = "#FFE5EC";
      statusForeground = "#FF316A";
      statusIcon = icCancelled;
      statusLabel = "Đã hủy"
      break;
    case 1:
      statusBackground = "#FFF2DA";
      statusForeground = "#FFAA04";
      statusIcon = icProcessing;
      statusLabel = "Đang xử lý"
      break;
    case 2:
      statusBackground = "#CAF6F9";
      statusForeground = "#129199";
      statusIcon = icDelivering;
      statusLabel = "Đang giao"
      break;
    case 3:
      statusBackground = "#CAFBEC";
      statusForeground = "#0DA678";
      statusIcon = icDelivered;
      statusLabel = "Đã giao"
      break;
    default:
      break;
  }

  return (
    <div className="order">
      <div style={{ "display": "flex", "flex": "1 0 50.6%", "gap": "6px" }}>
        <img src={icAvatar} alt=""></img>
        <div>
          <div style={{ "color": "#3B4758", "fontSize": "16px", "fontWeight": "700" }}>{name}</div>
          <div style={{ "color": "#586A84", "fontSize": "12px", "fontWeight": "300" }}>4 minutes ago</div>
        </div>
      </div>
      <div style={{ "color": "#586A84", "flex": "1 0 29.26%", "fontWeight": "500" }}>{receipt.toLocaleString('vi-VN')} VND</div>
      <div className="order-status" style={{ "backgroundColor": statusBackground }}>
        <img src={statusIcon} style={{ "height": "50%" }}></img>
        <div style={{ "color": statusForeground, "fontSize": "12px" }}>{statusLabel}</div>
      </div>
    </div>
  )
}