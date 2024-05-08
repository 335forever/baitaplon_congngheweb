import { useState } from "react";


import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Section, Product } from "@TachMonShop/styleguide";
import Parcel from "single-spa-react/parcel"

import "./styles/flash-sale.css"
export function FlashSale() {
    const [index, setIndex] = useState(0);

    function decrease() {
        setIndex(index - 1);
    }

    function increase() {
        setIndex(index + 1);
    }

    return (<Section title="Siêu giảm giá" subtitle="Hôm nay" controller={<FlashSaleController />}>
        <div style={{display: 'flex', gap: '30px', margin: '40px 0px', overflow: 'scroll'}}>
            {Array(10).fill(<Parcel config={Product}></Parcel>)}
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