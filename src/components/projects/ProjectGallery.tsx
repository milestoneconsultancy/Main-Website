import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images && images.length > 0;
  const count = images.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
  }, [count]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
  }, [count]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  if (!hasImages) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 text-muted-foreground">
        <div className="text-center">
          <ImageIcon className="mx-auto h-8 w-8 opacity-40" />
          <p className="mt-2 text-sm">Site imagery will be updated soon.</p>
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex];
  const formattedCounter = `${String(currentIndex + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Feature Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-black/90 shadow-md">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={currentImage}
            alt={`${projectTitle} - Photograph ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Counter Overlay */}
        <div className="absolute top-4 right-4 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold tracking-wider text-white backdrop-blur-md">
          {formattedCounter}
        </div>

        {/* Prev / Next Navigation Arrows */}
        {count > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-10">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[color:var(--color-brand-navy)] shadow-md transition-all hover:bg-white hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-orange)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[color:var(--color-brand-navy)] shadow-md transition-all hover:bg-white hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-orange)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Row */}
      {count > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-orange)] ${
                currentIndex === idx
                  ? "border-[color:var(--color-brand-orange)] ring-2 ring-[color:var(--color-brand-orange)]/40 scale-[1.02]"
                  : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
