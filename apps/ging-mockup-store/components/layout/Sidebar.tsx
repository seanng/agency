'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useCart } from 'react-use-cart';
import { useState } from 'react';
import CartDrawer from '@/components/cart/CartDrawer';

export default function Sidebar() {
  const t = useTranslations();
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed top-0 right-0 w-[130px] h-screen bg-white border-l border-black z-50 flex-col items-center px-[28px] py-[40px]">
        <div className="mb-[60px] flex flex-col items-center w-full">
          <Link
            href="/"
            className="text-2xl font-extralight text-black no-underline tracking-[2px] block mb-2.5"
            style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
          >
            {t('site.title').slice(0, 2)}
          </Link>
          <p
            className="text-[10px] text-black font-light tracking-[1px]"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {t('site.tagline')}
          </p>
        </div>

        <ul className="list-none mb-10 flex flex-col items-center w-full">
          <li className="mb-[30px]">
            <Link
              href="/products"
              className="text-black font-light text-lg no-underline relative block tracking-[1px] py-2 hover:before:opacity-100 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-black before:opacity-0 before:transition-opacity before:duration-300"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {t('navigation.products')}
            </Link>
          </li>
        </ul>

        <div className="mt-auto pt-5 border-t border-black/10">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center justify-center no-underline text-black text-lg font-light gap-2.5 hover:text-black/80 transition-colors w-full cursor-pointer"
          >
            <div className="relative">
              <span className="text-xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-normal">
                  {totalItems}
                </span>
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden flex fixed bottom-0 left-0 right-0 h-[70px] bg-white border-t border-black z-50 items-center justify-between px-5">
        <div className="flex items-baseline gap-[30px]">
          <Link
            href="/"
            className="text-lg font-extralight text-black no-underline tracking-[2px]"
          >
            {t('site.title').slice(0, 2)}
          </Link>
          <Link
            href="/products"
            className="text-black font-light text-base no-underline tracking-[1px]"
          >
            {t('navigation.products')}
          </Link>
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center no-underline text-black text-xl relative"
        >
          <span>🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-normal">
              {totalItems}
            </span>
          )}
        </button>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
