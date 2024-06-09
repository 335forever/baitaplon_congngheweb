import singleSpaReact from "single-spa-react";
import { navigateToUrl } from "single-spa";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Icons } from "../../TachMonShop-icons";
import "./product.css";
import { isSignedIn, addProductToCart } from "@TachMonShop/api";

function _Product({product}) {
  function handleNavigate() {
    navigateToUrl(`/shop-${product.shoperID}/product-${product.productID}`);
  }

  async function addToCart() {
    if (!isSignedIn()) navigateToUrl('/signIn');
    else {
      await addProductToCart({
        productId: product.productID,
        quantity: 1
      })
    }
  }
  return (
    <div className="product">
      <div className="product-content">
        <div className="product-img-container">
          <img
            className="product-img"
            src={product.images.image1}
          />
          <button className="add-to-cart-btn" onClick={addToCart}>Thêm vào giỏ</button>
        </div>
        <div className="product-info">
          <a onClick={handleNavigate}>{`${product.name.slice(0, 50)}${product.name.length > 50 ? '...': ''}`}</a>
          <div className="product-price">
            <cite>{Intl.NumberFormat('vi', {style: 'currency', currency: 'VND'}).format(product.price)}</cite>
            {product.lastPrice && <em>{product.lastPrice}đ</em>}
          </div>
          <div className="product-rating">
            <div></div>
            <p className="product-rating-count">{`(${product.quantity})`}</p>
          </div>
        </div>
      </div>
      {product.lastPrice > product.price && <div className="product-discount">
        <p>{100*(1-product.price/product.lastPrice)}%</p>
      </div>}
      <div className="product-function">
        <button>
          <img src={Icons.heartSmall} />
        </button>
        <button onClick={handleNavigate}>
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
