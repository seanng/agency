'use client';

import { useCart } from 'react-use-cart';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  useEffect(() => {
    if (isOpen) {
      // First make visible, then trigger animation
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      // First remove animation, then hide after transition
      setIsAnimating(false);
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-[400px] max-w-[90vw] bg-white z-[70] shadow-xl transition-transform duration-300 ease-out ${
        isAnimating ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-light tracking-wide">{t('navigation.cart')}</h2>
            <button
              onClick={onClose}
              className="text-3xl hover:opacity-60 transition-opacity p-1 -m-1"
            >
              ×
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {isEmpty ? (
              <p className="text-center text-gray-500 mt-10">购物车是空的</p>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 pb-4 border-b animate-fadeIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-light mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">¥{item.price}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateItemQuantity(item.id, (item.quantity || 1) - 1)}
                          className="w-6 h-6 border border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateItemQuantity(item.id, (item.quantity || 1) + 1)}
                          className="w-6 h-6 border border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-sm text-red-500 hover:text-red-700 transition-colors"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {!isEmpty && (
            <div className="border-t p-6">
              <div className="flex justify-between mb-4">
                <span className="text-lg">合计</span>
                <span className="text-lg font-medium">¥{cartTotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-all duration-200 hover:shadow-lg">
                结算
              </button>
              <button
                onClick={emptyCart}
                className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                清空购物车
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}