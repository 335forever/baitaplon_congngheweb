import "./index.css";

import React, { useEffect, useState } from "react";
import Product from "./components/Product";

import icAdd from "../assets/images/ic_add.svg";
import icClose from "../assets/images/ic_close.svg";
import DropdownGrid from "./components/DropdownGrid";
import { getCategories, findProduct, removeProduct, updateProduct } from "@TachMonShop/api";
import { getShopInfo } from "@TachMonShop/api";
import ProductDetail from "./components/ProductDetail";
import ProductDetailAdd from "./components/ProductDetailAdd";

export default function ManageProducts(props) {
  const [category, setCategory] = React.useState([]);
  const [cateSelected, setCateSelected] = React.useState();
  const [isAdding, setIsAdding] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState()
  const [isShowing, setIsShowing] = React.useState(false);
  const [Products, setProducts] = React.useState([]);
  const [shop, setShop] = React.useState();
  const [productToView, setProductToView] = React.useState();

  async function getAllCategories() {
    const response = await getCategories();
    setCategory(response);
  }

  async function getProducts({ shopId, categoryId }) {
    const response = await findProduct({ shopId, categoryId });
    setProducts(response)
  }

  async function getShop() {
    const response = await getShopInfo();
    setShop(response)

    getProducts({ shopId: response.shoperID });
  }

  const addProduct = (product) => {
    addProduct(product, () => { },
      (res) => {
        setIsAdding(false);
        getProducts({ shopId: shop.shoperID })
      })
  }

  const editProduct = (product) => {
    updateProduct(product,
      () => {
        // Toast error
      },
      () => {
        setIsShowing(false)
        getProducts({ shopId: shop.shoperID })
      })
  }

  const deleteProduct = () => {
    removeProduct(isDeleting,
      () => {
        /* toast error*/
      },
      () => {
        setIsDeleting(null);
        getProducts({ shopId: shop.shoperID });
      }
    )
  }

  useEffect(() => {
    // getAllCategories();
    // getShop();
  }, [])

  return (
    <div>
      <div id="wrapper">
        <div id="filter">
          <div className="classify">
            <div>Sắp xếp theo</div>
            <select style={{ "fontFamily": "Inter" }}>
              <option value="Tên">Tên</option>
              <option value="Ngày tạo">Ngày tạo</option>
              <option value="Giá">Giá</option>
            </select>
          </div>
          <div className="classify">
            <div>Danh mục</div>
            <DropdownGrid categories={category} onChange={(e) => setCateSelected(e)}></DropdownGrid>
          </div>
        </div>
        <div id="list">
          <button onClick={() => setIsAdding(true)} style={{ "backgroundColor": "#f5f5f5", "borderRadius": "8px" }}><img src={icAdd} alt="" /></button>
          {Products.filter(product => (cateSelected == null || product.categoryID == cateSelected)).map(
            (e) => <Product key={e.productID} {...e}
              onDelete={() => setIsDeleting(e.productID)}
              onEdit={() => { setIsShowing(true); setProductToView(e); }}>
            </Product>)}
        </div>
      </div>
      <div className="modal" style={{ "display": isAdding ? isAdding : 'none' }}>
        <div className="panel">
          <button id="close" onClick={() => { setIsAdding(false) }}><img src={icClose}></img></button>
          <ProductDetailAdd category={category} onCancel={() => setIsAdding(false)} onUpdate={(product) => addProduct(product)}></ProductDetailAdd>
        </div>
      </div>
      <div className="modal" style={{ "display": isShowing ? isShowing : 'none' }}>
        <div className="panel">
          <button id="close" onClick={() => { setIsShowing(false) }}><img src={icClose}></img></button>
          <ProductDetail {...productToView} category={category} onCancel={() => setIsShowing(false)} onUpdate={(product) => editProduct(product)}></ProductDetail>
        </div>
      </div>
      <div className="modal" style={{ "display": isDeleting != null ? true : 'none' }}>
        <div className="panel">
          <div className="row" style={{ "justifyContent": "center", "marginBottom": "40px" }}>Bạn muốn xóa sản phẩm này chứ?</div>
          <div className="row" style={{ "justifyContent": "center", "gap": "32px" }}>
            <button className="del-button" onClick={() => setIsDeleting(null)} style={{ "border": "1px solid rgba(0,0,0,0.5" }}>Hủy</button>
            <button className="del-button" onClick={deleteProduct} style={{ "backgroundColor": "#db4444", "color": "white" }}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
