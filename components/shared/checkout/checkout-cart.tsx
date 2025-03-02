import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { Product } from '@/interfaces/types';
// import { getCartItemDetails } from '@/shared/lib';
// import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
// import { CartStateItem } from '@/shared/lib/get-cart-details';
import { CheckoutItemSkeleton } from '../checkout-items-skeleton';
interface Props {
  items: any[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
  
}) => {
  
  return (
    
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={item.description}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))
            }
      </div>
    </WhiteBlock>
  );
};
