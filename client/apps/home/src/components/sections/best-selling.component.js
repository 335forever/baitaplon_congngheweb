import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Section } from "@TachMonShop/styleguide";
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
        Hello world
    </Section>);
}