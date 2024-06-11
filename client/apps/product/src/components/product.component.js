import { useLayoutEffect, useState } from "react";
import { clsx } from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

import { NavRoute } from "@TachMonShop/styleguide";
import { Section, Product, Icons } from "@TachMonShop/styleguide";

import Parcel from "single-spa-react/parcel";
import { navigateToUrl } from "single-spa";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../controllers/product.slice";

import { findProduct, addProductToCart, findShopInfo } from "@TachMonShop/api";

import "../root.css";
import { useQuery } from "react-query";
async function getProduct() {
  const [_, shopId, productId] = window.location.pathname.match(
    /shop-([0-9]+)\/product-([0-9]+)/
  );
  const result = {
    product: await findProduct({
      productId,
    }), shopId,
    shop: await findShopInfo({
      shopId
    })
  };
  document.title = `TachMonShop | ${result.product.name}`;
  return result;
}
export function ProductPage() {
  const { data, error, isLoading } = useQuery(["product"], getProduct);
  const [isDescriptionExtended, setIsDescriptionExtended] = useState(false);
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();

  const productState = useSelector((state) => {
    return state.product;
  });

  function handleColorChange({ target }) {
    dispatch(productActions.setColor(target.getAttribute("value")));
  }

  function handleSizeChange({ target }) {
    dispatch(productActions.setSize(target.getAttribute("value")));
  }

  function handleCountChange({ target }) {
    const count = Math.min(product.quantity, target.value)
    dispatch(productActions.setCount(count));
  }

  function handleWishlistChange() {
    dispatch(productActions.toggleWishlist());
  }

  async function addToCart() {
    try {
      await addProductToCart({ productId: product.productID, quantity: productState.count });
      navigateToUrl('/cart');
    }
    catch (err) {
      if (err.response.status === 401) navigateToUrl(`/signin?redirect=${encodeURIComponent(window.location.href)}`)
    }
  }

  useLayoutEffect(() => {
    dispatch(productActions.setCount(1));
  }, []);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % 6);
    }, 7000);
    return () => {
      clearInterval(interval);
    }
  }, [index]);

  if (isLoading) return <article>Đang tải</article>;
  if (error) return <article>Vui lòng tải lại</article>;
  let { product, shop } = data;
  let images = Array.from(Object.values(product.images));
  images.push(...images);
  return (
    <article className="flex flex-col gap-10 my-10">
      <Parcel
        config={NavRoute}
        names={["Trang chủ", shop.name, product.name]}
      />
      <section id="product-main-content">
        {images.slice(index + 1, index + 5).map((src) => (
          <div key={src} className="product-image-gallery-container">
            <img src={src} />
          </div>
        ))}
        <div id="product-big-image">
          <img src={images[index]} />
        </div>
        <div id="product-details">
          <h1>{product.name}</h1>
          <div id="product-status">
            <div></div>
            <p id="product-review-count">{`(${product.reviewCount ?? "Không có"} đánh giá)`}</p>
            <p>|</p>
            <p
              style={{
                color: product.quantity > 0 ? "lime" : "var(--color-danger)",
              }}
            >
              {product.quantity > 0 ? "Còn hàng" : "Đã hết hàng"}
            </p>
          </div>
          <em>{Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(product.price)}</em>
          {product.description ? <div id="product-description">
            {!isDescriptionExtended
              ? product.description.slice(0, 150) + `${product.description.length <= 150 ? '' : '...'}`
              : product.description}
            {product.description.length > 150 && <span
              onClick={() => setIsDescriptionExtended(!isDescriptionExtended)}
            >
              {isDescriptionExtended ? " Xem bớt" : " Xem thêm"}
            </span>}
          </div> : <p>Không có mô tả</p>}
          <hr />
          {product.colors && <div className="flex items-center gap-1 p-bottom-2">
            Colors:
            <div className="flex gap-1">
              {product.colors.length > 1 &&
                product.colors.map((color) => (
                  <div
                    className={clsx(
                      "h-4 w-4 color-picker",
                      productState.color === color && "color-picker-chosen"
                    )}
                    style={{ backgroundColor: color }}
                    value={color}
                    onClick={handleColorChange}
                  ></div>
                ))}
            </div>
          </div>}
          {product.sizes && <div className="flex items-center gap-1 py-2">
            Size:
            <div className="flex gap-2">
              {product.sizes.length > 1 &&
                product.sizes.map((size) => (
                  <div
                    className={clsx(
                      "size-picker",
                      productState.size === size && "size-picker-chosen"
                    )}
                    value={size}
                    onClick={handleSizeChange}
                  >
                    {size}
                  </div>
                ))}
            </div>
          </div>}
          <div className="flex py-2 gap-4">
            <div id="product-count" className="flex">
              <button onClick={() => dispatch(productActions.decreaseCount())}>
                −
              </button>
              <input
                type="number"
                value={productState.count}
                onChange={(e) => {
                  handleCountChange(e);
                }}
              />
              <button onClick={() => { if (productState.count < product.quantity) dispatch(productActions.increaseCount()) }}>
                +
              </button>
            </div>
            <button
              className={clsx("btn", productState.count == 0 && "btn-disabled")}
              disabled={productState.product == 0}
              onClick={addToCart}
            >
              Thêm vào giỏ
            </button>
            <button className="white-btn" onClick={handleWishlistChange}>
              <FontAwesomeIcon
                icon={productState.isInWishlist ? faSolidHeart : faHeart}
                className={clsx(productState.isInWishlist && "love-it")}
              />
            </button>
          </div>
          <div id="product-services">
            <div className="flex">
              <img src={Icons.delivery} />
              <div>
                <h6>Giao hàng miễn phí</h6>
                <p>Nhập code ngay hôm nay tại đây</p>
              </div>
            </div>
            <hr />
            <div className="flex">
              <img src={Icons.returnIcon} />
              <div>
                <h6>Hoàn trả</h6>
                <span>Chấp nhận hoàn trả miễn phí trong 30 ngày. </span>
                <a>Chi tiết</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Section subtitle="Sản phẩm liên quan">
        <div className="flex gap-4" style={{ overflow: "scroll" }}>
          {Array(10).fill(<Parcel config={Product}></Parcel>)}
        </div>
      </Section> */}
      {/* <Section subtitle="Đánh giá">
        <textarea style={{ width: "100%" }}></textarea>
      </Section> */}
    </article>
  );
}
