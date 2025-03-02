import { cn } from '@/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui/button';
import Link from "next/link";
interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
  ingredients: string;
}


export const ChooseProductForm: React.FC<Props> = ({
  
  name,
  imageUrl,
  price,
  onSubmit,
  className,
  ingredients,
  loading,
  
}) => {

  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-full h-[500px] rounded-sm"
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-sm text-gray-400">{ingredients}</p>
        <Button
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-72">
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};