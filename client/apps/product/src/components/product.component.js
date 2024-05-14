import { useLayoutEffect, useState } from "react";
import { clsx } from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

import { NavRoute } from "@TachMonShop/styleguide";
import { Section, Product, Icons } from "@TachMonShop/styleguide";

import Parcel from "single-spa-react/parcel";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../controllers/poduct.slice";

import "../root.css";

export function ProductPage({ product }) {
  const [isDescriptionExtended, setIsDescriptionExtended] = useState(false);

  const dispatch = useDispatch();

  const productState = useSelector((state) => {
    return state.product;
  });

  function handleColorChange({ target }) {
    console.log(target.value);
    dispatch(productActions.setColor(target.getAttribute("value")));
  }

  function handleSizeChange({ target }) {
    console.log(target.value);
    dispatch(productActions.setSize(target.getAttribute("value")));
  }

  function handleCountChange({ target }) {
    dispatch(productActions.setCount(target.value));
  }

  function handleWishlistChange() {
    dispatch(productActions.toggleWishlist());
  }

  useLayoutEffect(() => {
    dispatch(productActions.setCount(1));
  }, []);

  return (
    <article className="flex flex-col gap-10 my-10">
      <Parcel
        config={NavRoute}
        names={["Trang chủ", "Tên Shop", product.name]}
      />
      <section id="product-main-content">
        {product.images.slice(1).map((src) => (
          <div className="product-image-gallery-container">
            <img src={src} />
          </div>
        ))}
        <div id="product-big-image">
          <img src={product.images[0]} />
        </div>
        <div id="product-details">
          <h1>{product.name}</h1>
          <div id="product-status">
            <div></div>
            <p id="product-review-count">{`(${product.reviewCount} đánh giá)`}</p>
            <p>|</p>
            <p style={{color: product.isInStock ? "lime" : "var(--color-danger)"}}>{product.isInStock ? "Còn hàng" : "Đã hết hàng"}</p>
          </div>
          <em>14.000.000đ</em>
          <div id="product-description">
            {!isDescriptionExtended
              ? product.description.slice(0, 150) + "..."
              : product.description}
            <span
              onClick={() => setIsDescriptionExtended(!isDescriptionExtended)}
            >
              {isDescriptionExtended ? " Xem bớt" : " Xem thêm"}
            </span>
          </div>
          <hr />
          <div className="flex items-center gap-1 p-bottom-2">
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
          </div>
          <div className="flex items-center gap-1 py-2">
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
          </div>
          <div className="flex py-2 gap-4">
            <div id="product-count" className="flex">
              <button onClick={() => dispatch(productActions.decreaseCount())}>
                −
              </button>
              <input type="number" value={productState.count} onChange={handleCountChange} />
              <button onClick={() => dispatch(productActions.increaseCount())}>
                +
              </button>
            </div>
            <button className={clsx("btn", productState.count == 0 && "btn-disabled")} disabled={productState.product == 0}>Mua ngay</button>
            <button className="white-btn" onClick={handleWishlistChange}>
              <FontAwesomeIcon
                icon={productState.isInWishlist ? faSolidHeart : faHeart}
                className={clsx(productState.isInWishlist && "love-it")}
              />
            </button>
          </div>
          <div id="product-services">
            <div className="flex">
              <img src={Icons.delivery}/>
              <div>
                <h6>Giao hàng miễn phí</h6>
                <p>Nhập code ngay hôm nay tại đây</p>
              </div>
            </div>
            <hr />
            <div className="flex">
              <img src={Icons.returnIcon}/>
              <div>
                <h6>Hoàn trả</h6>
                <span>Chấp nhận hoàn trả miễn phí trong 30 ngày. </span>
                <a>Chi tiết</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section subtitle="Sản phẩm liên quan">
        <div className="flex gap-4" style={{ overflow: "scroll" }}>
          {Array(10).fill(<Parcel config={Product}></Parcel>)}
        </div>
      </Section>
      <Section subtitle="Đánh giá">
        <textarea style={{ width: "100%" }}></textarea>
      </Section>
    </article>
  );
}
