import Spacer from "./Spacer";
import cart from "../../assets/images/ic_cart.svg";
import _delete from "../../assets/images/ic_delete.svg";
import StarRating from "./StarRating"
import view from "../../assets/images/ic_view.svg";

export default function ProductCard({ name, price, discount, image, rating, numOfRating, isNew }) {
    return (
        <div className="product-card">
            <div style={{ alignItems: "center", backgroundColor: "0xF5F5F5", display: "flex", flexDirection: "column", width: "100%" }}>
                {discount > 0 ? <div className="discount-tag">-{discount * 100}%</div> : isNew ? <div className="new-tag" style={{ backgroundColor: "#00FF66", color: "black" }}>NEW</div> : <div />}
                <img src={image} style={{ marginBottom: "15%", marginTop: "15%", maxWidth: '65.92%' }} />
                <button id="action" style={{ borderRadius: "100%" }}><img src={rating > 0 ? view : _delete} /></button>
                <button style={{ display: "flex", justifyContent: "center", width: "100%" }}><img src={cart} style={{ maxWidth: "24px" }} /><Spacer width={8} /> Thêm vào giỏ hàng</button>
            </div>
            <div style={{ backgroundColor: "white" }}>
                <Spacer height={16} />
                <h3>{name}</h3>
                <Spacer height={16} />
                <div style={{ display: "flex", fontSize: 16, fontWeight: 700 }}>
                    {discount > 0 ? <p style={{ color: "#db4444" }}>${price * (1 - discount)}</p> : <div />}
                    <Spacer width={discount > 0 ? 10 : 0} />
                    <p style={{ color: discount > 0 ? "#7d8184" : "#db4444", textDecoration: discount > 0 ? "line-through" : "" }}>${price}</p>
                </div>
                <Spacer height={rating >= 0 ? 16 : 0} />
                {rating >= 0 ? <div style={{ display: "flex" }}>
                    <StarRating rating={rating}></StarRating>
                    <Spacer width={10} />
                    <p>({numOfRating})</p>
                </div> : null}
            </div>
        </div >
    )
}