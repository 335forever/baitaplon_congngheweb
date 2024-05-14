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
        {/* checkbox */}
        {/* <div className="w-4 h-4 mx-4 items-center">
          <input type="checkbox" />
        </div> */}
        {/* image and name */}
        <div className="flex w-1/2 items-center">
          <img 
            className="w-20 h-20 object-contain" 
            src={props.item.image} 
            alt="item1" 
          />
          <div className="max-h-12 w-4/6 line-clamp-2 text-ellipsis">
            {props.item.name}
          </div>
        </div>
        {/* price */}
        <div className="w-1/6">
          <span>{props.item.price}đ</span>
        </div>
        {/* quantity */}
        <div className="flex flex-row w-1/6">
          <input
            type="number"
            className="w-20 h-10 border"
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
          <span>{totalPrice}đ</span>
        </div>

        <div className="w-1/6">
          <button>
            <FontAwesomeIcon icon={faTrashCan} className="mx-5" />
          </button>
        </div>
      </div>
      {/* item end */}
    </div>
  );
}

export default function Billing(props) {
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
      <div className="flex flex-row items-center shadow text-sm h-14 mb-3 py-0 px-3">
        {/* <div className="w-4 h-4 mx-4 items-center">
          <input type="checkbox" />
        </div> */}
        <div className="font-sans text-black text-sm w-1/2">Sản phẩm</div>
        <div className="font-sans text-slate-500 text-sm w-1/6">Đơn giá</div>
        <div className="font-sans text-slate-500 text-sm w-1/6">Số Lượng</div>
        <div className="font-sans text-slate-500 text-sm w-1/6">Số Tiền</div>
        <div className="font-sans text-slate-500 text-sm w-1/6">Thao Tác</div>
      </div>

      {/* item container */}
      <div className="flex flex-col shadow mb-4 pb-4">
        {listItem.map((item)=>{
           return (<Item item={item} setListItem={handleQuantityChange}/>)
        })}
      </div>
      {/* itemcontainer end */}

      <div className="flex flex-row-reverse items-center">
        <button className="h-10 w-52 bg-orange-600 text-sm font-medium text-white">
          Mua Hàng
        </button>
        <div className="h-7 text-2xl pr-10">Tổng thanh toán: {totalPrice}đ</div>
      </div>
    </div>
  );
}
