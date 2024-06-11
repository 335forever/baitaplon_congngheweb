import { QueryClient, QueryClientProvider } from "react-query";
import { useMediaQuery } from "react-responsive";

import "@TachMonShop/styleguide";

import { Banner } from "./components/banner/banner.component";
import { FlashSale } from "./components/sections/flash-sale.component";
import { BrowseCategories } from "./components/sections/browse-categories.component";
import { BestSelling } from "./components/sections/best-selling.component";
import { ProductList } from "./components/sections/product-list.component";
import { Feature } from "./components/sections/feature.component";
import CategoriesList from "./components/category/categories-list.component";

import "./home.css";
import { Warranty } from "./components/sections/warranty.component";

export default function HomePage(props) {
  document.title = "TamoShop | Trang chủ";
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  const isSmall = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-row">
        <CategoriesList />
        <div style={{ borderRight: "1px solid var(--color-overlay)" }}></div>
        <Banner />
      </div>
      <div style={{ padding: isSmall ? "0px": "30px" }} />
      <article style={{ padding: isSmall ? "10px": "0px" }}>
        <FlashSale />
        <hr className="divider" />
        <BrowseCategories />
        <hr className="divider" />
        <BestSelling />
        <hr className="divider" />
        <ProductList />
        <hr className="divider" />
        <Feature />
        <Warranty />
      </article>
    </QueryClientProvider>
  );
}
