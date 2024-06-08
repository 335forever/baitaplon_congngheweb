import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";
import "./root.css";
import { productStore } from "./controllers/product.store";
import { ProductPage } from "./components/product.component";
// :shopId/:productId
export default function Root(props) {
  document.title = "TachMonShop | Sản phẩm"
  // const product = {
  //   name: "PlayStation PS5 Hàng chính hãng Trung Quốc nội địa",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum maximus arcu eleifend nunc fermentum scelerisque. Phasellus imperdiet pellentesque nisi egestas lobortis. In pharetra enim sed maximus porttitor. Duis aliquam congue egestas. Fusce gravida justo et porta gravida. Integer venenatis sapien in leo interdum, ut lobortis sem consequat. In porttitor, mauris quis dapibus cursus, sapien mauris cursus neque, sit amet rhoncus ante sem bibendum tellus. Vivamus condimentum velit sed eros mattis fringilla. Nam venenatis tristique orci, at sollicitudin lorem interdum sit amet. Aliquam eu commodo nibh, non luctus odio. Aliquam vitae risus ante. Maecenas volutpat non tellus sed luctus. Vestibulum nec neque consequat, tempus leo sit amet, sollicitudin nisi. In laoreet sagittis elit. Curabitur efficitur, mi nec pulvinar dignissim, velit metus varius urna, ac ultrices justo lectus eu lacus. Duis et lacus dictum, consequat tellus at, maximus orci.",
  //   isInStock: true,
  //   reviewCount: 150,
  //   images: [
  //     "https://hanoicomputercdn.com/media/product/77517_may_choi_game_sony_playstation_5_ps5_slim_digital_1.jpg",
  //     "https://bizweb.dktcdn.net/thumb/grande/100/031/560/products/broshop-may-choi-game-sony-playstation-5-ps5-standard-edition-2-fa156421-1a30-499e-b413-d4e294d19650-44ee91fc-8d3d-4f00-add3-a804f6a602bc.png?v=1624602153627",
  //     "https://i5.walmartimages.com/seo/Sony-PlayStation-5-Video-Game-Console-Ps5-Disc-Console-New_396aa760-b2f6-4c06-8dc5-276184a85dc6.0d8c80439262394fc4edabb03056daa3.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
  //     "https://floatinggrip.com/cdn/shop/products/FLOATINGGRIP-PS5WallMount-FG-PS5-130W.png?v=1674489611&width=2048",
  //     "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/may-choi-game-sony-playstation-5-slim.png",
  //   ],
  //   colors: ["white", "yellow", "green"],
  //   sizes: ["XS", "S", "M", "L", "XL"],
  // };

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
      <Provider store={productStore}>
        <ProductPage />
      </Provider>
    </QueryClientProvider>
  );
}
