import { QueryClient, QueryClientProvider } from "react-query";
import CategoriesList from "./components/category/categories-list.component";
import "@TachMonShop/styleguide";

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
      <CategoriesList />
    </QueryClientProvider>
  );
}
