'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import ProductCard from './ProductCard';

// Mock products data
const allProducts = [
  {
    id: 1,
    titleKey: 'classicTee',
    price: '¥99',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 2,
    titleKey: 'streetGraffiti',
    price: '¥129',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 3,
    titleKey: 'minimalist',
    price: '¥89',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 4,
    titleKey: 'retroStripe',
    price: '¥119',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 5,
    titleKey: 'trendyLetter',
    price: '¥139',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 6,
    titleKey: 'blackClassic',
    price: '¥99',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 7,
    titleKey: 'artPattern',
    price: '¥149',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 8,
    titleKey: 'sportQuickDry',
    price: '¥159',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 9,
    titleKey: 'japaneseMinimal',
    price: '¥109',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 10,
    titleKey: 'westernStreet',
    price: '¥169',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 11,
    titleKey: 'pureCotton',
    price: '¥89',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 12,
    titleKey: 'limitedEdition',
    price: '¥299',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 13,
    titleKey: 'gradient',
    price: '¥139',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 14,
    titleKey: 'retroPrint',
    price: '¥129',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 15,
    titleKey: 'simpleLines',
    price: '¥119',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 16,
    titleKey: 'hiphopLoose',
    price: '¥179',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 17,
    titleKey: 'summerThin',
    price: '¥79',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 18,
    titleKey: 'heavyCotton',
    price: '¥149',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 19,
    titleKey: 'creativePattern',
    price: '¥139',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 20,
    titleKey: 'businessCasual',
    price: '¥159',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 21,
    titleKey: 'colorBlock',
    price: '¥169',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 22,
    titleKey: 'pocketDetail',
    price: '¥109',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 23,
    titleKey: 'embroidered',
    price: '¥189',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 24,
    titleKey: 'organicCotton',
    price: '¥199',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 25,
    titleKey: 'customized',
    price: '¥219',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 26,
    titleKey: 'vintageWashed',
    price: '¥149',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 27,
    titleKey: 'fluorescent',
    price: '¥139',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 28,
    titleKey: 'classicVNeck',
    price: '¥99',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 29,
    titleKey: 'roundNeck',
    price: '¥89',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
  {
    id: 30,
    titleKey: 'limitedSeason',
    price: '¥259',
    image: 'https://placehold.co/300x400/f0f0f0/333333',
  },
];

const PRODUCTS_PER_PAGE = 6;

export default function ProductGrid() {
  const t = useTranslations('products');
  const [displayedProducts, setDisplayedProducts] = useState<
    typeof allProducts
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initial load
  useEffect(() => {
    const initialProducts = allProducts.slice(0, PRODUCTS_PER_PAGE);
    setDisplayedProducts(initialProducts);
  }, []);

  // Load more products
  const loadMoreProducts = useCallback(() => {
    if (isLoading || !hasMore) return;

    const startIndex = currentPage * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    if (startIndex >= allProducts.length) {
      setHasMore(false);
      return;
    }

    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      const newProducts = allProducts.slice(startIndex, endIndex);
      setDisplayedProducts((prev) => [...prev, ...newProducts]);
      setCurrentPage((prev) => prev + 1);
      setIsLoading(false);

      if (endIndex >= allProducts.length) {
        setHasMore(false);
      }
    }, 1000);
  }, [currentPage, isLoading, hasMore]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !hasMore) return;

      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts, isLoading, hasMore]);

  return (
    <>
      <section
        id="products"
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px] mb-20"
      >
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={t(product.titleKey)}
            price={product.price}
            image={product.image}
          />
        ))}
      </section>

      {isLoading && (
        <div className="text-center py-[60px] text-gray-600 text-base font-light tracking-[1px]">
          {t('loading')}
        </div>
      )}
    </>
  );
}
