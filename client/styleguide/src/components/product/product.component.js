import singleSpaReact from "single-spa-react";
import  {navigateToUrl} from "single-spa";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Icons } from "../../TachMonShop-icons";
import "./product.css";

function _Product(props) {
  const [test, setTest] = useState(false);
  return (
    <div className="product">
      <div className="product-content">
        <div className="product-img-container">
          <img className="product-img" src="https://www.tncstore.vn/media/product/250-9016-may-choi-game-sony-playstation-5-standard-edition-nhap-khau-japan-2.jpg" />
          <button className="add-to-cart-btn">Thêm vào giỏ</button>
        </div>
        <div className="product-info">
        <a onClick={() => {navigateToUrl('/shop-cua-hang-nao-do/product-do-nao-do')}}>Gaming Console</a>
        <div className="product-price">
          <cite>12.000.000đ</cite>
          <em>15.000.000đ</em>
        </div>
        <div className="product-rating">
          <div></div>
          <p className="product-rating-count">(88)</p>
        </div>
        </div>
      </div>
      <div className="product-discount"><p>-40%</p></div>
      <div className="product-function">
          <button>
            <img src={Icons.heartSmall} />
          </button>
          <button>
            <img src={Icons.visibility} />
          </button>
      </div>
    </div>
  );
}

export const Product = singleSpaReact({
  renderType: "createRoot",
  React,
  ReactDOM,
  rootComponent: _Product,
});
