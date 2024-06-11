import visaIcon from "../assets/visa_icon.svg";
import mastercardIcon from "../assets/mastercard.svg";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  getCart,
  findProduct,
  updateCart,
  getUserInfo,
  createOrder,
  isSignedIn,
  getVouchers
} from "@TachMonShop/api";
import { toast } from "@TachMonShop/notification";

import "./billing.css";
import { navigateToUrl } from "single-spa";
import { getVouchers } from "../../../api/src/TachMonShop-api";
function Item(props) {
  const totalPrice = props.item.price * props.item.quantity;
  return (
    <div className="flex flex-row items-center mt-4">
      {/* image and name */}
      <div className="flex w-4/6 items-center gap-2">
        <img
          className=" w-16 h-16 object-contain"
          src={props.item.image}
          alt="item1"
        />
        <div className="w-4/6 line-clamp-2 text-ellipsis">
          {props.item.name}
        </div>
      </div>

      {/* price */}
      {/* <div className="w-1/6">
          <span>${props.item.price}</span>
        </div> */}

      {/* quantity */}
      <div className="flex flex-row w-1/6 pl-5">x{props.item.quantity}</div>

      <div className="w-1/6 text-end">
        <span>
          {Intl.NumberFormat("vi", {
            style: "currency",
            currency: "VND",
          }).format(totalPrice)}
        </span>
      </div>
    </div>
  );
}

let voucherAvailable = [];

async function getFullCart() {
  voucherAvailable.clear();
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
    const vouchers = await getVouchers(productInfo.shoperID);
    voucherAvailable.push(...vouchers);
  }
  return result;
}

async function payForProduct(cart, voucher, shipFee, paymentMethod) {
  try {
    for (const product of cart) {
      await createOrder({
        productId: product.id,
        quantity: product.quantity,
        paymentMethod,
      });
      await updateCart({
        productId: product.id,
        quantity: 0
      });
    }
    navigateToUrl("/");
    toast({
      title: "Đặt hàng thành công!",
      duration: 1000,
      isClosable: false,
      status: "success",
    });
  } catch (e) {
    toast({
      title: "Lỗi",
      description: `${e}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}

function BillingDetails() {
  const cartQuery = useQuery(["cart"], getFullCart);
  const userQuery = useQuery(["user"], getUserInfo);
  
  const [listItem, setListItem] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [shipFee, setShipFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");

  const couponRef = useRef();
  const billingRef = useRef();

  useEffect(() => {
    if (cartQuery.data) {
      setListItem(cartQuery.data);
    }
  }, [cartQuery.data]);

  useLayoutEffect(() => {
    const price =
      listItem.reduce((s, item) => s + item.price * item.quantity, 0) ?? 0;
    setTotalPrice(price);
    if (!coupon)
      setShipFee(price < 15000 ? 0 : Math.max(Math.ceil(0.1 * price), 15000));
    else {
      if (coupon === "FREESHIP") {
        setShipFee(0);
      }
    }
  }, [listItem, coupon]);

  useEffect(() => {
    if (cartQuery.error)
      navigateToUrl(
        `/signin?r=${encodeURIComponent(window.location.pathname)}`
      );
  }, [cartQuery.error]);

  useEffect(() => {
    if (userQuery.data) setUserInfo(userQuery.data);
  }, [userQuery.data]);

  useEffect(() => {
    if (!isSignedIn()) navigateToUrl('/');
  }, []);

  function handleCouponChange(e) {
    e.preventDefault();
    setCoupon(new FormData(couponRef.current).get("coupon"));
  }

  function handleChange(field) {
    return (e) => {
      setUserInfo((state) => {
        const newState = { ...state };
        newState[field] = e.target.value;
        return newState;
      });
    };
  }

  function getTotalBilling() {
    return totalPrice + shipFee;
  }

  if (cartQuery.error) return "Vui lòng thử lại sau";
  return (
    <div className="flex flexible justify-between">
      {userInfo.isLoading ? (
        "Đang tải"
      ) : (
        <form className="flex flex-col rounded shadow-lg p-8 account-info-form">
          <div className=" text-gray-500">
            Họ và tên<span className=" text-red-500">*</span>
          </div>
          <input
            type="text"
            name="fullname"
            value={userInfo.name}
            onChange={handleChange("name")}
            className=" bg-gray-200 h-10"
          />
          <div className=" text-gray-500 mt-5">
            Địa chỉ<span className=" text-red-500">*</span>
          </div>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange("address")}
            className=" bg-gray-200 h-10"
          />
          <div className=" text-gray-500 mt-5">
            Số điện thoại<span className=" text-red-500">*</span>
          </div>
          <input
            type="text"
            name="phoneNumber"
            className=" bg-gray-200 h-10"
            value={userInfo.phone}
            onChange={handleChange("phone")}
            onKeyDown={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <div className=" text-gray-500 mt-5">
            Email<span className=" text-red-500">*</span>
          </div>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange("email")}
            className=" bg-gray-200 h-10"
          />

          <div className="flex flex-row mt-5">
            <input type="checkbox" name="saved" className=" self-start mt-1" />
            <div className="text-sm self-start ml-3">
              Lưu thông tin cho lần mua sắm tiếp theo.
            </div>
          </div>
        </form>
      )}

      <form ref={billingRef} className="flex flex-col rounded shadow-lg p-8">
        {cartQuery.isLoading ? (
          "Đang tải"
        ) : (
          <>
            <div>
              {listItem.map((item) => {
                return <Item item={item} key={item.id} />;
              })}
            </div>

            <div className="flex flex-row justify-between mt-7 mb-3">
              <div>Tạm tính:</div>
              <div>
                {Intl.NumberFormat("vi", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice)}
              </div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <div className="flex flex-row justify-between mt-5 mb-3">
              <div>Vận chuyển:</div>
              <div>
                {shipFee > 0
                  ? Intl.NumberFormat("vi", {
                      style: "currency",
                      currency: "VND",
                    }).format(shipFee)
                  : "Miễn phí"}
              </div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <div className="flex flex-row justify-between mt-5 mb-3">
              <div>Tổng:</div>
              <div>
                {Intl.NumberFormat("vi", {
                  style: "currency",
                  currency: "VND",
                }).format(getTotalBilling())}
              </div>
            </div>
          </>
        )}

        <div className="flex flex-row justify-between mb-5">
          <div className="flex flex-row ">
            <input
              name="select-method"
              type="radio"
              className="mr-3"
              value={0}
            />
            <div>Tài khoản</div>
            <img src={visaIcon} alt="visa" className="h-7 w-7 ml-[250px]" />
            <img src={mastercardIcon} alt="mastercard" className="h-7 w-7" />
          </div>
        </div>

        <div className="flex flex-row mb-5">
          <input
            name="select-method"
            type="radio"
            value={1}
            checked
            className="mr-3"
          />
          <div>Tiền mặt</div>
        </div>

        <div className="flex flex-col gap-4">
          <form
            ref={couponRef}
            className="flex flex-row place-self-start gap-2"
          >
            <input
              type="text"
              className="border border-black rounded pl-3 placeholder-gray-400"
              placeholder="Mã giảm giá"
              name="coupon"
            />
            <button type="submit" className="btn" onClick={handleCouponChange}>
              Nhập mã giảm giá
            </button>
          </form>
          <textarea
            type="text"
            className="border border-black rounded pl-3 placeholder-gray-400 py-2"
            placeholder="Lời nhắn"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
          />
          <button
            className="btn px-10 py-2"
            onClick={async (e) => {
              e.preventDefault();
              await payForProduct(
                listItem,
                coupon,
                shipFee,
                billingRef.current.elements["select-method"].value ?? 1
              );
            }}
          >
            Đặt hàng
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Billing(props) {
  document.title = "TachMonShop | Thanh toán";
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
      <div className="flex flex-col mx-auto max-w-5xl pt-20">
        <div className=" text-3xl ">Thanh toán</div>
        <BillingDetails />
      </div>
    </QueryClientProvider>
  );
}
