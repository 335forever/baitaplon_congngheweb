import { useState, useRef, useEffect, useLayoutEffect, useTransition } from "react";
import { QueryClientProvider, useQuery, QueryClient } from "react-query";
import Parcel from "single-spa-react/parcel";

import { Section, Product, NavRoute } from "@TachMonShop/styleguide";
import { findProduct } from "@TachMonShop/api";

import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider.component.js"
import "./root.css";

async function fetchData({queryKey: [query]}) {
  return await findProduct(query);
}
function Content({query}) {
  const [_isPending, startTransition] = useTransition();
  const { data, error, isLoading } = useQuery([query], fetchData);
  const [dirty, setDirty] = useState(false);
  const [filter, setFilter] = useState({orderBy: null, decrease: false})

  const filterRef = useRef();

  useEffect(() => {
    if (dirty) {
      const newFilter = filterRef.current.elements;
      startTransition(() => setFilter({
          orderBy: newFilter['order'].value,
          decrease: newFilter['decrease'].checked,
          priceRange: [newFilter['minPrice'].value, newFilter['maxPrice'].value],
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
          remain: newFilter['remain'].checked
        })); 
      setDirty(false);
    }
  }, [dirty])

  useLayoutEffect(() => {
    if (data) {
      const minPrice = Math.min(...data.map(e => e.price))
      const maxPrice = Math.max(...data.map(e => e.price))
      setFilter({
        ...filter,
        minPrice: minPrice,
        maxPrice: maxPrice,
        priceRange: [minPrice, maxPrice]
      })
    }
  }, [data]);

  function ProductContent(data, error, isLoading) {
    if (isLoading) return "Đang tải";
    if (error?.response.status === 404) return "Không có sản phẩm";
    if (error) return "Vui lòng thử lại";
    let filteredData = data.filter(e => {
      if (filter.remain && e.quantity <= 0) return false;
      if (e.price < filter.priceRange[0]) return false;
      if (e.price > filter.priceRange[1]) return false;
      return true; 
    });
    if (filter.orderBy === 'alphabet') filteredData = filteredData.sort((a, b) => a.name > b.name);
    else if (filter.orderBy === 'price') filteredData = filteredData.sort((a, b) => a.price > b.price);
    if (filter.decrease) filteredData = filteredData.reverse();
    return filteredData.map((e) => <Parcel config={Product} product={e}></Parcel>);
  }

  return (
    <div style={{ padding: "40px 0px" }}>
      <Parcel config={NavRoute} names={["Trang chủ", "Tìm kiếm"]} />
      <h1 style={{ fontSize: "36px", fontWeight: "600" }}>Kết quả tìm kiếm</h1>
      <div className="flex gap-4 my-10">
        <form ref={filterRef} className="filter" onChange={() => setDirty(true)}>
          <h2>Bộ lọc</h2>
          <input type="radio" name="order" value="alphabet" />
          <label>Từ A-Z</label>
          <br />
          <input type="radio" name="order" value="price" />
          <label>Theo giá thành</label>
          <br />
          <input type="checkbox" name="decrease"/>
          <label>Giảm dần</label>
          <hr />
          <p>Mức giá</p>
          {filter.minPrice && <MultiRangeSlider min={filter.minPrice} max={filter.maxPrice} onChange={() => {}}/>}
          <hr />
          <p>Tình trạng</p>
          <input type="checkbox" name="remain"/><label>Vẫn còn hàng</label>
        </form>
        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            overflow: "scroll",
            justifyContent: "center",
          }}
        >
          {filter.minPrice && ProductContent(data, error, isLoading)}
        </div>
      </div>
    </div>
  );
}

export default function Root() {
  document.title = "TachMonShop | Tìm kiếm";
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  const [keyword, setKeyword] = useState(null);

  useEffect(() => {
    const listener = () => {
      const params = new URLSearchParams(window.location.search);
      let query = {};
      for (const key of params.keys()) {
        query[key] = params.get(key);
      }
      setKeyword(query)
    }
    if (keyword === null) listener();
    window.addEventListener('popstate', listener);
    return () => {
      window.removeEventListener('popstate', listener);
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {keyword && <Content query={keyword}/>}
    </QueryClientProvider>
  );
}
