import React from 'react';
import Image from 'next/image';
import { useCart } from '../hooks/useCart';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItemProps {
  item: Product;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { userCart } = useCart();

  const handleRemoveToCart = () => {
    console.log(userCart);
  };

  return (
    <div className="rounded-lg flex shadow-ShadowCard items-start lg:w-full">
      <div className=" flex-shrink-0 h-[10vh] w-[20vh] lg:w-[20rem] my-6 ml-10 lg:h-[10rem]">
        <Image
          src={item.image}
          alt=""
          width={120}
          height={120}
          className="w-[6rem]"
        />
      </div>
      <div className="relative text-start ml-3 p-3 bottom-3 right-12 ">
        <div className=" relative bottom-5 top-2 sm:right-[10rem] sm:mt-[1rem]">
          <h4 className="text-3xl font-semibold text-black ">{item.name}</h4>
          <p className="text-3xl font-bold text-black">{item.price}</p>
        </div>
        <button
          className="bg-amber-800 rounded-lg relative sm:right-[10rem] sm:bottom-10 h-15 w-[10rem] mt-8 sm:mt-12  p-2 flex-col justify-center"
          onClick={handleRemoveToCart}
        >
          <h2 className="font-semibold text-yellow-100">Remove from cart</h2>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
