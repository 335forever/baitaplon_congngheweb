import { faArrowLeft, faArrowRight, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Section } from "@TachMonShop/styleguide";
import { useState } from "react";

import "./styles/browse-categories.css"
export function BrowseCategories() {
    const [index, setIndex] = useState(0);

    function decrease() {
        setIndex(index - 1);
    }

    function increase() {
        setIndex(index + 1);
    }

    return (<Section title="Chọn danh mục" subtitle="Danh mục" controller={<BrowseCategoriesController />}>
        <div style={{display: 'flex', gap: '30px', margin: '40px 0px', overflow: 'scroll'}}>
            {Array(10).fill(<button className="category-browser">
                <FontAwesomeIcon icon={faCamera} />
                <p>Camera</p>
            </button>)}
        </div>
    </Section>);
}

function BrowseCategoriesController({decrease, increase}) {
    return (<div id="browse-categories-controller">
        <button onClick={decrease}>
            <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
        <button onClick={increase}>
            <FontAwesomeIcon icon={faArrowRight}/>
        </button>
    </div>)
}