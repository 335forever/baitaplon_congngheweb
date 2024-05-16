import image1 from "../assets/book1.jpg";
import image2 from "../assets/book2.jpg";
import visaIcon from "../assets/visa_icon.svg";
import mastercardIcon from "../assets/mastercard.svg";

function Item(props) {
  const totalPrice = props.item.price * props.item.quantity;
  return (
    <div className="flex flex-row items-center py-0 mt-4">
      {/* image and name */}
      <div className="flex w-4/6 items-center">
        <img
          className=" w-16 h-16 object-contain"
          src={props.item.image}
          alt="item1"
        />
        <div className="max-h-12 w-4/6 line-clamp-2 text-ellipsis">
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
        <span>${totalPrice}</span>
      </div>
    </div>
  );
}

export default function Billing(props) {
  
  const listItem = [
    {
      id: 1,
      name:
        " book name with very long name without stop," +
        " very very long long super super super long long",
      price: 42000,
      image: image1,
      quantity: 1,
    },
    {
      id: 2,
      name: "book 2",
      price: 100000,
      image: image2,
      quantity: 2,
    },
  ];
  let totalPrice = 0;
  return (
    <div className="flex flex-col mx-auto max-w-5xl pt-20">
      <div className=" text-3xl ">Billing Details</div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col max-h-[600px] rounded shadow-lg p-8 w-5/12">
          <div className=" text-gray-500">
            First Name<span className=" text-red-500">*</span>
          </div>
          <input type="text" className=" bg-gray-200 h-10" />
          <div className=" text-gray-500 mt-5">
            Last Name<span className=" text-red-500">*</span>
          </div>
          <input type="text" className=" bg-gray-200 h-10" />
          <div className=" text-gray-500 mt-5">
            Street Address<span className=" text-red-500">*</span>
          </div>
          <input type="text" className=" bg-gray-200 h-10" />
          <div className=" text-gray-500 mt-5">
            Apartment, floor, etc. (optional)
          </div>
          <input type="text" className=" bg-gray-200 h-10" />
          <div className=" text-gray-500 mt-5">
            Town/City<span className=" text-red-500">*</span>
          </div>
          <input type="text" className=" bg-gray-200 h-10" />
          <div className=" text-gray-500 mt-5">
            Phone Number<span className=" text-red-500">*</span>
          </div>
          <input
            type="text"
            className=" bg-gray-200 h-10"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <div className=" text-gray-500 mt-5">
            Email Address<span className=" text-red-500">*</span>
          </div>
          <input type="text" className=" bg-gray-200 h-10" />

          <div className="flex flex-row mt-5">
            <input type="checkbox" className=" self-start mt-1"/>
            <div className="text-sm self-start ml-3">
              Save this information for faster check-out next time.
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded shadow-lg p-8 w-5/12">
          {listItem.map((item) => {
            totalPrice += item.price * item.quantity;
            return <Item item={item} />;
          })}

          <div className="flex flex-row justify-between mt-7 mb-3">
            <div>Subtotal:</div>
            <div>${totalPrice}</div>
          </div>
          <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-row justify-between mt-5 mb-3">
            <div>Shipping:</div>
            <div>Free</div>
          </div>
          <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-row justify-between mt-5 mb-3">
            <div>Total:</div>
            <div>${totalPrice}</div>
          </div>

          <div className="flex flex-row justify-between mb-5">
            <div className="flex flex-row ">
              <input name="select-method" type="radio" className="mr-3" />
              <div>Bank</div>
              <img src={visaIcon} alt="visa" className="h-7 w-7 ml-[250px]"/>
              <img src={mastercardIcon} alt="mastercard" className="h-7 w-7"/>
            </div>
          </div>

          <div className="flex flex-row mb-5">
            <input
              name="select-method"
              type="radio"
              checked="checked"
              className="mr-3"
            />
            <div>Cash on delivery</div>
          </div>

          <div className="flex flex-row place-self-start">
            <input
              type="text"
              className="border border-black rounded pl-3 placeholder-gray-400"
              placeholder="Coupon Code"
            />
            <button
              className="h-10 w-36 ml-3 bg-orange-500 hover:bg-orange-600 active:bg-red-600 
            rounded text-sm font-medium text-white place-self-end "
            >
              Apply coupon
            </button>
          </div>

          <button 
            className="h-10 w-36 mt-5 bg-orange-500 hover:bg-orange-600 active:bg-red-600 
            rounded text-sm font-medium text-white place-self-start "
          >
            Place order
          </button>

        </div>
      </div>
    </div>
  );
}
