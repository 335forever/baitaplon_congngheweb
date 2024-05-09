export function CategoriesFallback(props) {
  return (
    <div>
      {Array.from({ length: 9 }, (_, k) => (
        <div className="loading-line"></div>
      ))}
    </div>
  );
}
