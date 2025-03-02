"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { SortPopup } from "./sort-popup";
import { Title } from "./title";
import { MobileMenu } from "./mobile-menu";
import { GetCake } from "./get-cake";
interface Props {
  className?: string;
  hasSearch?: boolean;
  hasDop?: boolean;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasDop = true,
  className,
}) => {
  return (
    <header className={cn("border-b", className)}>
      {/* По умолчанию для мобильных flex-col (вертикальное расположение) */}
      <Container className="flex flex-col md:flex-row items-center justify-between py-8">
        {/* Блок логотипа и названия */}
        <div className="w-full flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-4">
              <Image
                src="/assets/images/box.png"
                alt="Empty cart"
                width={35}
                height={35}
              />
              <div>
                <h1 className="text-2xl uppercase font-black">Valencia</h1>
                <p className="text-sm text-gray-400 leading-3">
                  Лучшие тортики только для вас!
                </p>
              </div>
            </div>
          </Link>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
        {/* Блок поиска */}
        {hasSearch && (
          <div className="w-full mt-10 md:mt-0">
            <SearchInput />
          </div>
        )}
  {hasDop && (
          <div className="hidden md:flex w-full mt-6 md:mt-0 gap-20 items-center justify-start md:justify-end">
            {/* <Link href="/about">
              <Title text="О нас" size="md" className="font-bold" />
            </Link> */}
            <GetCake />
          </div>
        )}
      </Container>
    </header>
  );
};
