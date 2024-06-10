import icEdit from "../../assets/images/ic_edit.svg";
import icTrash from "../../assets/images/ic_trash.svg";

export default function Product({ productID, images, name, price, onEdit, onDelete }) {
  return (
    <div className="product-in-manager">
      <div className="info">
        <img src={images.image1} alt=""></img>
      </div>
      <div className="function">
        <button onClick={onEdit}><img src={icEdit} alt="" /></button>

        <button onClick={onDelete}><img src={icTrash} alt="" /></button>
      </div>
      <div className="name">
        <div>{name}</div>
        <div style={{ "fontSize": "14px", "fontWeight": "700" }}>{price.toLocaleString('vi-VN')} đ</div>
      </div>
    </div>
  )
}