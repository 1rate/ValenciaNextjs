'use client';          

import { PopoverContent, PopoverTrigger, Popover } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormProvider, useForm } from "react-hook-form";
import { useOrderSubmission } from "../hooks/use-order-submission";
import { CheckoutFormValues } from "./checkout-form-values";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema } from "./checkout-form-values";

export const GetCake: React.FC = () => {
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
const { submitting, submitOrder } = useOrderSubmission();
  return ( 

              // <div className="flex flex-col lg:flex-row gap-6">
              //   {/* Левая часть (форма и корзина) */}
              //   <div className="flex flex-col gap-6 flex-1 mb-10">
              //     <CheckoutCart
              //       onClickCountButton={onClickCountButton}
              //       removeCartItem={removeCartItem}
              //       items={items}
              //       loading={loading}
              //     />
              //     <CheckoutPersonalForm
              //       className={loading ? 'opacity-40 pointer-events-none' : ''}
              //     />
              //   </div>
              //   {/* Правая часть (боковая панель) */}
              //   <div className="w-full lg:w-[450px]">
              //     <CheckoutSidebar
              //       totalAmount={totalAmount}
              //       loading={loading || submitting}
              //     />
              //   </div>
              // </div>
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitOrder)}>          
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="default">Закзать тортик</Button>
          </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-7">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Тортик сделанный для вас!</h4>
          </div>
          <div className="grid gap-5">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Имя</Label>
              <Input
                id="Имя"
                placeholder="Введите ваше имя"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Фамилия</Label>
              <Input
                id="Фамилия"
                placeholder="Введите вашу фамилию"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Телефон</Label>
              <Input
                id="Телефон"
                placeholder="Введите ваш телефон"
                className="col-span-2 h-8"
              />
            </div>
            <div className="items-center gap-4">
            <Button type="submit" variant="outline">Отправить</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
    </form>
    </FormProvider>

);
};