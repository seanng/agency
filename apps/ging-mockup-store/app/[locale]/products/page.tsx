import ProductGrid from '@/components/products/ProductGrid';

export default function ProductsPage() {
  return (
    <main className="md:mr-[130px] px-5 md:px-[60px] py-20 md:py-20 pb-[90px] md:pb-[60px] transition-[margin-right] duration-300">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-4xl font-light mb-10 tracking-wide">产品</h1>
        <ProductGrid />
      </div>
    </main>
  );
}