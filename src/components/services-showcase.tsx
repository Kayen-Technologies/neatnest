"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { ServiceDetail } from "@/lib/data";
import { Reel } from "@/components/reel";
import { ScheduleButton } from "@/components/schedule-button";

export function ServicesShowcase({ services }: { services: ServiceDetail[] }) {
  const [selectedService, setSelectedService] = useState<{
    service: ServiceDetail;
    initialIndex: number;
  } | null>(null);

  const openLightbox = (service: ServiceDetail, initialIndex: number) => {
    setSelectedService({ service, initialIndex });
  };

  const closeLightbox = () => setSelectedService(null);

  return (
    <>
      {services.map((s, i) => {
        const allImages = [s.feature, ...s.gallery];

        return (
          <section
            key={s.id}
            className={i % 2 === 1 ? "bg-[#F5EFE6]" : "bg-background"}
          >
            <div className="shell py-16 md:py-24">
              <h2 className="font-display text-[clamp(1.8rem,3.8vw,2.9rem)] font-medium leading-[1.1] tracking-[-0.015em] text-ink">
                {s.name}
              </h2>
              <div className="mt-6 max-w-4xl space-y-4">
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="text-[15px] leading-[1.8] text-[#5E5E5E]">
                    {p}
                  </p>
                ))}
              </div>

              {/* Mobile carousel */}
              <div className="mt-10 md:hidden">
                <Reel itemClassName="w-full">
                  {allImages.map((src, k) => (
                    <div
                      key={k}
                      onClick={() => openLightbox(s, k)}
                      className="group relative aspect-[4/5] w-full overflow-hidden rounded-[20px] cursor-pointer"
                    >
                      <Image
                        src={src}
                        alt={`${s.name} detail ${k + 1}`}
                        fill
                        sizes="100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <Maximize2 className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </Reel>
              </div>

              {/* Desktop collage */}
              <div className="mt-10 hidden gap-3 md:grid md:grid-cols-5 md:gap-4">
                <div
                  onClick={() => openLightbox(s, 0)}
                  className="group relative min-h-[380px] overflow-hidden rounded-[15px] md:col-span-3 cursor-pointer"
                >
                  <Image
                    src={s.feature}
                    alt={s.name}
                    fill
                    sizes="66vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <Maximize2 className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="grid grid-rows-3 gap-3 md:col-span-2 md:gap-4">
                  {s.gallery.map((src, k) => (
                    <div
                      key={k}
                      onClick={() => openLightbox(s, k + 1)}
                      className="group relative min-h-[220px] overflow-hidden rounded-[15px] cursor-pointer"
                    >
                      <Image
                        src={src}
                        alt={`${s.name} detail ${k + 1}`}
                        fill
                        sizes="25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <Maximize2 className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <ScheduleButton className="inline-flex items-center rounded-full bg-brown-dark px-7 py-3.5 text-[15px] font-medium text-cream transition-colors hover:bg-brown-dark">
                  Schedule a Visit
                </ScheduleButton>
              </div>
            </div>
          </section>
        );
      })}

      {/* Service Lightbox Modal */}
      {selectedService && (
        <ServiceLightboxModal
          service={selectedService.service}
          initialIndex={selectedService.initialIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

function ServiceLightboxModal({
  service,
  initialIndex,
  onClose,
}: {
  service: ServiceDetail;
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const gallery = [
    { image_url: service.feature },
    ...service.gallery.map((url) => ({ image_url: url })),
  ];

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
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
  }, [gallery.length]);

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
            alt={`${service.name} photo ${currentImageIndex + 1}`}
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
              {service.name}
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
