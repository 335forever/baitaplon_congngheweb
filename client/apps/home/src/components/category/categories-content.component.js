import { useQuery } from "react-query";

import { getCategories } from "../../controllers/categories.controller";
import { CategoryItem } from "./category-item.component";
import "./styles/category.css";

export function CategoriesContent() {
  const query = useQuery(['categories'], getCategories, { suspense: true });

  return (
    <>
      {query.data.map((e) => (
        <CategoryItem key={e.name} category={e} />
      ))}
    </>
  );
}
