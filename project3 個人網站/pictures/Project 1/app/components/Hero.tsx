import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="東南亞香氛背景圖"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">移工香氛故事</h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          來自東南亞的香氛記憶，串連起跨越國界的思念與溫暖
        </p>
      </div>
    </div>
  );
}
