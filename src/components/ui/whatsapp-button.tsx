import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  position?: "bottom-right" | "bottom-left";
  className?: string;
}

export function WhatsAppButton({
  phoneNumber,
  message = "Hello! I would like to know more about your services.",
  position = "bottom-right",
  className,
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  const positionClasses = {
    "bottom-right": "bottom-4 right-4 md:bottom-6 md:right-6",
    "bottom-left": "bottom-4 left-4 md:bottom-6 md:left-6",
  };

  return (
    <div
      className={cn(
        "fixed z-50 transition-all duration-500 transform",
        positionClasses[position],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
        className,
      )}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group relative flex items-center justify-center",
          "w-14 h-14 md:w-16 md:h-16",
          "rounded-full shadow-lg transition-all duration-300",
          "bg-[#25D366] hover:bg-[#1ebe5c]",
          "hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2",
        )}
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" />

        <span
          className={cn(
            "absolute right-full mr-3 px-3 py-1.5",
            "bg-gray-800 text-white text-xs font-medium",
            "rounded-lg whitespace-nowrap",
            "transition-all duration-200",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
          )}
        >
          Chat on WhatsApp
          <span className="absolute top-1/2 -right-1 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800" />
        </span>
      </a>
    </div>
  );
}
