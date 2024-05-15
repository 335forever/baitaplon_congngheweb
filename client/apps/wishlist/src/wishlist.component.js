import './index.css'
import item1 from '../assets/images/item1.svg'
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

  return (
    <ChakraProvider>
      <div id='wrapper'>
        <div className='title'>
          <div>Wishlist (4)</div>
          <div><Button>Add to Wishlist</Button></div>
        </div>
        <Spacer height={60} />
        <div className="product-grid">
          {wishlistItems.map((e, index) => <ProductCard {...e} key={index} />)}
        </div>
      </div>
    </ChakraProvider >
  );
}
