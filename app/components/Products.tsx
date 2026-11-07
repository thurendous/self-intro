"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { products } from "@/lib/siteData";
import ExternalLink from "./ExternalLink";

function Art({ id }: { id: (typeof products)[number]["id"] }) {
  if (id === "tickspace") {
    return (
      <svg className="art" viewBox="0 0 120 72" aria-hidden="true" focusable="false">
        <title>Tickspace</title>
        {[0, 1, 2].map((row) => (
          <g key={row} transform={`translate(0 ${row * 24})`}>
            <rect x="2" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
            {row < 2 && (
              <path d="M5.5 12.5l4 4 7-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            )}
            <rect
              x="28"
              y="10"
              width={row === 0 ? 70 : row === 1 ? 52 : 84}
              height="4"
              rx="2"
              fill="currentColor"
              opacity=".5"
            />
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg className="art" viewBox="0 0 120 72" aria-hidden="true" focusable="false">
      <title>JPYC Watcher</title>
      {[22, 38, 30, 52, 44, 62].map((h, i) => (
        <rect
          key={h + i * 7}
          x={6 + i * 19}
          y={70 - h}
          width="12"
          height={h}
          rx="2"
          fill="currentColor"
          opacity={0.35 + i * 0.1}
        />
      ))}
    </svg>
  );
}

export default function Products() {
  const { t } = useLanguage();
  return (
    <section id="products" className="products" aria-labelledby="products-title">
      <div className="wrap">
        <h2 id="products-title">{t.products.title}</h2>
        <p className="section-intro">{t.products.intro}</p>
        <ul className="product-list">
          {products.map((product) => {
            const copy = t.products.items[product.id];
            return (
              <li key={product.id} className={`product product-${product.id}`}>
                <Art id={product.id} />
                <h3>{copy.name}</h3>
                <p className="product-summary">{copy.summary}</p>
                <p className="product-note">{copy.note}</p>
                <ExternalLink className="btn btn-product" href={product.url}>
                  {t.products.open} {copy.name}
                </ExternalLink>
                <p className="product-host">{new URL(product.url).host}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
