import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./styles/category.css";
export function CategoryItem({ category, level = 0}) {
  const [isExpanded, setExpanded] = useState(false);

  function handleClick() {
    setExpanded(!isExpanded);
  }

  return (<>
    <Link className="category" to={category.sub.length === 0 && category.getLink}>
      <div className="flex flex-row">
        <div style={{width: level * 16 + 'px'}}></div>
        <p>{category.name}</p>
      </div>
      {category.sub.length !== 0 && (
        <>
          <button onClick={handleClick}>
            <FontAwesomeIcon
              className="h-auto"
              icon={isExpanded ? faAngleUp : faAngleDown}
            />
          </button>
        </>
      )}
    </Link>
    {isExpanded && category.sub.map((e) => <CategoryItem key={e.name} category={e} level={level + 1} />)}
    </>
  );
}
