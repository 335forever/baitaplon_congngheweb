import React from "react"

export default function Summarize({ label, total, unit, percent, icon, iconColor }) {
  return (
    <div className="summarize">
      <div>
        <div className="summarize-label">{label}</div>
        <div className="summarize-total">{total.toLocaleString('vi-VN')} {unit}</div>
        <div style={{ "display": "flex", "gap": "6px" }}>
          <div style={{ "color": percent > 0 ? "#0a7d5a" : "#db4444" }}>{percent > 0 ? "+" : "-"}{Math.abs(percent)}% </div>
          <div>so với tháng trước</div>
        </div>
      </div>
      <div className="summarize-icon" style={{ "backgroundColor": iconColor }}>
        <img src={icon} alt=""></img>
      </div>
    </div >
  )
}