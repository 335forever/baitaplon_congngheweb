import { faArrowLeft, faArrowRight, faCamera, faShop, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Section } from "@TachMonShop/styleguide";
import { useState } from "react";
import { useQuery } from "react-query";

import { getCategories } from "../../controllers/categories.controller";

import "./styles/browse-categories.css"
import { navigateToUrl } from "single-spa";
export function BrowseCategories() {
    
    const {data, error, isLoading} = useQuery(["categories"], getCategories);
    const [index, setIndex] = useState(0);

    function decrease() {
        setIndex(index - 1);
    }

    function increase() {
        setIndex(index + 1);
    }

    return (<Section title="Chọn danh mục" subtitle="Danh mục" controller={<BrowseCategoriesController />}>
        <div style={{display: 'flex', gap: '30px', margin: '40px 0px', overflow: 'scroll'}}>
            {!isLoading && !error && data.map(e => <button className="category-browser" onClick={() => {
                navigateToUrl(e.getLink)
            }}>
                <FontAwesomeIcon icon={faShoppingBag} />
                <p>{e.name}</p>
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