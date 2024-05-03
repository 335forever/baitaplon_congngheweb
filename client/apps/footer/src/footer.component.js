import { BrowserRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";
import googleBadge from "../assets/google-badge.png";
import appleBadge from "../assets/apple-badge.svg";
import qr from "../assets/qr.png";

export default function Footer(props) {
  return (
    <div id="footer" className="flex flex-col w-full bg-black items-center py-2">
      <div className="max-w-5xl">
        <div id="content" className="flex flex-row py-12 gap-4">
          <BrowserRouter>
            <div className="flex flex-col grow gap-1">
              <div className="flex flex-col gap-2.5">
                <h1>TachMonShop</h1>
                <h2>Đăng ký</h2>
                <p>Giảm 10% cho đơn đầu tiên</p>
              </div>
              <div className="input-box flex flex-row">
                <input type="text" placeholder="Nhập email"></input>
                <button>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
            <div className="flex flex-col grow gap-2.5">
              <h2>Hỗ trợ</h2>
              <div className="flex flex-col gap-1">
                <p>100 Đại Cồ Việt, Hai Bà Trưng</p>
                <p>Hà Nội, Việt Nam.</p>
                <p>hotro@tachmonshop.com</p>
                <p>(+84) 012 345 6789</p>
              </div>
            </div>
            <div className="flex flex-col grow gap-2.5">
              <h2>Tài khoản</h2>
              <div className="flex flex-col gap-1"><Link to="/account">Tài khoản của tôi</Link>
              <Link to="/signin">Đăng nhập/Đăng ký</Link>
              <Link to="/cart">Giỏ hàng</Link>
              <Link to="/wishlist">Quan tâm</Link>
              <Link to="/shop">Cửa hàng</Link></div>
            </div>
            <div className="flex flex-col grow gap-2.5">
              <h2>Lối tắt</h2>
              <div className="flex flex-col gap-1"><Link to="/privacy">Điều khoản dịch vụ</Link>
              <Link to="/terms">Chính sách</Link>
              <Link to="/faq">Câu hỏi thường gặp</Link>
              <Link to="/contact">Liên hệ</Link>
              </div></div>
            <div className="flex flex-col grow gap-2.5">
              <h2>Tải ứng dụng</h2>
              <div className="flex flex-col gap-1"><em>Tiết kiệm 100.000đ cho người mới</em>
              <div className="flex flex-row h-20 flex-nowrap gap-1">
                <div className="h-auto min-w-max">
                  <img
                    className="block w-full h-full object-contain"
                    src={qr}
                  />
                </div>
                <div className="flex flex-col h-auto ">
                  <div className="h-1/2 grow">
                  <Link to="/404">
                    <img
                      className="block w-full h-full object-contain"
                      src={googleBadge}
                    />
                    </Link>
                  </div>
                  <div className="grow min-w-max">
                    <Link to="/404">
                    <img src={appleBadge} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <Link to="/404">
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <Link to="/404">
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link to="/404">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link to="/404">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
              </div>
            </div></div>
          </BrowserRouter>
        </div>
        <p className="inter-light" id="credit">
          &copy;Copyright Rimel 2022. All right reserved
        </p>
      </div>
    </div>
  );
}
