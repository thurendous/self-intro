import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 Tailwind CSS 类名的工具函数
 * 结合了 clsx 的条件类名功能和 tailwind-merge 的智能合并功能
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
