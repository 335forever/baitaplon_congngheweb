import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import {clsx} from "clsx" 


import { CategoriesFallback } from "./categories-fallback.component";
import { CategoriesContent } from "./categories-content.component";


import "./styles/categories-list.css";

export default function CategoriesList(props) {
  const isSmall = useMediaQuery({query: '(max-width: 800px)'})

  console.log(isSmall, "Hello categories")

  return (
    <BrowserRouter>
      <div className={clsx("categories-list", isSmall && "hidden")}>
        <Suspense fallback={<CategoriesFallback />}>
          <CategoriesContent />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
