import { ChooseProductModal } from '@/components/shared/modals/choose-product-modal';
import axios from 'axios';
import { headers } from 'next/headers';
import { MobileProductModal } from '@/components/shared/modals/choose-mobile-product-form';
import { Api } from '@/services/api-client';

export default async function ProductModalPage(props: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(props.params as any);
  const { id } = resolvedParams;

  let product: any = null;

  const requestHeaders = await headers();
  const userAgent = requestHeaders.get('user-agent') || '';
  const isMobile = /mobile/i.test(userAgent);

  try {
    const response = await Api.products.search({id: String(id)});
    product = response[0]
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  if (isMobile) {
    return <MobileProductModal product={product}/>;
  } else {
    return <ChooseProductModal product={product} />;
  }
}