import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getCart, findProduct, updateCart } from "@TachMonShop/api";
import "./cart.css";

function Item(props) {
  const [quantity, setQuantity] = useState(props.item.quantity);
  const [totalPrice, setTotalPrice] = useState(quantity * props.item.price);

  const onchangeHandle = (event) => {
    if (event.target.value < 0) {
      event.preventDefault();
    } else {
      setTotalPrice(props.item.price * event.target.value);
      setQuantity(event.target.value);
      props.setListItem(props.item.id, event.target.value);
    }
  };

  return (
    <div>
      {/* item */}
      <div className="flex flex-row items-center py-0 px-3 mt-4 pt-4">
        {/* image and name */}
        <div className="flex w-1/2 items-center ml-20 gap-1">
          <img
            className=" w-20 h-20 object-contain"
            src={props.item.image}
            alt="item1"
          />
          <div className="max-h-12 w-4/6 line-clamp-2 text-ellipsis">
            {props.item.name}
          </div>
        </div>
        {/* price */}
        <div className="w-1/6">
          <span>
            {Intl.NumberFormat("vi", {
              style: "currency",
              currency: "VND",
            }).format(props.item.price)}
          </span>
        </div>
        {/* quantity */}
        <div className="flex flex-row w-1/6">
          <input
            type="number"
            className="w-20 h-10 border text-center"
            defaultValue={props.item.quantity}
            value={quantity}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={onchangeHandle}
            onBlur={async (e) => {
              if (e.target.value > 0) {
                updateCart({
                  productId: props.item.id,
                  quantity: e.target.value,
                });
              }
            }}
          />
        </div>

        <div className="w-1/6">
          <span>
            {Intl.NumberFormat("vi", {
              style: "currency",
              currency: "VND",
            }).format(totalPrice)}
          </span>
        </div>
      </div>
      {/* item end */}
    </div>
  );
}

async function getFullCart() {
  const cart = await getCart();
  const result = [];
  for (const product of cart) {
    const productInfo = await findProduct({ productId: product.productId });
    result.push({
      id: product.productId,
      name: productInfo.name,
      price: productInfo.price,
      image: productInfo.images.image1,
      quantity: product.quantity,
    });
  }
  return result;
}
function CartContent() {
  const { data, error, isLoading } = useQuery(["cart"], getFullCart);
  const [listItem, setListItem] = useState([
    // {
    //   id: 1,
    //   name: " book name with very long name without stop,"
    //         +" very very long long super super super long long" ,
    //   price:42000,
    //   image: image1,
    //   quantity:1,
    // },
    // {
    //   id: 2,
    //   name: "book 2",
    //   price:100000,
    //   image: image2,
    //   quantity:2,
    // },
  ]);

  useEffect(() => {
    if (data) {
      setListItem(data);
    }
  }, [data]);

  const handleQuantityChange = (id, quantity) => {
    const newListItem = listItem.map((item) => {
      if (item.id === id)
        return {
          ...item,
          quantity: quantity,
        };
      return item;
    });
    setListItem(newListItem);
  };
  let totalPrice = 0;
  listItem.forEach((element) => {
    totalPrice += element.price * element.quantity;
  });
  if (isLoading) return "Đang tải";
  if (error) return "Vui lòng thử lại";
  return (
    <div className="flex flex-col mx-auto max-w-5xl pt-20 py-4">
      <div className="flex flex-row items-center shadow-lg text-sm h-14 mb-3 py-0 px-3">
        <div className="font-sans text-black text-sm w-1/2 ml-24">Product</div>
        <div className="font-sans text-black text-sm w-1/6">Price</div>
        <div className="font-sans text-black text-sm w-1/6">Quantity</div>
        <div className="font-sans text-black text-sm w-1/6">Subtotal</div>
      </div>

      {/* item container */}
      <div className="flex flex-col shadow-lg mb-4 pb-4">
        {listItem.map((item) => {
          return <Item item={item} setListItem={handleQuantityChange} />;
        })}

        <div className="flex flex-row justify-between mx-20 my-7">
          <div
            className="border border-black rounded px-5 py-2
                         hover:bg-gray-300 active:bg-gray-400"
          >
            <button className="">Return to shop</button>
          </div>
          <div
            className="border border-black rounded px-5 py-2
                         hover:bg-gray-300 active:bg-gray-400"
          >
            <button>Update Cart</button>
          </div>
        </div>
      </div>
      {/* itemcontainer end */}

      <div className="flex flex-row-reverse items-center justify-between">
        <div className="flex flex-col border border-black rounded p-5 w-80">
          <div className="h-7 text-xl pr-10 mb-5">Cart total</div>

          <div className="flex flex-row justify-items-stretch">
            <div className="text-sm w-4/12">Subtotal:</div>
            <div className="text-sm w-8/12 text-end">
              {Intl.NumberFormat("vi", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </div>
          </div>
          <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-row justify-items-stretch">
            <div className="text-sm w-4/12">Shipping:</div>
            <div className="text-sm w-8/12 text-end">Free</div>
          </div>
          <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-row justify-items-stretch">
            <div className="text-sm w-4/12 font-semibold">Total:</div>
            <div className="text-sm w-8/12 text-end font-semibold">
              {Intl.NumberFormat("vi", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </div>
          </div>
          <div className="flex flex-row justify-end py-2"><button
            className="btn"
          >
            Process to checkout
          </button></div>
        </div>

        <div className="flex flex-row place-self-start gap-2">
          <input
            type="text"
            className="border border-black rounded pl-3 placeholder-gray-400"
            placeholder="Coupon Code"
          />
          <button
            className="btn"
          >
            Apply coupon
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Cart(props) {
  document.title = "TachMonShop | Giỏ hàng";
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <CartContent />
    </QueryClientProvider>
  );
}
