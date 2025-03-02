'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ChooseProductForm } from '../choose-product-form';
import { useCart } from '@/store/cart';
import { Product } from '@/interfaces/types';
import { ChooseMobileProductDrawer } from '../choose-mobile-product-modal';
import { useRouter } from 'next/navigation';
interface Props {
  product: Product;
  onSubmit?: VoidFunction;
}

export const MobileProductModal: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const addCartItem = useCart((state) => state.addCartItem);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    setLoading(true);
    try {

      const cartItem = {
        id: product.id,
        name: product.name,
        imageUrl: product.image,
        price: Number(product.price), 
        quantity: 1,
        description: product.description,
      };

      addCartItem(cartItem);

      toast.success(`${product.name} добавлена в корзину`);

      _onSubmit?.();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChooseMobileProductDrawer product={product} onSubmit={onSubmit} />
  );
};
