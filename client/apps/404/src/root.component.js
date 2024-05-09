import { NavRoute } from "@TachMonShop/styleguide";
import { Link, BrowserRouter} from "react-router-dom";
import Parcel from "single-spa-react/parcel";
import "./root.css";

export default function Root(props) {
  return (
    <BrowserRouter>
      <article id="page-404">
        <Parcel config={NavRoute} names={["Trang chủ", "Lỗi 404"]} />
        <section>
          <div id="text-404">404 Không tìm thấy trang</div>
          <div>
            Trang bạn ghé thăm đã tiến vào đại hải trình tìm kho báu TML, vui
            lòng trở về trang chủ
          </div>
          <Link to="/">Trở về trang chủ</Link>
        </section>
      </article>
    </BrowserRouter>
  );
}
