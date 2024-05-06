import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Section } from "@TachMonShop/styleguide";
import { useState } from "react";

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
        Hello world
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