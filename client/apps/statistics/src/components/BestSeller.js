import { Progress } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { findProduct } from "@TachMonShop/api";

export default function BestSeller({ productId, quantity, total }) {
  const [product, setProduct] = React.useState();

  async function getProduct() {
    const res = await findProduct({ productId });
    setProduct(res);
  }

  useEffect(() => {
    getProduct();
  }, [])

  return (
    <div className="best-seller">
      <div style={{ "alignItems": "center", "display": "flex", "flex": "1 0 30%", "gap": "6px" }}>
        <img src={product ? product.images.image1 : ''}></img>
        <div>{product ? product.name : ''}</div>
      </div>
      <div style={{ "flex": "1 0 15%" }}>{product && product.price.toLocaleString('vi-VN')} đ</div>
      <div style={{ "flex": "1 0 10%" }}>{quantity}</div>
      {product && <div style={{ "flex": "1 0 20%" }}>{total.toLocaleString('vi-VN')} VND</div>}
      <Progress colorScheme="cyan" style={{ "flex": "1 0 20%" }}
        value={product ? (1.0 - total / (product.price * quantity)) * 100 : 0}>
      </Progress>
      <div style={{ "flex": "1 0 3%", "marginLeft": "2%" }}>{product ? (1.0 - total / (product.price * quantity)) * 100 : 0}%</div>
    </div>
  )
}