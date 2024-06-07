import { Progress } from "@chakra-ui/react"

export default function BestSeller({ image, name, price, quantity, sale }) {
  return (
    <div className="best-seller">
      <div style={{ "alignItems": "center", "display": "flex", "flex": "1 0 30%", "gap": "6px" }}>
        <img src={image}></img>
        <div>{name}</div>
      </div>
      <div style={{ "flex": "1 0 15%" }}>{price.toLocaleString('vi-VN')} đ</div>
      <div style={{ "flex": "1 0 10%" }}>{quantity}</div>
      <div style={{ "flex": "1 0 20%" }}>{(price * quantity - sale).toLocaleString('vi-VN')} VND</div>
      <Progress colorScheme="cyan" style={{ "flex": "1 0 20%" }} value={sale * 100 / (price * quantity)}></Progress>
      <div style={{ "flex": "1 0 3%", "marginLeft": "2%" }}>{sale * 100 / (price * quantity)}%</div>
    </div>
  )
}