'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { CheckoutSidebar } from '@/components/shared/checkout-sidebar';
import { CheckoutPersonalForm } from '@/components/shared/checkout';
import { Container } from '@/components/shared/container';
import { Title } from '@/components/shared/title';
import { CheckoutCart } from '@/components/shared/checkout';
import { checkoutFormSchema, CheckoutFormValues } from '@/components/shared/checkout-form-values';
import { useCart } from '@/store/cart';
// import { createOrder } from '@/app/actions';
// import toast from 'react-hot-toast';
import React, { useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { CartItem } from '@/store/cart';
// import { useSession } from 'next-auth/react';
// import { Api } from '@/shared/services/api-client';
import { useOrderSubmission } from '@/components/hooks/use-order-submission';

export default function CheckoutPage() {
  // const [submitting, setSubmitting] = React.useState(false);
  // const { data: session } = useSession();
  const hydrateCart = useCart((state) => state.hydrateCart);

  useEffect(() => {
    hydrateCart();
  }, [hydrateCart]);


  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      // address: '',
      // comment: '',
    },
  });


  // const onSubmit = async (data: CheckoutFormValues) => {
  //   console.log(123)
  //   try {
  //     setSubmitting(true);
      

  //   const cartItemsStr = Cookies.get('cartItems');
  //   console.log(cartItemsStr)
  //   let orderItems: CartItem[] = [];
  //   if (cartItemsStr) {
  //     try {
  //       orderItems = JSON.parse(cartItemsStr);
  //     } catch (error) {
  //       console.error("Ошибка при парсинге товаров корзины из cookies", error);
  //     }
  //   }

  //   const formattedOrderItems = orderItems.map((item) => ({
  //     product: item.id, // сервер ожидает id продукта в поле "product"
  //     quantity: item.quantity,
  //     // можно добавить другие поля, если требуется, например, price, если API это требует
  //   }));
  //   const orderData = {
  //     ...data,
  //     order_items: formattedOrderItems,
  //   };

    
  //     const response = await fetch('http://127.0.0.1:8000/api/orders/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(orderData),
  //     });
      
  //     console.log(response)
  //     if (response.ok) {
  //       toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
  //         icon: '✅',
  //       });
  
  //       const result = await response.json();
  //       const url = result.url;
  //       if (url) {
  //         location.href = url;
  //       }
  //     } else {
  //       const errorData = await response.json();
  //       console.error('Ошибка сервера:', errorData);
  //       toast.error('Ошибка при оформлении заказа: ' + JSON.stringify(errorData));
  //     }
  //   } catch (error) {
  //     console.error('Ошибка сети:', error);
  //     alert('Ошибка сети при оформлении заказа.');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
  
  
  // const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    useCart.getState().updateItemQuantity(id, newQuantity);
  };
  const { submitting, submitOrder } = useOrderSubmission();
  const { totalAmount, items, removeCartItem, loading } = useCart();

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitOrder)}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Левая часть (форма и корзина) */}
            <div className="flex flex-col gap-6 flex-1 mb-10">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />
              <CheckoutPersonalForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
            </div>
            {/* Правая часть (боковая панель) */}
            <div className="w-full lg:w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}