import icAdd from "../../assets/images/ic_add.svg";
import icEdit from "../../assets/images/ic_edit.svg";
import icMinus from "../../assets/images/ic_minus.svg";
import icPlus from "../../assets/images/ic_plus.svg";
import React, { useEffect, useState } from "react";
import DropdownGrid from "./DropdownGrid";
import { uploadImages } from "@TachMonShop/api";

export default function ProductDetailAdd({ category, onCancel, onUpdate }) {
  const [imagePaths, setImagePaths] = React.useState([]);
  const [_description, setDescription] = React.useState('New description')
  const [_images, setImages] = React.useState([null, null, null, null, null]);
  const [_name, setName] = React.useState('New Product');
  const [_price, setPrice] = React.useState(0);
  const [_quantity, setQuantity] = React.useState(1);
  const [_categoryId, setCategoryId] = React.useState(1);

  function handleFiles(event, idx) {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      var tmp = [...imagePaths];
      tmp[idx] = fileUrl;
      setImagePaths(tmp);

      _images[idx] = file
      setImages(_images);
    }
  }

  function verify() {
    var imageList = [];

    const formData = new FormData();
    _images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });


    uploadImages(formData, () => { },
      (res) => {
        imageList = Object.values(res.data.images)

        const imagesObject = imageList.reduce((obj, url, index) => {
          const key = `image${index + 1}`; // Tạo key dựa trên index của mảng
          obj[key] = url; // Gán URL vào key tương ứng
          console.log(imageList)
          return obj;
        }, {});

        onUpdate({
          name: _name,
          description: _description,
          quantity: _quantity,
          price: _price,
          categoryId: _categoryId,
          images: imagesObject
        })
      })

  }

  return (<div className="product-detail">
    <div className="images">
      <div className="image-upload">
        <label htmlFor="file-input">
          <img key={imagePaths[1]} src={imagePaths[1] == null ? icAdd : imagePaths[1]} alt="Chọn ảnh" />
        </label>
        <input id="file-input" type="file" onChange={(e) => handleFiles(e, 1)} />
      </div>
      <div className="image-upload">
        <label htmlFor="file-input">
          <img key={imagePaths[2]} src={imagePaths[2] == null ? icAdd : imagePaths[2]} alt="Chọn ảnh" />
        </label>
        <input id="file-input" type="file" onChange={(e) => handleFiles(e, 2)} />
      </div>
      <div className="image-upload">
        <label htmlFor="file-input">
          <img key={imagePaths[3]} src={imagePaths[3] == null ? icAdd : imagePaths[3]} alt="Chọn ảnh" />
        </label>
        <input id="file-input" type="file" onChange={(e) => handleFiles(e, 3)} />
      </div>

      <div className="image-upload">
        <label htmlFor="file-input">
          <img key={imagePaths[4]} src={imagePaths[4] == null ? icAdd : imagePaths[4]} alt="Chọn ảnh" />
        </label>
        <input id="file-input" type="file" onChange={(e) => handleFiles(e, 4)} />
      </div>
    </div>
    <div className="main-image" style={{ "width": "40%" }}>
      <div className="image-upload">
        <label htmlFor="file-input">
          <img key={imagePaths[0]} src={imagePaths[0] == null ? icAdd : imagePaths[0]} alt="Chọn ảnh" />
        </label>
        <input id="file-input" type="file" onChange={(e) => handleFiles(e, 0)} />
      </div>
    </div>
    <div className="detail" style={{ "width": "30%" }}>
      <div className="row">
        <input onChange={(e) => setName(e.target.value)} style={{ "fontFamily": "Inter", "fontSize": "24px", "fontWeight": "700" }} value={_name}></input>
        <img src={icEdit} />
      </div>
      <div className="row">
        <input onChange={(e) => setPrice(parseInt(e.target.value))} style={{ "fontSize": "24px", "textAlign": "center", "width": "50%" }} type="number" value={_price}></input>
        <div> VND</div>
        <div style={{ "flexGrow": "10" }}><img src={icEdit} /></div>
      </div>
      <div className="row" style={{ "fontSize": "16px" }}>Mô tả</div>
      <div className="row" style={{ "borderBottom": "1px solid rgba(0,0,0,0.5)", "marginBottom": "16px" }}>
        <textarea onChange={(e) => setDescription(e.target.value)} rows={15} value={_description}></textarea>
        <img src={icEdit} />
      </div>
      <div className="row" style={{ "height": "44px", "gap": "0px" }}>
        <button id="minus" onClick={() => setQuantity(_quantity - 1)}><img src={icMinus} alt="" /></button>
        <input id="quantity" onChange={(e) => setQuantity(parseInt(e.target.value))} type="number" value={_quantity}></input>
        <button id="plus" onClick={() => setQuantity(_quantity + 1)}><img src={icPlus} alt="" /></button>
        <div style={{ "width": "14px" }}></div>
      </div>
      <div className="row">
        <div className="classify">
          <div>Danh mục</div>
          <DropdownGrid categories={category} onChange={(e) => setCategoryId(e)}></DropdownGrid>
        </div>
      </div>
      <div className="row" style={{ "justifyContent": "center", "gap": "32px", "marginTop": "40px" }}>
        <button className="del-button" onClick={onCancel} style={{ "border": "1px solid rgba(0,0,0,0.5" }}>Hủy</button>
        <button className="del-button" style={{ "backgroundColor": "#db4444", "color": "white" }}
          onClick={verify}>
          Xác nhận
        </button>
      </div>
    </div>
  </div>)
}