import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";

import { getCategories } from "../../controllers/categories.controller";
export function CategoriesContent(props) {
  const query = useQuery([], getCategories, { suspense: true });

  return (
    <div>
      {query.data.map((e) => (
        <div className="category">
          <p>{e.name}</p>
          {e.sub.length && (
            <button>
              <FontAwesomeIcon className="h-auto" icon={faAngleRight} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
