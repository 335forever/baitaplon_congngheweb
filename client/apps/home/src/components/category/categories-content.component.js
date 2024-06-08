import { useQuery } from "react-query";

import { getCategories } from "../../controllers/categories.controller";
import { CategoryItem } from "./category-item.component";
import "./styles/category.css";

export function CategoriesContent() {
  const {data, error} = useQuery(["categories"], getCategories, { suspense: true });
 
  return (
    <>
      {data
        .map((e) => <CategoryItem key={e.name} category={e} />)
        .slice(0, 10)}
    </>
  );
}
