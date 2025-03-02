

import { Container } from "@/components/shared/container";
import { Category } from "@/interfaces/types";
import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/top-bar";
import { Filters } from "@/components/shared/filters";
import { MobileFiltersToggle } from "@/components/shared/mobile-filters-toggled";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { MobileCartButton } from "@/components/shared/mobile-cart-button";
import { Api } from "@/services/api-client";
import axios from "axios";

export default async function Home() {
  let products: any[] = [];
  try {
      const response = await Api.products.search({name: ''});
      products = response
    } catch (error) {
      console.log(error);
    }

  const categoriesMap: { [key: string]: Category } = {};

  products.forEach((product: any) => {
    const catName = product.category;
    if (!catName) return;
    if (!categoriesMap[catName])
      categoriesMap[catName] = {
        id: catName,
        name: catName,
        image: product.image || "https://example.com/default-category-image.jpg",
        products: []
      };
    categoriesMap[catName].products.push(product);
  });

  const categories: Category[] = Object.values(categoriesMap);


  return (
    <>
      <Container className="mt-4 md:mt-10">
        <Title text="Главная" size="lg" className="font-extrabold" />
      </Container>
    
      <TopBar categories={categories} />

      <Container className="mt-4 md:mt-10 pb-14">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[80px]">
          {/* <div className="w-full md:w-[250px]">
            <div className="hidden md:block">
              <Filters />
            </div>
            <div className="md:hidden">
              <MobileFiltersToggle />
            </div>
          </div> */}

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
      <MobileCartButton />
    </>
  );
}
