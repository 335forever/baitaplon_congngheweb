import icEdit from "../../assets/images/ic_edit.svg";
import icTrash from "../../assets/images/ic_trash.svg";

export default function Product({ id, image, name, price }) {
  return (
    <button>
      <div className="product">
        <div className="info">
          <img src={image} alt=""></img>
        </div>
        <div className="function">
          <button><img src={icEdit} alt="" /></button>
          <button><img src={icTrash} alt="" /></button>
        </div>
        <div className="name">
          <div>{name}</div>
          <div style={{ "fontSize": "14px", "fontWeight": "700" }}>{price.toLocaleString('vi-VN')} đ</div>
        </div>
      </div>
    </button>
  )
}