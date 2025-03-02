import { Container } from "@/components/shared/container";
import { ProductCard } from "@/components/shared/product-card";
import { Api } from "@/services/api-client";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  let product: any = null;

  try {
    const response = await Api.products.search({id: String(id)});
    product = response[0]
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }

  // Если продукт не найден, можно вывести сообщение об ошибке или альтернативное содержимое
  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        imageUrl={product.image}
        price={product.price}
        ingredients={product.description}
      />
    </Container>
  );
}
