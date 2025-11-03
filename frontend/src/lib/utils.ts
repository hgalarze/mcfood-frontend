import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | undefined | null, locale: string = "es-ES"): string {

  if(!date)
    return '';

  return new Date(date).toLocaleString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function getPlaceholderImageUrl(text: string, width: number = 600, height: number = 400): string {
  return `https://fpoimg.com/${width}x${height}?text=${encodeURIComponent(text)}`;
}