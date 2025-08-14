'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import ProductCard from './ProductCard';

// Mock products data - Luxury watches from Wristcheck
const allProducts = [
  {
    id: 1,
    title: 'Richard Mille RM65-01 RG Carbon TPT',
    price: '¥2,116,600',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/c_limit,w_992/f_auto/q_auto/v1751013974/product/0b76a8cfc2050c5e459aed2aec089cc8/a3701875564ecbab91abf2f2d3aad0e2?_a=BAVAfVDW0',
  },
  {
    id: 2,
    title: 'Audemars Piguet Royal Oak Offshore Ceramic Blue Dial 44mm',
    price: '¥295,200',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1709889440/product/56e826002e65214668df829c2ffd4005/7bf6cf676d94ff8a0e1aa29fb5f68fdb',
  },
  {
    id: 3,
    title:
      'Patek Philippe Calatrava Pilot Travel Time Rose Gold Brown Dial 42mm',
    price: '¥268,992',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1737962087/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/5d7e534ff460b8117918b98de7df75b5',
  },
  {
    id: 4,
    title: 'Patek Philippe Aquanaut Chronograph White Gold Green Dial 42mm',
    price: '¥903,600',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1721618454/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/862a80be17f8e95578cef7bdfc0a8c1a',
  },
  {
    id: 5,
    title: 'Hublot Classic Fusion Rose Gold Green Dial 42mm',
    price: '¥84,960',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1703228006/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/e02ac4467eefa5ad8f5f9294bec2716c',
  },
  {
    id: 6,
    title: 'Patek Philippe Nautilus Chronograph Steel Black Dial 40mm',
    price: '¥676,750',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1697535547/cms/5/13/290/3300/3301/W01309_PP_0_01_e0e58ac063',
  },
  {
    id: 7,
    title: 'Rolex Explorer Steel Black Dial 39mm',
    price: '¥58,680',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1700040274/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/ffdaea6dca3d68e5d370bf854a24c137',
  },
  {
    id: 8,
    title: 'Jacob & Co. Casino Tourbillon Rose Gold Diamond Roulette Dial 44mm',
    price: '¥2,045,448',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1753440028/product/0b76a8cfc2050c5e459aed2aec089cc8/28859c4ea614934bbaac4e713d18e43c',
  },
  {
    id: 9,
    title: 'Patek Philippe Nautilus Travel Time Steel Black Dial 40mm',
    price: '¥824,494',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1700032408/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/f99a147c7215b8ea2dfa31bf6ddb2214',
  },
  {
    id: 10,
    title:
      'Rolex Datejust Yellow Gold & Steel Jubilee Champagne Palm Dial 36mm',
    price: '¥110,160',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1/product/ad921d60486366258809553a3db49a4a/482d243ca098dcfed58eb4c441cc4d2d',
  },
  {
    id: 11,
    title: 'Rolex Oyster Perpetual Steel Beige Dial 41mm',
    price: '¥88,106',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1749628563/product/0b76a8cfc2050c5e459aed2aec089cc8/7c9f15fb03ab3fd8822c1b33ed1ab43f',
  },
  {
    id: 12,
    title: 'Patek Philippe Nautilus Moonphase Steel Blue Dial 40mm',
    price: '¥849,226',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1722406601/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/b9e12c2e1702361c3910dd5df43ae025',
  },
  {
    id: 13,
    title: "Hermès Arceau L' Heure de la Lune White Gold Black Dial 43mm",
    price: '¥387,691',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1732588742/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/3f4f7062ab85b8e52c4a923cbc366048',
  },
  {
    id: 14,
    title: 'Rolex Oyster Perpetual Steel Blue Dial 34mm',
    price: '¥66,636',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1753954562/product/0b76a8cfc2050c5e459aed2aec089cc8/13114c74f9f9586e60f7f79563feeb20',
  },
  {
    id: 15,
    title: 'Rolex Oyster Perpetual Steel Pistachio Dial 41mm',
    price: '¥97,200',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1749628199/product/0b76a8cfc2050c5e459aed2aec089cc8/fe8af7017f788532793101ef464319a6',
  },
  {
    id: 16,
    title:
      'A. Lange & Söhne 1815 Rattrapante Perpetual Calendar Platinum Silver Dial 42mm',
    price: '¥962,093',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1698568869/cms/BUY/Inventory/A__Lange___So%CC%88hne/W00934_ALS_421_025/01_Product_Photo/W00934_ALS_421_025_01_ecfebb1398',
  },
  {
    id: 17,
    title: 'Rolex Daytona Rose Gold Black Dial 40mm',
    price: '¥307,418',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1705652665/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/74d8a932a2e6731a6912a2b4c1a18152',
  },
  {
    id: 18,
    title: 'Rolex Oyster Perpetual Steel Green Dial 41mm',
    price: '¥76,320',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1749004565/product/0b76a8cfc2050c5e459aed2aec089cc8/ca46276d524dc7b962038cfbeb6f2d2e',
  },
  {
    id: 19,
    title: 'Rolex Daytona Rose Gold Diamond Pink Dial 40mm',
    price: '¥1,151,748',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1754360022/product/0b76a8cfc2050c5e459aed2aec089cc8/598e89d13671ebe7308cbfdf17c27bc9',
  },
  {
    id: 20,
    title: 'Rolex Oyster Perpetual Steel Turquoise Dial 36mm',
    price: '¥113,760',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1723536619/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/4f326fff33cc5e7b085a8c3e87a20681',
  },
  {
    id: 21,
    title: 'Rolex Vintage Daytona "Big Red" Steel Black Dial 37mm',
    price: '¥835,999',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1754474144/product/0b76a8cfc2050c5e459aed2aec089cc8/2d762173262e8a31ec64f06f1e5c4ed4',
  },
  {
    id: 22,
    title: 'Rolex Daytona White Gold Black Racing Dial 40mm',
    price: '¥232,582',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1705652759/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/bbd07ae6bbcee6e005aeade5a3107bc9',
  },
  {
    id: 23,
    title: 'Rolex Daytona Yellow Gold Green Dial "John Mayer" 40mm',
    price: '¥516,240',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1721807515/product/ad921d60486366258809553a3db49a4a/79011456aa720531d0d03862055cf6e9',
  },
  {
    id: 24,
    title:
      'Hublot Classic Fusion "Takashi Murakami All Black" Ceramic Black Dial 45mm',
    price: '¥355,385',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1754446165/product/0b76a8cfc2050c5e459aed2aec089cc8/77794cdd50cad0aa055de1165cd1e2e0',
  },
  {
    id: 25,
    title: 'Patek Philippe Cubitus Date Steel Green Dial 45mm',
    price: '¥659,520',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1733376449/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/c87e5e9c46b473ecd6eaf0c7175e3d1b',
  },
  {
    id: 26,
    title: 'Rolex Daytona Steel White Dial "Panda" 40mm',
    price: '¥265,910',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1720411816/product/ad921d60486366258809553a3db49a4a/001da426aa4d330bf484aa41a695c909',
  },
  {
    id: 27,
    title: 'Cartier Panthère de Cartier Yellow Gold White Dial 23mm',
    price: '¥123,242',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1729654683/product/3ac12dbd49b6f89dd1cb0945fdf2fb4b/49ca8f5241ccc0a7803154876b507f0a',
  },
  {
    id: 28,
    title: 'Tudor Black Bay Ceramic Blue Dial 41mm',
    price: '¥39,895',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1754362559/product/0b76a8cfc2050c5e459aed2aec089cc8/cb5208fbf9f6a55a20ea66e36aaaa8a7',
  },
  {
    id: 29,
    title:
      'Omega Speedmaster Professional Moonwatch "Silver Snoopy Award" Steel Silver Dial 42mm',
    price: '¥113,040',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1726810863/product/ad921d60486366258809553a3db49a4a/efe0ee87a00785e4b36a946b7e0bcf51',
  },
  {
    id: 30,
    title: 'Patek Philippe Vintage Nautilus Yellow Gold Diamond Blue Dial 37mm',
    price: '¥874,001',
    image:
      'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_2000,h_2000,g_center/f_auto/q_auto/v1754297887/product/0b76a8cfc2050c5e459aed2aec089cc8/66532ae126c899e8931ae7dadefd385e',
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
            title={product.title}
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
