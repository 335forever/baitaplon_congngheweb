import { QueryClient, QueryClientProvider } from "react-query";
import CategoriesList from "./components/category/categories-list.component";
import "@TachMonShop/styleguide";
import { Banner } from "./components/banner/banner.component";


export default function HomePage(props) {
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
      <div className="flex flex-row">
        <CategoriesList />
        <Banner />
      </div>
    </QueryClientProvider>
  );
}
