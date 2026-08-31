"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { BeforeAfter } from "@/lib/data";

export function SpacesShowcase({ pairs }: { pairs: BeforeAfter[] }) {
  const [selectedPair, setSelectedPair] = useState<{
    pair: BeforeAfter;
    initialIndex: number;
  } | null>(null);

  const openLightbox = (pair: BeforeAfter, initialIndex: number) => {
    setSelectedPair({ pair, initialIndex });
  };

  const closeLightbox = () => setSelectedPair(null);

  return (
    <>
      <div className="shell py-16 md:py-24">
        <div className="space-y-16 md:space-y-17">
          {pairs.map((pair, i) => (
            <div key={pair.label} className="space-y-6 md:space-y-8">
              {/* Desktop grid */}
              <div
                className={`hidden md:grid grid-cols-2 gap-3 md:w-3/5 md:gap-5 lg:w-1/2 ${i % 2 === 1 ? "md:ml-auto" : ""
                  }`}
              >
                <Figure
                  src={pair.before}
                  alt={`${pair.label} before`}
                  label="Before"
                  priority={i === 0}
                  onClick={() => openLightbox(pair, 0)}
                />
                <Figure
                  src={pair.after}
                  alt={`${pair.label} after`}
                  label="After"
                  priority={i === 0}
                  onClick={() => openLightbox(pair, 1)}
                />
              </div>

              {/* Mobile carousel */}
              <MobilePairCarousel
                pair={pair}
                priority={i === 0}
                onImageClick={(idx) => openLightbox(pair, idx)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pair Lightbox Modal */}
      {selectedPair && (
        <PairLightboxModal
          pair={selectedPair.pair}
          initialIndex={selectedPair.initialIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

function PairLightboxModal({
  pair,
  initialIndex,
  onClose,
}: {
  pair: BeforeAfter;
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const gallery = [
    { image_url: pair.before, label: "Before" },
    { image_url: pair.after, label: "After" },
  ];

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/92 backdrop-blur-md p-4 sm:p-6 md:p-8 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Close Button */}
      <div
        className="w-full flex justify-end z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="p-2.5 text-white/80 hover:text-white transition-all hover:scale-110 active:scale-95 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Image Viewer Container */}
      <div
        className="relative group max-w-6xl w-full flex-1 flex flex-col items-center justify-center min-h-0"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Numbering - Top of Image */}
        {gallery.length > 0 && (
          <div className="flex-shrink-0 mb-4 md:mb-6 py-2 px-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/5 text-white/90 text-sm font-bold tracking-[0.2em] uppercase">
            {currentImageIndex + 1} <span className="mx-2 text-[#6B4F3A]">/</span> {gallery.length}
          </div>
        )}

        <div className="relative flex-1 flex items-center justify-center w-full min-h-0">
          <img
            key={gallery[currentImageIndex].image_url}
            src={gallery[currentImageIndex].image_url}
            alt={`${pair.label} ${gallery[currentImageIndex].label}`}
            className="w-auto h-auto max-w-[95%] md:max-w-[80%] max-h-[70vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm animate-in zoom-in-95 duration-500"
          />
        </div>

        {/* Navigation - Bottom of Image Center */}
        <div className="flex-shrink-0 mt-6 md:mt-10 flex items-center gap-6 md:gap-16">
          <button
            type="button"
            onClick={handlePrev}
            className="p-2 md:p-3 text-white hover:text-[#6B4F3A] transition-all hover:scale-110 active:scale-95 bg-white/5 rounded-full cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div className="flex flex-col items-center">
            <h3 className="text-white font-extrabold text-sm md:text-xl uppercase tracking-tighter mb-1 text-center line-clamp-1">
              {gallery[currentImageIndex].label}
            </h3>
            <div className="h-1 w-10 bg-[#6B4F3A] rounded-full mt-1" />
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="p-2 md:p-3 text-white hover:text-[#6B4F3A] transition-all hover:scale-110 active:scale-95 bg-white/5 rounded-full cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>

      <div className="h-2" />
    </div>
  );
}

function MobilePairCarousel({
  pair,
  priority,
  onImageClick,
}: {
  pair: BeforeAfter;
  priority?: boolean;
  onImageClick?: (index: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;
    if (maxScrollLeft <= 0) return;
    const scrollProgress = scrollLeft / maxScrollLeft;
    setActiveIndex(Math.round(scrollProgress * 1));
  };

  return (
    <div className="md:hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="-mx-6 flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-10 scroll-pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="w-[80vw] flex-none snap-start">
          <Figure
            src={pair.before}
            alt={`${pair.label} before`}
            label="Before"
            priority={priority}
            onClick={() => onImageClick?.(0)}
          />
        </div>
        <div className="w-[80vw] flex-none snap-start">
          <Figure
            src={pair.after}
            alt={`${pair.label} after`}
            label="After"
            priority={priority}
            onClick={() => onImageClick?.(1)}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {[0, 1].map((idx) => (
          <div
            key={idx}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${activeIndex === idx ? "bg-[#222B4ACC]" : "bg-[#222B4A33]"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

function Figure({
  src,
  alt,
  label,
  priority,
  onClick,
}: {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  onClick?: () => void;
}) {
  return (
    <figure
      onClick={onClick}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-[12px] md:rounded-[20px] cursor-pointer"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 85vw, 32vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        priority={priority}
      />
      <span className="absolute inset-0 flex items-end justify-center bg-black/20 pb-6 text-xs text-white transition-colors group-hover:bg-black/35 md:pb-10 md:pt-10 md:text-sm">
        {label}
      </span>
      {/* Subtle zoom indicator on hover */}
      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <Maximize2 className="h-4 w-4" />
      </div>
    </figure>
  );
}
