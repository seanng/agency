'use client';

import { CartProvider } from 'react-use-cart';

interface CartProviderWrapperProps {
  children: React.ReactNode;
}

export default function CartProviderWrapper({ children }: CartProviderWrapperProps) {
  return <CartProvider>{children}</CartProvider>;
}