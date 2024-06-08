import { Icons } from "@TachMonShop/styleguide";
import "./styles/warranty.css";

export function Warranty() {
  return (
    <section id="warranty">
      <div className="part-of-warranty">
        <div className="icon-container">
          <img src={Icons.delivery} />
        </div>
        <h6>GIAO HÀNG NHANH, MIỄN PHÍ</h6>
        <p>Giao hàng miễn phí cho những đơn hàng dưới 500.000đ</p>
      </div>
      <div className="part-of-warranty">
        <div className="icon-container">
          <img src={Icons.customerService} />
        </div>
        <h6>HỖ TRỢ 24/7</h6>
        <p>Hỗ trợ nhiệt tình, mọi lúc, mọi nơi</p>
      </div>
      <div className="part-of-warranty">
        <div className="icon-container">
          <img src={Icons.secure} />
        </div>
        <h6>ĐẢM BẢO HOÀN TIỀN</h6>
        <p>Hệ thống hoàn tiến trong 30 ngày</p>
      </div>
    </section>
  );
}
