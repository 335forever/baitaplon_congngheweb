import { useState, useEffect, useLayoutEffect, useRef} from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { navigateToUrl } from "single-spa";
import { getCart, findProduct, updateCart, isSignedIn} from "@TachMonShop/api";
import "./cart.css";

import { toast } from "@TachMonShop/notification"

function Item(props) {
  const [quantity, setQuantity] = useState(props.item.quantity);
  const [totalPrice, setTotalPrice] = useState(quantity * props.item.price);

  const onchangeHandle = (event) => {
    if (event.target.value <= 0) {
      event.preventDefault();
    } else {
      setTotalPrice(props.item.price * event.target.value);
      setQuantity(event.target.value);
      props.setListItem(props.item.id, event.target.value);
    }
  };

  const onDeleteItem = () => {
    setTotalPrice(0);
    setQuantity(0);
    props.setListItem(props.item.id, 0);
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
            value={quantity}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={onchangeHandle}
          />
        </div>

        <div className="flex w-1/6 gap-10 justify-between">
          <span>
            {Intl.NumberFormat("vi", {
              style: "currency",
              currency: "VND",
            }).format(totalPrice)}
          </span>
          <button type="button" style={{color: 'var(--color-danger)'}} onClick={onDeleteItem}>
            Xóa
          </button>
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
  const [shipFee, setShipFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [listItem, setListItem] = useState([]);

  // const coupon = useRef();

  useEffect(() => {
    if (data) {
      setListItem(data);
    }
  }, [data]);

  useLayoutEffect(() => {
    let totalPrice = 0;
    listItem.forEach((element) => {
      totalPrice += element.price * element.quantity;
    setTotalPrice(totalPrice);
    setShipFee(totalPrice < 15000 ? 0: Math.max(Math.ceil(0.1*totalPrice), 15000));
  });
  }, [listItem]);

  async function updateCartInstance() {
    await Promise.all(listItem.map(e => updateCart({
      productId: e.id, quantity: e.quantity
    })));
    setListItem(listItem.filter(e => e.quantity > 0));
    toast({
      title: "Cập nhật thành công!",
      duration: 1000,
      isClosable: false,
      status: "success",
    });
  }

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

  function getTotalBilling() {
    return totalPrice + shipFee;
  }

  // function getCoupon(e) {
  //   e.preventDefault();
  //   if (new FormData(coupon.current).get('coupon') === "FREESHIP") {
  //     setShipFee(0);
  //   }
  // }

  if (isLoading) return "Đang tải";
  if (error) return "Vui lòng thử lại";
  return (
    <div className="flex flex-col mx-auto max-w-5xl pt-20 py-4">
      <div className="flex flex-row items-center shadow-lg text-sm h-14 mb-3 py-0 px-3">
        <div className="font-sans text-black text-sm w-1/2 ml-24">Sản phẩm</div>
        <div className="font-sans text-black text-sm w-1/6">Giá</div>
        <div className="font-sans text-black text-sm w-1/6">Số lượng</div>
        <div className="font-sans text-black text-sm w-1/6">Tổng</div>
      </div>

      {/* item container */}
      <div className="flex flex-col shadow-lg mb-4 pb-4">
        {listItem.filter(item => item.quantity > 0).length > 0 ? listItem.filter(item => item.quantity > 0).map((item) => {
          return <Item key={item.id} item={item} setListItem={handleQuantityChange} />;
        }): <p style={{width: '100%', textAlign: 'center'}}>Vui lòng chọn món đồ bạn yêu thích!</p>}

        <div className="flex flex-row justify-between mx-20 my-7">
          <div
            className="border border-black rounded px-5 py-2
                         hover:bg-gray-300 active:bg-gray-400"
          >
            <button className="" onClick={() => navigateToUrl('/')}>Quay lại</button>
          </div>
          <div
            className="border border-black rounded px-5 py-2
                         hover:bg-gray-300 active:bg-gray-400"
          >
            <button onClick={updateCartInstance}>Cập nhật</button>
          </div>
        </div>
      </div>
      {/* itemcontainer end */}

      <div className="flex flex-row-reverse items-center justify-between">
        <div className="flex flex-col border border-black rounded p-5 w-80">
          <div className="h-7 text-xl pr-10 mb-5">Thanh toán</div>

          <div className="flex flex-row justify-items-stretch">
            <div className="text-sm w-4/12">Giá:</div>
            <div className="text-sm w-8/12 text-end">
              {Intl.NumberFormat("vi", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </div>
          </div>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-row justify-items-stretch">
            <div className="text-sm w-4/12">Vận chuyển:</div>
            <div className="text-sm w-8/12 text-end">{shipFee > 0 ? Intl.NumberFormat("vi", {
                style: "currency",
                currency: "VND",
              }).format(shipFee) : "Miễn phí"}</div>
          </div>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-row justify-items-stretch">
            <div className="text-sm w-4/12 font-semibold">Tổng:</div>
            <div className="text-sm w-8/12 text-end font-semibold">
              {Intl.NumberFormat("vi", {
                style: "currency",
                currency: "VND",
              }).format(getTotalBilling())}
            </div>
          </div>
          <div className="flex flex-row justify-end py-2"><button
            className="btn" disabled={totalPrice <= 0}
            onClick={() => navigateToUrl('cart/billing')}
          >
            Thanh toán
          </button></div>
        </div>

        {/* <form ref={coupon} className="flex flex-row place-self-start gap-2">
          <input
            type="text"
            className="border border-black rounded pl-3 placeholder-gray-400"
            placeholder="Coupon Code"
            name="coupon"
          />
          <button
            type="submit"
            className="btn"
            onClick={getCoupon}
          >
            Nhập mã giảm giá
          </button>
        </form> */}
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

  useEffect(() => {
    if (!isSignedIn()) navigateToUrl('/');
  }, []);

  return (
    <QueryClientProvider client={client}>
      <CartContent />
    </QueryClientProvider>
  );
}
