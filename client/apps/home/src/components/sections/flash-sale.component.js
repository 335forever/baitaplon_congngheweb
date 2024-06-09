import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Section, Product } from "@TachMonShop/styleguide";
import { findProduct } from "@TachMonShop/api";
import Parcel from "single-spa-react/parcel"

import "./styles/flash-sale.css";

async function fetchData() {
    return await findProduct({name: 'a'});
}
export function FlashSale() {

    const [index, setIndex] = useState(0);
    const {data, error, isLoading} = useQuery("flash-sale", fetchData);

    function decrease() {
        setIndex(index - 1);
    }

    function increase() {
        setIndex(index + 1);
    }

    function FlashContent(data, error, isLoading) {
        if (isLoading) return "Đang tải";
        if (error) return "Vui lòng thử lại sau";
        return data.map(e => <Parcel config={Product} product={e}></Parcel>);
    }

    return (<Section title="Siêu giảm giá" subtitle="Hôm nay" controller={<FlashSaleController decrease={decrease} increase={increase}/>}>
        <div style={{display: 'flex', gap: '30px', margin: '40px 0px', overflow: 'scroll'}}>
            {FlashContent(data, error,isLoading)}
        </div>
        <div className="view-more-btn">
            <button>Xem tất cả</button>
        </div>
    </Section>);
}

function FlashSaleController({decrease, increase}) {
    return (<div id="flash-sale-controller">
        <button onClick={decrease}>
            <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
        <button onClick={increase}>
            <FontAwesomeIcon icon={faArrowRight}/>
        </button>
    </div>)
}