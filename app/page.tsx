import Hero from "@/components/UI/hero/hero";
import Products from "@/components/UI/products/products";

export default function HomePage() {
  return (
    <div className="w-full max-w-[1400px] h-full m-auto space-y-10">
      <Hero />
      <Products />
    </div>
  );
}
