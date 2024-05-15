import Spacer from "./Spacer";

export default function ProductCard({ name, price, discount, image }) {
    return (
        <div className="product-card">
            <div style={{ alignItems: "center", backgroundColor: "0xF5F5F5", display: "flex", flexDirection: "column", width: "100%" }}>
                {discount > 0 ? <div className="discount-tag">-{discount * 100}% Off</div> : <div />}
                <img src={image} style={{ marginBottom: "15%", marginTop: "15%", maxWidth: '65.92%' }} />
                <button style={{ width: "100%" }}>Thêm vào giỏ</button>
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
            </div>
        </div >
    )
}