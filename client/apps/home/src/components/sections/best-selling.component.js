import Parcel from "single-spa-react/parcel"
import { Section, Product } from "@TachMonShop/styleguide";
import { useState } from "react";

import "./styles/best-selling.css"
export function BestSelling() {
    const [index, setIndex] = useState(0);

    function decrease() {
        setIndex(index - 1);
    }

    function increase() {
        setIndex(index + 1);
    }

    return (<Section title="Sản phẩm bán chạy" subtitle="Tháng này" controller={<button id="best-selling-btn">Xem tất cả</button>}>
        <div style={{display: 'flex', gap: '30px', margin: '40px 0px', overflow: 'scroll'}}>
            {Array(10).fill(<Parcel config={Product}></Parcel>)}
        </div>
    </Section>);
}