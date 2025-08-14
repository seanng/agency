'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useCart } from 'react-use-cart';

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
}

export default function ProductCard({
  id,
  title,
  price,
  image,
}: ProductCardProps) {
  const t = useTranslations('products');
  const [isAdding, setIsAdding] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Add item to cart with proper structure
    addItem({
      id: id.toString(),
      name: title,
      price: parseFloat(price.replace('¥', '')),
      image: image,
    }, 1);
    
    // Show success message
    setShowAddedMessage(true);
    setTimeout(() => {
      setIsAdding(false);
      setShowAddedMessage(false);
    }, 1500);
  };

  return (
    <div className="bg-white overflow-hidden transition-transform duration-[400ms] hover:-translate-y-2.5 group relative">
      <div className="relative w-full h-[400px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-[filter] duration-300 group-hover:brightness-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="py-10 text-left">
        <h3 className="text-xl font-light text-gray-800 mb-[15px] tracking-[1px]">
          {title}
        </h3>
        <p className="text-lg text-gray-600 mb-[30px] font-light">{price}</p>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="bg-transparent text-gray-800 border-0 border-b border-gray-800 pb-2.5 text-sm cursor-pointer transition-all duration-300 uppercase tracking-[2px] font-light relative hover:pr-5 after:content-['→'] after:absolute after:right-0 after:top-0 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdding ? '...' : t('addToCart')}
        </button>
      </div>
      
      {/* Success message overlay */}
      {showAddedMessage && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center transition-opacity duration-300">
          <div className="text-white text-center px-4">
            <div className="text-3xl mb-2">✓</div>
            <p className="text-sm font-light tracking-wider">
              {t('addedToCart', { productName: title })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
