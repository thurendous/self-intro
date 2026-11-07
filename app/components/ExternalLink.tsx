"use client";

import type React from "react";
import { useLanguage } from "@/lib/LanguageContext";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> & { href: string };

export default function ExternalLink({ children, ...rest }: Props) {
  const { t } = useLanguage();
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> {t.ui.externalNote}</span>
    </a>
  );
}
