import "./styles/category-fallback.css"

export function CategoriesFallback(props) {
  return (
    <>
      {Array.from({ length: 9 }, (_, k) => (
        <div className="loading-line"></div>
      ))}
    </>
  );
}
