import { useState } from "react";
import { QueryClientProvider, useQuery, QueryClient } from "react-query";
import Parcel from "single-spa-react/parcel";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Section, Product } from "@TachMonShop/styleguide";
import { findProduct } from "@TachMonShop/api";

async function fetchData() {
  const params = new URLSearchParams(window.location.search);
  let query = {}
  for (const key of params.keys()) { 
    query[key] = params.get(key);
  }
  return await findProduct(query);
}
function Content() {
  const [index, setIndex] = useState(0);
  const { data, error, isLoading } = useQuery("products", fetchData);

  function decrease() {
    setIndex(index - 1);
  }

  function increase() {
    setIndex(index + 1);
  }

  function ProductContent(data, error, isLoading) {
    console.log(data, error, isLoading);
    if (isLoading) return "Đang tải";
    if (error?.response.status === 404) return "Không có sản phẩm";
    if (error) return "Vui lòng thử lại";
    return data.map((e) => <Parcel config={Product} product={e}></Parcel>);
  }

  return (
      <Section
        title="Kết quả tìm kiếm"
        controller={<ProductListController />}
      >
        <div
          style={{
            display: "flex",
            gap: "30px",
            margin: "40px 0px",
            flexWrap: "wrap",
            overflow: "scroll",
            justifyContent: "center",
          }}
        >
          {ProductContent(data, error, isLoading)}
        </div>
        <div className="view-more-btn">
          <button>Xem tất cả</button>
        </div>
      </Section>
  );
}

function ProductListController({ decrease, increase }) {
  return (
    <div id="product-list-controller">
      <button onClick={decrease}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button onClick={increase}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}

export default function Root() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}
