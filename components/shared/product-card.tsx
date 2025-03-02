// Разобрать насер 


'use client';

import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui/button';
import { Plus, Minus } from 'lucide-react';
import { useCart, CartItem } from '@/store/cart';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  className,
}) => {
  const { addCartItem, updateItemQuantity, removeCartItem, items } = useCart();
  const cartItem = items.find((item) => item.id === id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    // console.log(ingredients)
    const item: CartItem = {
      id,
      name,
      imageUrl,
      price,
      quantity: 1,
      description: ingredients,
    };
    addCartItem(item);
  };

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (cartItem) {
      updateItemQuantity(id, cartItem.quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (cartItem) {
      if (cartItem.quantity === 1) {
        removeCartItem(id);
      } else {
        updateItemQuantity(id, cartItem.quantity - 1);
      }
    }
  };
  

  const DESCRIPTION_THRESHOLD = 20;
  const isLongDescription = ingredients.length > DESCRIPTION_THRESHOLD;
  const displayedDescription = isLongDescription
    ? ingredients.substring(0, DESCRIPTION_THRESHOLD) + '…'
    : ingredients;


  return (
    <div className={className}>
      {/* Область с информацией о товаре, по клику на которую происходит переход */}
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[292px] h-[215px] transition-transform duration-300 hover:translate-y-1 rounded-sm" src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        {/* <p className="text-sm text-gray-400">{ingredients}</p> */}
        <p className="text-sm text-gray-400">
          {displayedDescription}{' '}
          {isLongDescription && (
            <span className="text-primary ml-1 underline">
              Подробнее...
            </span>
          )}
        </p>
      </Link>

      {/* Область с ценой и кнопками добавления/изменения количества */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px] font-bold">
          <b>{Number(price)} ₽</b>
        </span>

        {cartItem ? (
          <div className="flex items-center">
            <Button
              onClick={handleDecrement}
              variant="secondary"
              className="px-3 py-1 text-primary transition-colors duration-300 hover:bg-primary/30"
            >
              <Minus size={16} />
            </Button>
            <span className="mx-2 font-bold">{cartItem.quantity}</span>
            <Button
              onClick={handleIncrement}
              variant="secondary"
              className="px-3 py-1 text-primary transition-colors duration-300 hover:bg-primary/30"
            >
              <Plus size={16} />
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            variant="secondary"
            className="text-primary font-bold transition-colors duration-300 hover:bg-primary/30"
          >
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        )}
      </div>
    </div>
  );
};
