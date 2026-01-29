import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const images = [
  'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1920&q=80',
  'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1920&q=80',
  'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=1920&q=80',
  'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1920&q=80',
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={src}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            )}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-8 md:px-16">
          <div className="flex max-w-2xl flex-col gap-12">
            {/* Logo */}
            <div
              className={cn(
                'transform transition-all duration-1000 ease-out',
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              )}
            >
              <div className="relative h-32 w-32 flex items-center justify-center overflow-hidden rounded-3xl border-4 border-white shadow-2xl md:h-40 md:w-40 bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-5xl md:text-6xl font-bold text-white">НГ</span>
              </div>
            </div>

            <div
              className={cn(
                'transform transition-all duration-1000 delay-300 ease-out',
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              )}
            >
              <div className="space-y-4">
                <p className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  НовкиГрамм
                </p>
                <p className="text-xl font-light text-white/90 md:text-2xl lg:text-3xl">
                  Современный мессенджер для личных переписок
                </p>
                <p className="text-lg text-white/70 md:text-xl max-w-xl">
                  Регистрируйтесь по номеру телефона или email. Общайтесь безопасно и удобно.
                </p>
                <div className="flex gap-4 pt-6">
                  <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                    Начать общение
                  </button>
                  <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/20 transition-colors">
                    Узнать больше
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'h-1 transition-all duration-300',
              currentIndex === index ? 'w-12 bg-white' : 'w-8 bg-white/40 hover:bg-white/60'
            )}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}