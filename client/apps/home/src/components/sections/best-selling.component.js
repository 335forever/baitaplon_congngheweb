import Parcel from "single-spa-react/parcel"
import { Section, Product } from "@TachMonShop/styleguide";
import { useState } from "react";
import { useQuery } from "react-query";
import { findProduct } from "@TachMonShop/api";

import "./styles/best-selling.css"
async function fetchData() {
    return await findProduct({name: 'b'});
}
export function BestSelling() {
    const [index, setIndex] = useState(0);
    const {data, error, isLoading} = useQuery("best-selling", fetchData);

    function decrease() {
        setIndex(index - 1);
    }

    function increase() {
        setIndex(index + 1);
    }

    function BestSellingContent(data, error, isLoading) {
        console.log(data, error, isLoading); 
        if (isLoading) return "Đang tải";
        if (error) return "Vui lòng thử lại sau";
        return data.map(e => <Parcel config={Product} product={e}></Parcel>);
    }

    return (<Section title="Sản phẩm bán chạy" subtitle="Tháng này" controller={<button id="best-selling-btn">Xem tất cả</button>}>
        <div style={{display: 'flex', gap: '30px', margin: '40px 0px', overflow: 'scroll'}}>
            {BestSellingContent(data, error,isLoading)}
        </div>
        <div className="view-more-btn">
            <button>Xem tất cả</button>
        </div>
    </Section>);

}