import { useState } from "react";
import Parcel from "single-spa-react/parcel";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Section, Product} from "@TachMonShop/styleguide";

import "./styles/product-list.css"
export function ProductList() {
    const [index, setIndex] = useState(0);

    function decrease() {
        setIndex(index - 1);
    }

    function increase() {
        setIndex(index + 1);
    }

    return (<Section title="Mọi người tin dùng" subtitle="Sản phẩm" controller={<ProductListController />}>
        <div style={{display: 'flex', gap: '30px', margin: '40px 0px', flexWrap: 'wrap', overflow: 'scroll'}}>
            {Array(10).fill(<Parcel config={Product}></Parcel>)}
        </div>
        <div className="view-more-btn">
            <button>Xem tất cả</button>
        </div>
    </Section>);
}

function ProductListController({decrease, increase}) {
    return (<div id="product-list-controller">
        <button onClick={decrease}>
            <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
        <button onClick={increase}>
            <FontAwesomeIcon icon={faArrowRight}/>
        </button>
    </div>)
}