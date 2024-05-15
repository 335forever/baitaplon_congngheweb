import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import image1 from "../assets/book1.jpg" ;
import image2 from "../assets/book2.jpg" ;

function Item(props) {
  const [quantity, setQuantity] = useState(props.item.quantity);
  const [totalPrice, setTotalPrice] = useState(quantity*props.item.price);
  
  const onchangeHandle = (event)=>{
    if (event.target.value < 0){
      event.preventDefault();
    }
    else
    {
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
        <div className="flex w-1/2 items-center ml-20">
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
          <span>${props.item.price}</span>
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
          />
        </div>

        <div className="w-1/6">
          <span>${totalPrice}</span>
        </div>

      
      </div>
      {/* item end */}
    </div>
  );
}

export default function Cart(props) {
  const [listItem, setListItem] = useState([
    { 
      id: 1, 
      name: " book name with very long name without stop," 
            +" very very long long super super super long long" ,
      price:42000,
      image: image1,
      quantity:1,
    },
    { 
      id: 2, 
      name: "book 2",
      price:100000,
      image: image2,
      quantity:2,
    },
  ]);
  const handleQuantityChange = (id, quantity)=>{
    const newListItem = listItem.map((item)=>{
      if (item.id === id)
        return{
          ...item,
          quantity: quantity,
        } 
      return item;
    });
    setListItem(newListItem);
  }
  let totalPrice = 0;
  listItem.forEach(element => {
    totalPrice += element.price*element.quantity;
  });
  return (
    <div className="flex flex-col mx-auto max-w-5xl pt-20">
      <div className="flex flex-row items-center shadow-lg text-sm h-14 mb-3 py-0 px-3">
        
        <div className="font-sans text-black text-sm w-1/2 ml-24">Product</div>
        <div className="font-sans text-black text-sm w-1/6">Price</div>
        <div className="font-sans text-black text-sm w-1/6">Quantity</div>
        <div className="font-sans text-black text-sm w-1/6">Subtotal</div>
        
      </div>

      {/* item container */}
      <div className="flex flex-col shadow-lg mb-4 pb-4">
        {listItem.map((item)=>{
           return (<Item item={item} setListItem={handleQuantityChange}/>)
        })}

        <div className="flex flex-row justify-between mx-20 my-7">
          <div className="border border-black rounded px-5 py-2
                         hover:bg-gray-300 active:bg-gray-400">
            <button className="">Return to shop</button>
          </div>
          <div className="border border-black rounded px-5 py-2
                         hover:bg-gray-300 active:bg-gray-400">
            <button>Update Cart</button>
          </div>
        </div>
      </div>
      {/* itemcontainer end */}

      <div className="flex flex-row-reverse items-center justify-between">
        
        <div className="flex flex-col border border-black rounded p-5">
          <div className="h-7 text-xl pr-10 mb-5">Cart total</div>

          <div className="flex flex-row justify-items-stretch">
            <div className="text-sm w-3/12">Subtotal:</div>
            <div className="text-sm w-9/12 text-end">${totalPrice}</div>
          </div>
          <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-row justify-items-stretch">
            <div className="text-sm w-3/12">Shipping:</div>
            <div className="text-sm w-9/12 text-end">Free</div>
          </div>
          <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-row justify-items-stretch">
            <div className="text-sm w-3/12 font-semibold">Total:</div>
            <div className="text-sm w-9/12 text-end font-semibold">${totalPrice}</div>
          </div>
          <button 
            className="h-10 w-52 mt-3 bg-orange-500 hover:bg-orange-600 active:bg-red-600 
            rounded text-sm font-medium text-white place-self-end "
          >
            Process to checkout
          </button>
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
      </div>
    </div>
  );
}
