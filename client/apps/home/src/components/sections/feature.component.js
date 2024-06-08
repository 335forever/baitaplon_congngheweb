import { useState } from "react";
import { useQuery } from "react-query";

import { Section, Product } from "@TachMonShop/styleguide";
import { findProduct } from "@TachMonShop/api";
import Parcel from "single-spa-react/parcel"

import "./styles/feature.css"

async function fetchData() {
    return await findProduct({name: 'S'});
}
export function Feature() {
    const [index, setIndex] = useState(0);
    const {data, error, isLoading} = useQuery("flash-sale", fetchData);

    function decrease() {
        setIndex(index - 1);
    }

    function increase() {
        setIndex(index + 1);
    }

    function FlashContent(data, error, isLoading) {
        console.log(data, error, isLoading); 
        if (isLoading) return "Đang tải";
        if (error) return "Vui lòng thử lại sau";
        return data.map(e => <Parcel config={Product} product={e}></Parcel>);
    }

    return (<Section title="Đáng chú ý" subtitle="Sắp tới">
        <div style={{display: 'flex', gap: '30px', margin: '40px 0px', overflow: 'scroll'}}>
            {FlashContent(data, error,isLoading)}
        </div>
        <div className="view-more-btn">
            <button>Xem tất cả</button>
        </div>
    </Section>);
}
