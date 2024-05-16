import './index.css'
import item1 from '../assets/images/item1.svg'
import item2 from '../assets/images/item2.svg'
import ProductCard from './components/ProductCard';
import React from 'react'
import Spacer from './components/Spacer';
import { Button, ChakraProvider } from '@chakra-ui/react'

export default function Wishlist(props) {
  const wishlistItems = [
    {
      "name": "Gucci duffle bag",
      "price": 1160,
      "discount": 0.35,
      "image": item1
    },
    {
      "name": "Gucci duffle bag",
      "price": 1160,
      "discount": 0,
      "image": item1
    },
    {
      "name": "Gucci duffle bag",
      "price": 1160,
      "discount": 0,
      "image": item1
    },
    {
      "name": "Gucci duffle bag",
      "price": 1160,
      "discount": 0.35,
      "image": item1
    },
    {
      "name": "Gucci duffle bag",
      "price": 1160,
      "discount": 0.35,
      "image": item1
    },
  ];

  const justForYouItems = [
    {
      "name": "ASUS FHD Gaming Laptop",
      "price": 1160,
      "discount": 0.35,
      "image": item2,
      "rating": 3.5,
      "numOfRating": 65
    },
    {
      "name": "ASUS FHD Gaming Laptop",
      "price": 1160,
      "image": item2,
      "rating": 3.5,
      "numOfRating": 65
    },
    {
      "name": "ASUS FHD Gaming Laptop",
      "price": 1160,
      "image": item2,
      "rating": 3.5,
      "numOfRating": 65,
      "isNew": true
    },
    {
      "name": "ASUS FHD Gaming Laptop",
      "price": 1160,
      "image": item2,
      "rating": 3.5,
      "numOfRating": 65
    },
    {
      "name": "ASUS FHD Gaming Laptop",
      "price": 1160,
      "image": item2,
      "rating": 3.5,
      "numOfRating": 65
    },
  ];

  return (
    <ChakraProvider>
      <div id='wrapper'>
        <div className='title'>
          <div>Yêu thích ({wishlistItems.length})</div>
          <div><Button border="2px" borderColor="rgba(0, 0, 0, 0.5)" paddingBottom={6} paddingLeft={16} paddingRight={16} paddingTop={6} variant="outline">Cho tất cả vào giỏ hàng</Button></div>
        </div>
        <Spacer height={60} />
        <div className="product-grid">
          {wishlistItems.map((e, index) => <ProductCard {...e} key={index} />)}
        </div>
        <Spacer height={60} />
        <div className='title'>
          <div style={{ display: "flex" }} ><div style={{ backgroundColor: "#db4444", borderRadius: "4px", height: "2.5rem", width: "10px" }} /><Spacer width={10} /> Dành riêng cho bạn</div>
          <div><Button border="2px" borderColor="rgba(0, 0, 0, 0.5)" paddingBottom={6} paddingLeft={16} paddingRight={16} paddingTop={6} variant="outline">Xem tất cả</Button></div>
        </div>
        <Spacer height={60} />
        <div className="product-grid">
          {justForYouItems.map((e, index) => <ProductCard {...e} key={index} />)}
        </div>
        <Spacer height={60} />
      </div>
    </ChakraProvider >
  );
}
