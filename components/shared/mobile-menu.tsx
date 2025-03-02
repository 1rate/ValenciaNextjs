"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { GetCake } from "./get-cake";
import { Title } from "./title";

export const MobileMenu: React.FC = () => {
  return (
    <Sheet >
      {/* Триггер открытия sheet: иконка Menu */}
      <SheetTrigger asChild>
        <button className="p-2 md:hidden">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#F4F1EE]">
        {/* Шапка: логотип слева и кнопка закрытия справа */}
        <SheetHeader className="flex items-start justify-between">
        <SheetTitle>
          <div className="flex items-center gap-4">
            <Image
              src="/assets/images/box.png"
              alt="Логотип"
              width={35}
              height={35}
            />
            <SheetDescription>
            <span className="text-2xl font-extrabold uppercase text-black">Valencia</span>
            </SheetDescription>
          </div>
          </SheetTitle>
          </SheetHeader>
        {/* Разделитель */}
        <hr className="my-8" />

        <nav className="flex flex-col space-y-4">
        <Title text="Меню" size="md" className="font-extrabold" />
          <Link href="/about" className="text-lg">
            О нас
          </Link>
          
        </nav>
        <hr className="my-8" />
        <div className="flex flex-col mt-14">
        <GetCake />
        </div>
      </SheetContent>
    </Sheet>
  );
};
