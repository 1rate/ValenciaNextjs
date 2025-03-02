'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { CheckoutFormValues } from '@/components/shared/checkout-form-values';
import { CartItem } from '@/store/cart';

const ORDER_LIMIT_KEY = 'orderHistory';
const ORDER_LIMIT = 100; // Максимум 2 заказа
const ORDER_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

/**
 * Проверяет, можно ли оформить новый заказ, учитывая лимит заказов за 24 часа.
 * @returns {boolean} Если лимит не превышен, возвращает true, иначе false.
 */
function checkOrderLimit(): boolean {
  const now = Date.now();
  const ordersRaw = localStorage.getItem(ORDER_LIMIT_KEY);
  let orders: number[] = ordersRaw ? JSON.parse(ordersRaw) : [];

  // Фильтруем заказы, оставляем только за последние 24 часа
  orders = orders.filter((ts) => now - ts < ORDER_LIMIT_WINDOW);

  if (orders.length >= ORDER_LIMIT) {
    return false;
  }

  // Добавляем текущую отметку времени и сохраняем обратно
  orders.push(now);
  localStorage.setItem(ORDER_LIMIT_KEY, JSON.stringify(orders));
  return true;
}

export function useOrderSubmission() {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const submitOrder = async (data: CheckoutFormValues): Promise<void> => {
    // Клиентская проверка лимита заказов
    if (!checkOrderLimit()) {
      toast.error('Превышено количество заказов за последние 24 часа.');
      return;
    }

    try {
      setSubmitting(true);

      // Получаем данные корзины из cookies
      const cartItemsStr = Cookies.get('cartItems');
      let orderItems: CartItem[] = [];
      if (cartItemsStr) {
        try {
          orderItems = JSON.parse(cartItemsStr);
        } catch (error) {
          console.error('Ошибка при парсинге товаров корзины из cookies', error);
          toast.error('Ошибка при обработке корзины. Попробуйте позже.');
          return;
        }
      }

      const formattedOrderItems = orderItems.map((item) => ({
        product: item.id, // сервер ожидает id продукта в поле "product"
        quantity: item.quantity,
      }));

      // Формируем данные заказа
      const orderData = {
        ...data,
        order_items: formattedOrderItems,
      };

      // Отправляем запрос на API
      const response = await fetch('http://127.0.0.1:8000/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast.success('Заказ успешно оформлен! 📝 Переход на оплату...', { icon: '✅' });
        const result = await response.json();
        const url: string | undefined = result.url;
        console.log(url)
        // Очистка корзины после успешного заказа
        Cookies.remove('cartItems');
        // Редирект на главную страницу через 200 мс
        setTimeout(() => {
        location.href = '/';
        }, 300);
        
      } else {
        const errorData = await response.json();
        console.error('Ошибка сервера:', errorData);
        toast.error('Ошибка при оформлении заказа: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      toast.error('Ошибка сети при оформлении заказа.');
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, submitOrder };
}
